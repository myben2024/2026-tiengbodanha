import { createHash } from 'node:crypto';
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const pendingGenerations = new Map();
const standalonePronunciations = new Map([
  ['c', { text: 'cê', ipa: 'se' }],
  ['ç', { text: 'cê cedilhado' }],
  ['tê', { text: 'tê', ipa: 'te' }],
]);

export function normalizeAudioText(value) {
  return typeof value === 'string' ? value.normalize('NFC').trim().replace(/\s+/g, ' ') : '';
}

export function normalizeAudioIpa(value) {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const match = /^\/([^/]+)\/$/u.exec(value.normalize('NFC').trim());
  if (!match || match[1].length > 100 || /[~()]/u.test(match[1])) return undefined;
  return match[1];
}

export function resolveAudioPronunciation(rawText, rawIpa) {
  const requestedText = normalizeAudioText(rawText);
  const preset = rawIpa ? undefined : standalonePronunciations.get(requestedText.toLocaleLowerCase('pt-PT'));
  return {
    requestedText,
    text: preset?.text ?? requestedText,
    ipa: preset?.ipa ?? normalizeAudioIpa(rawIpa),
  };
}

export function getAudioObjectKey(text, voice, ipa) {
  const pronunciation = ipa ? `\0ipa:${ipa}` : '';
  const hash = createHash('sha256').update(`${voice}\0${text}${pronunciation}`).digest('hex').slice(0, 24);
  return `audio/pt-PT/${hash}.mp3`;
}

export function createAudioService(env = process.env, dependencies = {}) {
  const config = readConfig(env);
  const r2 = dependencies.r2 ?? new S3Client({
    region: 'auto',
    endpoint: `https://${config.r2AccountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.r2AccessKeyId,
      secretAccessKey: config.r2SecretAccessKey,
    },
  });
  const fetchImpl = dependencies.fetch ?? fetch;

  const describe = (rawText, rawIpa) => {
    const { requestedText, text, ipa } = resolveAudioPronunciation(rawText, rawIpa);
    if (!requestedText) throw new AudioRequestError(400, 'Text is required.');
    if (requestedText.length > 500) throw new AudioRequestError(400, 'Text must be 500 characters or fewer.');
    if (rawIpa && !ipa) throw new AudioRequestError(400, 'IPA must use /.../ notation without alternatives or notes.');
    const key = getAudioObjectKey(text, config.azureVoice, ipa);
    return { text, ipa, key, url: `${config.r2PublicUrl}/${key}` };
  };

  const find = async (rawText, rawIpa) => {
    const audio = describe(rawText, rawIpa);
    try {
      const object = await r2.send(new HeadObjectCommand({ Bucket: config.r2BucketName, Key: audio.key }));
      return { status: 'ready', url: versionAudioUrl(audio.url, object.ETag) };
    } catch (error) {
      const statusCode = error?.$metadata?.httpStatusCode;
      if (statusCode === 404 || error?.name === 'NotFound' || error?.name === 'NoSuchKey') {
        return { status: 'missing' };
      }
      throw error;
    }
  };

  const generate = async (rawText, rawIpa) => {
    const audio = describe(rawText, rawIpa);
    const existing = await find(audio.text, audio.ipa ? `/${audio.ipa}/` : undefined);
    if (existing.status === 'ready') return existing;

    const pending = pendingGenerations.get(audio.key);
    if (pending) return pending;

    const generation = (async () => {
      const body = await synthesize(audio.text, audio.ipa, config, fetchImpl);
      const object = await r2.send(new PutObjectCommand({
        Bucket: config.r2BucketName,
        Key: audio.key,
        Body: body,
        ContentType: 'audio/mpeg',
        CacheControl: 'public, max-age=31536000, immutable',
        Metadata: {
          locale: 'pt-PT',
          voice: config.azureVoice,
          textHash: createHash('sha256').update(audio.text).digest('hex'),
          ...(audio.ipa ? { ipaHash: createHash('sha256').update(audio.ipa).digest('hex') } : {}),
        },
      }));
      return { status: 'ready', url: versionAudioUrl(audio.url, object.ETag) };
    })().finally(() => pendingGenerations.delete(audio.key));

    pendingGenerations.set(audio.key, generation);
    return generation;
  };

  return { find, generate };
}

async function synthesize(text, ipa, config, fetchImpl) {
  const endpoint = `https://${config.azureRegion}.tts.speech.microsoft.com/cognitiveservices/v1`;
  const speechContent = ipa
    ? `<phoneme alphabet="ipa" ph="${escapeXml(ipa)}">${escapeXml(text)}</phoneme>`
    : escapeXml(text);
  const ssml = [
    '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="pt-PT">',
    `<voice name="${escapeXml(config.azureVoice)}">`,
    `<prosody rate="-10%">${speechContent}</prosody>`,
    '</voice>',
    '</speak>',
  ].join('');
  const response = await fetchImpl(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/ssml+xml',
      'Ocp-Apim-Subscription-Key': config.azureSpeechKey,
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'be-ghep-chu-pt-pt-on-demand-audio',
    },
    body: ssml,
  });
  if (!response.ok) {
    throw new Error(`Azure Speech failed (${response.status}): ${await response.text()}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

function readConfig(env) {
  const required = [
    'AZURE_SPEECH_KEY',
    'AZURE_SPEECH_REGION',
    'R2_ACCOUNT_ID',
    'R2_ACCESS_KEY_ID',
    'R2_SECRET_ACCESS_KEY',
    'R2_BUCKET_NAME',
    'R2_PUBLIC_URL',
  ];
  const missing = required.filter((name) => !env[name]);
  if (missing.length > 0) throw new Error(`Missing server environment variables: ${missing.join(', ')}`);

  return {
    azureSpeechKey: env.AZURE_SPEECH_KEY,
    azureRegion: env.AZURE_SPEECH_REGION,
    azureVoice: env.AZURE_SPEECH_VOICE || 'pt-PT-RaquelNeural',
    r2AccountId: env.R2_ACCOUNT_ID,
    r2AccessKeyId: env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: env.R2_SECRET_ACCESS_KEY,
    r2BucketName: env.R2_BUCKET_NAME,
    r2PublicUrl: env.R2_PUBLIC_URL.replace(/\/$/, ''),
  };
}

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function versionAudioUrl(url, etag) {
  const version = typeof etag === 'string' ? etag.replaceAll('"', '') : '';
  return version ? `${url}?v=${encodeURIComponent(version)}` : url;
}

export class AudioRequestError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}