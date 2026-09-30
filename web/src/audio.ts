export type SpeechStatus = {
  supported: boolean;
  message: string;
};

type AudioApiResponse = {
  status: 'ready' | 'missing';
  url?: string;
};

const audioUrlsByText = new Map<string, string>();
const pendingGenerations = new Map<string, Promise<string | undefined>>();
let activeAudio: HTMLAudioElement | undefined;

function getAudioCacheKey(text: string, ipa?: string) {
  return `${text}\0${ipa ?? ''}`;
}

function getPortuguesePortugalVoice(): Promise<SpeechSynthesisVoice | undefined> {
  const synthesis = window.speechSynthesis;
  const findVoice = () => synthesis.getVoices().find((voice) => /^pt[-_]PT$/i.test(voice.lang));
  const available = findVoice();
  if (available) return Promise.resolve(available);

  return new Promise((resolve) => {
    const finish = () => {
      synthesis.removeEventListener('voiceschanged', onVoicesChanged);
      window.clearTimeout(timeoutId);
      resolve(findVoice());
    };
    const onVoicesChanged = () => finish();
    const timeoutId = window.setTimeout(finish, 1200);
    synthesis.addEventListener('voiceschanged', onVoicesChanged, { once: true });
  });
}

export async function speakPortugueseText(text: string, ipa?: string): Promise<SpeechStatus> {
  if (typeof window === 'undefined') {
    return {
      supported: false,
      message: 'Không thể phát âm thanh bên ngoài trình duyệt.',
    };
  }

  const normalizedText = text.normalize('NFC').trim().replace(/\s+/g, ' ');
  if (!normalizedText) return { supported: false, message: 'Không có nội dung để phát.' };
  const normalizedIpa = ipa?.normalize('NFC').trim() || undefined;
  const cacheKey = getAudioCacheKey(normalizedText, normalizedIpa);

  const cachedUrl = audioUrlsByText.get(cacheKey) ?? await findGeneratedAudio(normalizedText, normalizedIpa);
  if (cachedUrl) {
    try {
      await playAudio(cachedUrl);
      return { supported: true, message: 'Đang phát bản thu pt-PT từ thư viện audio.' };
    } catch {
      audioUrlsByText.delete(cacheKey);
    }
  }

  const generation = requestAudioGeneration(normalizedText, normalizedIpa);
  if (normalizedIpa) {
    const generatedUrl = await generation;
    if (!generatedUrl) {
      return { supported: false, message: 'Không thể tạo mẫu phát âm IPA lúc này.' };
    }
    try {
      await playAudio(generatedUrl);
      return { supported: true, message: `Đang phát mẫu IPA ${normalizedIpa}.` };
    } catch {
      audioUrlsByText.delete(cacheKey);
      return { supported: false, message: 'Đã tạo mẫu IPA nhưng trình duyệt không thể phát audio.' };
    }
  }

  if (!('speechSynthesis' in window)) {
    return {
      supported: false,
      message: 'Audio đang được tạo. Thiết bị này không hỗ trợ giọng đọc tạm thời của trình duyệt.',
    };
  }

  const preferredVoice = await getPortuguesePortugalVoice();
  if (!preferredVoice) {
    return {
      supported: false,
      message: 'Audio đang được tạo. Thiết bị chưa có giọng pt-PT để phát tạm thời.',
    };
  }

  const utterance = new SpeechSynthesisUtterance(normalizedText);
  utterance.lang = 'pt-PT';
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.voice = preferredVoice;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);

  return {
    supported: true,
    message: `Đang phát tạm bằng giọng ${preferredVoice.name} (${preferredVoice.lang}); bản Azure đang được tạo ở nền.`,
  };
}

async function findGeneratedAudio(text: string, ipa?: string): Promise<string | undefined> {
  try {
    const search = new URLSearchParams({ text });
    if (ipa) search.set('ipa', ipa);
    const response = await fetch(`/api/audio?${search}`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return undefined;
    const result = await response.json() as AudioApiResponse;
    if (result.status === 'ready' && result.url) {
      audioUrlsByText.set(getAudioCacheKey(text, ipa), result.url);
      return result.url;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

function requestAudioGeneration(text: string, ipa?: string): Promise<string | undefined> {
  const cacheKey = getAudioCacheKey(text, ipa);
  const pending = pendingGenerations.get(cacheKey);
  if (pending) return pending;
  const request = fetch('/api/audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ text, ...(ipa ? { ipa } : {}) }),
  })
    .then(async (response) => {
      if (!response.ok) return undefined;
      const result = await response.json() as AudioApiResponse;
      if (result.status === 'ready' && result.url) {
        audioUrlsByText.set(cacheKey, result.url);
        return result.url;
      }
      return undefined;
    })
    .catch(() => undefined)
    .finally(() => pendingGenerations.delete(cacheKey));
  pendingGenerations.set(cacheKey, request);
  return request;
}

async function playAudio(url: string) {
  window.speechSynthesis?.cancel();
  activeAudio?.pause();
  activeAudio = new Audio(url);
  await activeAudio.play();
}
