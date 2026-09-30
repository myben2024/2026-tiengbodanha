import assert from 'node:assert/strict';
import test from 'node:test';
import {
  createAudioService,
  getAudioObjectKey,
  normalizeAudioIpa,
  normalizeAudioText,
  resolveAudioPronunciation,
} from '../server/audio-service.mjs';

const env = {
  AZURE_SPEECH_KEY: 'test-key',
  AZURE_SPEECH_REGION: 'westeurope',
  AZURE_SPEECH_VOICE: 'pt-PT-RaquelNeural',
  R2_ACCOUNT_ID: 'test-account',
  R2_ACCESS_KEY_ID: 'test-access-key',
  R2_SECRET_ACCESS_KEY: 'test-secret-key',
  R2_BUCKET_NAME: 'test-bucket',
  R2_PUBLIC_URL: 'https://media.example.test/',
};

test('normalizes text and creates a stable R2 audio key', () => {
  const text = normalizeAudioText('  olá   mundo  ');
  assert.equal(text, 'olá mundo');
  assert.equal(
    getAudioObjectKey(text, env.AZURE_SPEECH_VOICE),
    getAudioObjectKey('olá mundo', env.AZURE_SPEECH_VOICE),
  );
});

test('normalizes strict IPA notation and gives each pronunciation its own key', () => {
  assert.equal(normalizeAudioIpa(' /e/ '), 'e');
  assert.equal(normalizeAudioIpa('/e/ ~ /ɛ/'), undefined);
  assert.notEqual(
    getAudioObjectKey('e', env.AZURE_SPEECH_VOICE, 'e'),
    getAudioObjectKey('e', env.AZURE_SPEECH_VOICE, 'ɛ'),
  );
});

test('maps standalone c and cedilla to their pt-PT character names', () => {
  assert.deepEqual(resolveAudioPronunciation('c'), {
    requestedText: 'c',
    text: 'cê',
    ipa: 'se',
  });
  assert.deepEqual(resolveAudioPronunciation('ç'), {
    requestedText: 'ç',
    text: 'cê cedilhado',
    ipa: undefined,
  });
  assert.deepEqual(resolveAudioPronunciation('tê'), {
    requestedText: 'tê',
    text: 'tê',
    ipa: 'te',
  });
});

test('returns the public R2 URL without calling Azure on a cache hit', async () => {
  let azureCalls = 0;
  const service = createAudioService(env, {
    r2: { send: async () => ({}) },
    fetch: async () => {
      azureCalls += 1;
      throw new Error('Azure should not be called.');
    },
  });

  const result = await service.find('casa');
  assert.equal(result.status, 'ready');
  assert.match(result.url, /^https:\/\/media\.example\.test\/audio\/pt-PT\/[a-f0-9]{24}\.mp3$/);
  assert.equal(azureCalls, 0);
});

test('versions a cached audio URL with the R2 ETag', async () => {
  const service = createAudioService(env, {
    r2: { send: async () => ({ ETag: '"fresh-audio"' }) },
  });

  const result = await service.find('casa');
  assert.match(result.url, /\.mp3\?v=fresh-audio$/);
});

test('coalesces duplicate cache misses and uploads one Azure MP3 to R2', async () => {
  let azureCalls = 0;
  let uploadCalls = 0;
  const r2 = {
    send: async (command) => {
      if (command.constructor.name === 'HeadObjectCommand') {
        const error = new Error('Not found');
        error.$metadata = { httpStatusCode: 404 };
        throw error;
      }
      uploadCalls += 1;
      assert.equal(command.input.ContentType, 'audio/mpeg');
      assert.deepEqual(command.input.Body, Buffer.from('mp3'));
      return {};
    },
  };
  const service = createAudioService(env, {
    r2,
    fetch: async () => {
      azureCalls += 1;
      return new Response(Buffer.from('mp3'), { status: 200 });
    },
  });

  const [first, second] = await Promise.all([service.generate('casa'), service.generate('casa')]);
  assert.deepEqual(first, second);
  assert.equal(first.status, 'ready');
  assert.equal(azureCalls, 1);
  assert.equal(uploadCalls, 1);
});

test('uses an IPA phoneme in Azure SSML for pronunciation practice', async () => {
  let requestBody;
  const service = createAudioService(env, {
    r2: {
      send: async (command) => {
        if (command.constructor.name === 'HeadObjectCommand') {
          const error = new Error('Not found');
          error.$metadata = { httpStatusCode: 404 };
          throw error;
        }
        return {};
      },
    },
    fetch: async (_url, options) => {
      requestBody = options.body;
      return new Response(Buffer.from('mp3'), { status: 200 });
    },
  });

  await service.generate('e', '/e/');
  assert.match(requestBody, /<phoneme alphabet="ipa" ph="e">e<\/phoneme>/);
});