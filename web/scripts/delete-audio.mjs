import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAudioObjectKey, resolveAudioPronunciation } from '../server/audio-service.mjs';
import { loadLocalEnv } from '../server/env.mjs';

export async function deleteAudioObject(rawText, rawIpa, env = process.env, dependencies = {}) {
  const { requestedText, text, ipa } = resolveAudioPronunciation(rawText, rawIpa);
  if (!requestedText) throw new Error('Audio text is required.');
  if (rawIpa && !ipa) throw new Error('IPA must use /.../ notation without alternatives or notes.');

  const required = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET_NAME'];
  const missing = required.filter((name) => !env[name]);
  if (missing.length > 0) throw new Error(`Missing environment variables: ${missing.join(', ')}`);

  const voice = env.AZURE_SPEECH_VOICE || 'pt-PT-RaquelNeural';
  const key = getAudioObjectKey(text, voice, ipa);
  const r2 = dependencies.r2 ?? new S3Client({
    region: 'auto',
    endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: env.R2_ACCESS_KEY_ID,
      secretAccessKey: env.R2_SECRET_ACCESS_KEY,
    },
  });

  await r2.send(new DeleteObjectCommand({ Bucket: env.R2_BUCKET_NAME, Key: key }));
  const publicUrl = env.R2_PUBLIC_URL
    ? `${env.R2_PUBLIC_URL.replace(/\/$/, '')}/${key}`
    : undefined;
  return { text, ipa, voice, key, bucket: env.R2_BUCKET_NAME, publicUrl };
}

async function main() {
  await loadLocalEnv(fileURLToPath(new URL('../.env', import.meta.url)));
  const args = process.argv.slice(2);
  const ipaFlagIndex = args.indexOf('--ipa');
  const rawIpa = ipaFlagIndex >= 0 ? args[ipaFlagIndex + 1] : undefined;
  if (ipaFlagIndex >= 0) args.splice(ipaFlagIndex, 2);
  const rawText = args.join(' ');
  if (!rawText) {
    console.error('Usage: npm run audio:delete -- "palavra ou frase" [--ipa "/e/"]');
    process.exitCode = 1;
    return;
  }

  const deleted = await deleteAudioObject(rawText, rawIpa);
  console.log(`Deleted: ${deleted.text}`);
  if (deleted.ipa) console.log(`IPA: /${deleted.ipa}/`);
  console.log(`R2 object: ${deleted.bucket}/${deleted.key}`);
  if (deleted.publicUrl) {
    console.log(`Public URL: ${deleted.publicUrl}`);
    console.log('Purge this URL from Cloudflare cache if the old audio was already cached.');
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Unable to delete audio: ${error.message}`);
    process.exitCode = 1;
  });
}