import assert from 'node:assert/strict';
import test from 'node:test';
import { getAudioObjectKey } from '../server/audio-service.mjs';
import { deleteAudioObject } from '../scripts/delete-audio.mjs';

const env = {
  AZURE_SPEECH_VOICE: 'pt-PT-RaquelNeural',
  R2_ACCOUNT_ID: 'test-account',
  R2_ACCESS_KEY_ID: 'test-access-key',
  R2_SECRET_ACCESS_KEY: 'test-secret-key',
  R2_BUCKET_NAME: 'test-bucket',
  R2_PUBLIC_URL: 'https://media.example.test/',
};

test('deletes the R2 object matching normalized text and voice', async () => {
  let command;
  const result = await deleteAudioObject('  olá   mundo  ', undefined, env, {
    r2: { send: async (value) => { command = value; } },
  });

  const expectedKey = getAudioObjectKey('olá mundo', env.AZURE_SPEECH_VOICE);
  assert.equal(command.constructor.name, 'DeleteObjectCommand');
  assert.deepEqual(command.input, { Bucket: env.R2_BUCKET_NAME, Key: expectedKey });
  assert.deepEqual(result, {
    text: 'olá mundo',
    ipa: undefined,
    voice: env.AZURE_SPEECH_VOICE,
    key: expectedKey,
    bucket: env.R2_BUCKET_NAME,
    publicUrl: `https://media.example.test/${expectedKey}`,
  });
});

test('deletes a pronunciation-specific IPA object', async () => {
  let command;
  const result = await deleteAudioObject('e', '/e/', env, {
    r2: { send: async (value) => { command = value; } },
  });

  const expectedKey = getAudioObjectKey('e', env.AZURE_SPEECH_VOICE, 'e');
  assert.equal(command.input.Key, expectedKey);
  assert.equal(result.ipa, 'e');
});

test('deletes the character-name object used by a standalone c request', async () => {
  let command;
  const result = await deleteAudioObject('c', undefined, env, {
    r2: { send: async (value) => { command = value; } },
  });

  const expectedKey = getAudioObjectKey('cê', env.AZURE_SPEECH_VOICE, 'se');
  assert.equal(command.input.Key, expectedKey);
  assert.equal(result.text, 'cê');
  assert.equal(result.ipa, 'se');
});