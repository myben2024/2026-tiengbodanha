import type { Lesson, LessonBlock } from './types';

export type SoundSample = {
  id: string;
  label: string;
  audioText: string;
  syllableAudioText?: string;
  syllableAudioIpa?: string;
  letterNameText?: string;
  letterNameIpa?: string;
  phoneme?: string;
  grapheme?: string;
  diacritic?: PronunciationVariant[];
  cue: string;
  meaning?: string;
};

export type PronunciationVariant = {
  grapheme: string;
  ipa: string;
  spokenUnit: string;
  example: string;
  meaning: string;
};

export type SoundGroup = {
  title: string;
  hint: string;
  samples: SoundSample[];
  syllableRows?: SyllablePracticeRow[];
};

export type SyllablePracticeRow = {
  label: string;
  syllables: string[];
  statuses?: Array<'valid' | 'invalid' | 'notTaught'>;
  note?: string;
};

const alphabet: Array<{
  letter: string;
  example: string;
  syllable: string;
  phoneme: string;
  cue?: string;
}> = [
  { letter: 'A', phoneme: '/á/', example: 'água', syllable: 'a', cue: 'Nghe nguyên âm /a/ trong “água”.' },
  { letter: 'B', phoneme: '/bo/', example: 'bola', syllable: 'b' },
  { letter: 'C', phoneme: '/ca/', example: 'casa', syllable: 'c', cue: 'Nghe âm /k/ trong âm tiết “ca” và từ “casa”.' },
  { letter: 'D', phoneme: '/da/', example: 'dado', syllable: 'd' },
  { letter: 'E', phoneme: '/ɛ/', example: 'pé', syllable: 'é', cue: 'Nghe nguyên âm E mở /ɛ/ trong “pé”. Bài nguyên âm sẽ so sánh thêm E khép /e/ trong “vê”.' },
  { letter: 'F', phoneme: '/fa/', example: 'faca', syllable: 'f' },
  { letter: 'G', phoneme: '/ga/', example: 'gato', syllable: 'g' },
  { letter: 'H', phoneme: '/ho/', example: 'hoje', syllable: 'h', cue: 'H câm trong “hoje”; hãy nghe cả từ, không gán âm riêng cho H.' },
  { letter: 'I', phoneme: '/i/', example: 'ilha', syllable: 'i', cue: 'Nghe nguyên âm /i/ trong “ilha”.' },
  { letter: 'J', phoneme: '/ja/', example: 'janela', syllable: 'j' },
  { letter: 'L', phoneme: '/li/', example: 'livro', syllable: 'l' },
  { letter: 'M', phoneme: '/ma/', example: 'mapa', syllable: 'm' },
  { letter: 'N', phoneme: '/na/', example: 'nariz', syllable: 'n' },
  { letter: 'O', phoneme: '/o/ ~ /ɔ/', example: 'ovo', syllable: 'o', cue: 'O có thể có âm khép /o/ hoặc mở /ɔ/; nghe trong từ mẫu.' },
  { letter: 'P', phoneme: '/pa/', example: 'pato', syllable: 'p' },
  { letter: 'Q', phoneme: '/que/', example: 'queijo', syllable: 'q', cue: 'Trong “que”, Q đi cùng U; cụm QU phát âm /k/.' },
  { letter: 'R', phoneme: '/ra/', example: 'rato', syllable: 'r', cue: 'R đầu từ có âm mạnh; cách phát âm cụ thể thay đổi theo vùng Portugal.' },
  { letter: 'S', phoneme: '/sa/', example: 'sapo', syllable: 's' },
  { letter: 'T', phoneme: '/to/', example: 'tomate', syllable: 't' },
  { letter: 'U', phoneme: '/u/', example: 'uva', syllable: 'u', cue: 'Nghe nguyên âm /u/ trong “uva”.' },
  { letter: 'V', phoneme: '/va/', example: 'vaca', syllable: 'v' },
  { letter: 'X', phoneme: '/xa/ (trong “xadrez”)', example: 'xadrez', syllable: 'x', cue: 'X có nhiều cách phát âm; trong “xadrez”, X có âm /ʃ/.' },
  { letter: 'Z', phoneme: '/ze/', example: 'zero', syllable: 'z', cue: 'Trong pt-PT, Z đầu từ trong “zero” có âm /z/.' },
];

const specialLetters: Array<{
  letter: string;
  example: string;
  syllable: string;
  phoneme: string;
  cue: string;
}> = [
  {
    letter: 'K',
    example: 'kiwi',
    syllable: 'k',
    phoneme: '/ki/',
    cue: 'Chủ yếu gặp trong từ mượn và tên riêng; K có âm /k/.',
  },
  {
    letter: 'W',
    example: 'web',
    syllable: 'w',
    phoneme: '/we/ ~ /v/ (tùy từ mượn)',
    cue: 'Chủ yếu gặp trong từ mượn và tên riêng; cách đọc có thể phụ thuộc nguồn gốc từ.',
  },
  {
    letter: 'Y',
    example: 'yoga',
    syllable: 'y',
    phoneme: '/yo/ (trong từ mượn này)',
    cue: 'Chủ yếu gặp trong từ mượn và tên riêng; cách đọc có thể phụ thuộc nguồn gốc từ.',
  },
];

const groupedLetters: Array<{
  letter: string;
  example: string;
  syllable: string;
  phoneme: string;
  cue: string;
}> = [
  {
    letter: 'Ç',
    example: 'taça',
    syllable: 'ç',
    phoneme: '/s/',
    cue: 'Ç phát âm như S; nghe âm tiết “ça” trong “taça”.',
  },
  {
    letter: 'CH',
    example: 'chave',
    syllable: 'ch',
    phoneme: '/cha/',
    cue: 'CH trong pt-PT phát âm /ʃ/, như âm “sh” trong tiếng Anh.',
  },
  {
    letter: 'LH',
    example: 'filho',
    syllable: 'lh',
    phoneme: '/lho/',
    cue: 'LH biểu thị một âm riêng trong tiếng Bồ Đào Nha, gần với âm “ly” trong một số ngôn ngữ.',
  },
  {
    letter: 'NH',
    example: 'ninho',
    syllable: 'nh',
    phoneme: '/nho/',
    cue: 'NH biểu thị âm mũi /ɲ/, tương tự “nh” trong tiếng Việt.',
  },
];

const alphabetIpaByLetter: Record<string, string> = {
  A: '/a/', B: '/b/', C: '/c/', D: '/d/', E: '/ɛ/', F: '/f/', G: '/g/',
  I: '/i/', J: '/ʒ/', K: '/k/', L: '/l/', M: '/m/', N: '/n/', O: '/o/',
  P: '/p/', Q: '/k/', R: '/ʁ/', S: '/s/', T: '/t/', U: '/u/', V: '/v/',
  W: '/w/', X: '/ʃ/', Y: '/j/', Z: '/z/', Ç: '/s/', CH: '/ʃ/', LH: '/ʎ/', NH: '/ɲ/',
};

const alphabetLetterNames: Record<string, string> = {
  A: 'á', B: 'bê', C: 'cê', D: 'dê', E: 'é', F: 'efe', G: 'guê', H: 'agá',
  I: 'i', J: 'jota', K: 'capa', L: 'ele', M: 'eme', N: 'ene', O: 'ó', P: 'pê',
  Q: 'quê', R: 'erre', S: 'esse', T: 'tê', U: 'u', V: 'vê', W: 'duplo vê',
  X: 'xis', Y: 'ípsilon', Z: 'zê', Ç: 'cê cedilhado', CH: 'cê agá',
  LH: 'ele agá', NH: 'ene agá',
};

function strictIpa(value?: string) {
  return value && /^\/[^/]+\/$/u.test(value) && !/[~()]/u.test(value) ? value : undefined;
}

function sampleFromLetter(
  letter: string,
  example: string,
  syllable: string,
  phoneme?: string,
  cue?: string,
): SoundSample {
  return {
    id: `letter-${letter.toLowerCase()}`,
    label: letter,
    audioText: example,
    syllableAudioText: syllable,
    syllableAudioIpa: alphabetIpaByLetter[letter],
    letterNameText: alphabetLetterNames[letter],
    phoneme,
    cue: cue ?? `Nghe âm tiết “${syllable}”, sau đó nghe từ mẫu “${example}”. Không đọc tên chữ cái khi ghép.`,
  };
}

function alphabetGroups(): SoundGroup[] {
  const vowels = new Set(['A', 'E', 'I', 'O', 'U']);
  return [
    {
      title: 'Nguyên âm',
      hint: 'Chọn chữ để nghe tên chữ cái; phần chi tiết bên dưới dùng để luyện âm và nghe từ ví dụ.',
      samples: alphabet
        .filter(({ letter }) => vowels.has(letter))
        .map(({ letter, example, syllable, phoneme, cue }) => sampleFromLetter(letter, example, syllable, phoneme, cue)),
    },
    {
      title: 'Các chữ cái còn lại',
      hint: 'Chọn chữ để nghe tên chữ cái; sau đó luyện âm trong âm tiết và từ mẫu.',
      samples: alphabet
        .filter(({ letter }) => !vowels.has(letter))
        .map(({ letter, example, syllable, phoneme, cue }) => sampleFromLetter(letter, example, syllable, phoneme, cue)),
    },
    {
      title: 'Chữ thường gặp trong từ mượn',
      hint: 'K, W, Y chủ yếu xuất hiện trong từ mượn, tên riêng và ký hiệu.',
      samples: specialLetters.map(({ letter, example, syllable, phoneme, cue }) => sampleFromLetter(letter, example, syllable, phoneme, cue)),
    },
    {
      title: 'Biến thể và cặp chữ',
      hint: 'Ç là một chữ có dấu; CH, LH, NH là các cặp chữ cần nghe trong từ.',
      samples: groupedLetters.map(({ letter, example, syllable, phoneme, cue }) => sampleFromLetter(letter, example, syllable, phoneme, cue)),
    },
  ];
}

type LessonPronunciationTarget = {
  grapheme?: string;
  label?: string;
  diacritic?: PronunciationVariant[];
  ipa?: string;
  spokenUnit?: string;
  example?: string;
  meaning?: string;
  cue?: string;
};

const lessonPronunciationTargets: Record<number, LessonPronunciationTarget[]> = {
  2: [
    {
      label: 'a',
      grapheme: 'a',
      diacritic: [
        { grapheme: 'a', ipa: '/a/', spokenUnit: 'ca', example: 'casa', meaning: 'nhà' },
        { grapheme: 'á', ipa: '/a/', spokenUnit: 'pá', example: 'pá', meaning: 'xẻng' },
      ],
    },
    {
      label: 'e',
      grapheme: 'e',
      diacritic: [
        { grapheme: 'e', ipa: '/ɛ/', spokenUnit: 'e-le', example: 'elefante', meaning: 'voi; chữ e không dấu cần nghe theo từ' },
        { grapheme: 'é', ipa: '/ɛ/', spokenUnit: 'pé', example: 'pé', meaning: 'bàn chân; e mở' },
        { grapheme: 'ê', ipa: '/e/', spokenUnit: 'vê', example: 'vê', meaning: 'thấy; e khép' },
      ],
    },
    {
      label: 'i',
      grapheme: 'i',
      diacritic: [
        { grapheme: 'i', ipa: '/i/', spokenUnit: 'vi', example: 'vi', meaning: 'tôi đã thấy' },
        { grapheme: 'í', ipa: '/i/', spokenUnit: 'sí', example: 'sí', meaning: 'vâng; i mở' },
      ],
    },
    {
      label: 'o',
      grapheme: 'o',
      diacritic: [
        { grapheme: 'o', ipa: 'thay đổi theo từ', spokenUnit: 'o-vo', example: 'ovo', meaning: 'trứng; chữ o không dấu cần nghe theo từ'  },
        { grapheme: 'ó', ipa: '/ɔ/', spokenUnit: 'avó', example: 'avó', meaning: 'bà; o mở' },
        { grapheme: 'ô', ipa: '/o/', spokenUnit: 'avô', example: 'avô', meaning: 'ông; o khép' },
      ],
    },
    { label: 'u', grapheme: 'u', ipa: '/u/', spokenUnit: 'tu', example: 'tu', meaning: 'bạn (thân mật)' },
  ],
  3: [
    { grapheme: 'm', ipa: '/ma/', spokenUnit: 'm', example: 'mapa', meaning: 'bản đồ' },
    { grapheme: 'p', ipa: '/pa/', spokenUnit: 'p', example: 'pato', meaning: 'vịt' },
    { grapheme: 'b', ipa: '/bo/', spokenUnit: 'b', example: 'bola', meaning: 'quả bóng' },
  ],
  4: [
    { grapheme: 'PA', ipa: '/ˈpa/', spokenUnit: 'pa', example: 'pato', meaning: 'vịt; nhấn âm tiết đầu' },
    { grapheme: 'FÉ', ipa: '/ˈfɛ/', spokenUnit: 'fé', example: 'café', meaning: 'cà phê; nhấn âm tiết cuối' },
    { grapheme: 'PÁ', ipa: '/ˈpa/', spokenUnit: 'pá', example: 'sapato', meaning: 'giày; nhấn âm tiết cuối' },
  ],
  5: [
    { grapheme: 'm', ipa: '/ma/', spokenUnit: 'm', example: 'mapa', meaning: 'bản đồ' },
    { grapheme: 'p', ipa: '/pa/', spokenUnit: 'p', example: 'papa', meaning: 'thức ăn mềm cho em bé' },
  ],
  6: [
    { grapheme: 'b', ipa: '/bo/', spokenUnit: 'b', example: 'bola', meaning: 'quả bóng' },
    { grapheme: 'd', ipa: '/da/', spokenUnit: 'd', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 't', ipa: '/ta/', spokenUnit: 't', example: 'batata', meaning: 'khoai tây' },
  ],
  7: [
    { grapheme: 'l', ipa: '/la/', spokenUnit: 'l', example: 'lata', meaning: 'cái lon' },
    { grapheme: 'n', ipa: '/na/', spokenUnit: 'n', example: 'menina', meaning: 'bé gái' },
  ],
  8: [
    { grapheme: 'f', ipa: '/fa/', spokenUnit: 'f', example: 'faca', meaning: 'con dao' },
    { grapheme: 'v', ipa: '/va/', spokenUnit: 'v', example: 'vaca', meaning: 'bò cái' },
  ],
  9: [
    { label: 'o cuối', grapheme: '-o', ipa: '/u/ (thường ở cuối từ, không nhấn)', spokenUnit: 'pato', example: 'pato', meaning: 'vịt', cue: 'Trong PA-to, âm tiết PA được nhấn. Chữ o cuối yếu, thường nghe gần /u/, nhưng vẫn viết o.' },
    { label: 'a cuối', grapheme: '-a', ipa: '/ɐ/ (thường ở cuối từ, không nhấn)', spokenUnit: 'mapa', example: 'mapa', meaning: 'bản đồ', cue: 'Trong MA-pa, âm tiết MA được nhấn. Chữ a cuối yếu, thường nghe gần /ɐ/, nhưng vẫn viết a.' },
    { label: 'e cuối', grapheme: '-e', ipa: '/ɨ/ (rất yếu)', spokenUnit: 'chave', example: 'chave', meaning: 'chìa khóa', cue: 'Trong CHA-ve, âm tiết CHA được nhấn. Chữ e cuối rất nhẹ, đôi khi mờ đi khi nói nhanh, nhưng vẫn viết e.' },
    { label: 'é được nhấn', grapheme: 'é', ipa: '/ɛ/', spokenUnit: 'café', example: 'café', meaning: 'cà phê', cue: 'Trong ca-FÉ, é ở cuối được nhấn nên nghe rõ; so sánh với e yếu cuối từ chave.' },
  ],
  10: [
    { grapheme: 'PA', ipa: '/ˈpa/', spokenUnit: 'pa', example: 'pato', meaning: 'vịt' },
    { grapheme: 'MA', ipa: '/ˈma/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ' },
    { grapheme: 'BO', ipa: '/ˈbɔ/', spokenUnit: 'bo', example: 'bola', meaning: 'quả bóng' },
    { grapheme: 'DA', ipa: '/ˈda/', spokenUnit: 'da', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 'BO', ipa: '/ˈbo/', spokenUnit: 'bo', example: 'bolo', meaning: 'bánh ngọt' },
    { grapheme: 'TA', ipa: '/ˈta/', spokenUnit: 'ta', example: 'batata', meaning: 'khoai tây; âm tiết giữa được nhấn' },
    { grapheme: 'NI', ipa: '/ˈni/', spokenUnit: 'ni', example: 'menina', meaning: 'bé gái; âm tiết giữa được nhấn' },
    { grapheme: 'VA', ipa: '/ˈva/', spokenUnit: 'va', example: 'vaca', meaning: 'bò cái' },
    { grapheme: 'LA', ipa: '/ˈla/', spokenUnit: 'la', example: 'lata', meaning: 'cái lon' },
    { grapheme: 'CHA', ipa: '/ˈʃa/', spokenUnit: 'cha', example: 'chave', meaning: 'chìa khóa; ôn chữ e cuối đọc yếu' },
  ],
  11: [
    { grapheme: 'ca', ipa: '/kɐ/', spokenUnit: 'ca', example: 'casa', meaning: 'nhà' },
    { grapheme: 'ce', ipa: '/s/', spokenUnit: 'ce', example: 'cebola', meaning: 'hành' },
    { grapheme: 'que', ipa: '/k/', spokenUnit: 'que', example: 'queijo', meaning: 'phô mai' },
  ],
  12: [
    { grapheme: 'ga', ipa: '/g/', spokenUnit: 'ga', example: 'gato', meaning: 'mèo' },
    { grapheme: 'ge', ipa: '/ʒ/', spokenUnit: 'ge', example: 'gelo', meaning: 'nước đá' },
    { grapheme: 'gui', ipa: '/g/', spokenUnit: 'gui', example: 'guitarra', meaning: 'đàn ghi-ta' },
  ],
  13: [
    { grapheme: 'ch', ipa: '/ʃ/', spokenUnit: 'cha', example: 'chave', meaning: 'chìa khóa' },
    { grapheme: 'lh', ipa: '/ʎ/', spokenUnit: 'lho', example: 'filho', meaning: 'con trai' },
    { grapheme: 'nh', ipa: '/ɲ/', spokenUnit: 'nho', example: 'ninho', meaning: 'tổ chim' },
  ],
  14: [
    { grapheme: 's-', ipa: '/s/', spokenUnit: 'sa', example: 'sapo', meaning: 'con cóc' },
    { grapheme: '-s-', ipa: '/z/', spokenUnit: 'sa', example: 'casa', meaning: 'nhà' },
    { grapheme: 'ss', ipa: '/s/', spokenUnit: 'ssa', example: 'massa', meaning: 'bột nhào' },
  ],
  15: [
    { grapheme: '-r-', ipa: '/ɾ/', spokenUnit: 'ro', example: 'caro', meaning: 'đắt' },
    { grapheme: 'rr', ipa: '/ʁ/', spokenUnit: 'rro', example: 'carro', meaning: 'ô tô' },
    { grapheme: 'ç', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân' },
  ],
  16: [
    { grapheme: 's + t', ipa: '/ʃt/', spokenUnit: 'sta', example: 'pasta', meaning: 'mì ống; bìa hồ sơ' },
    { grapheme: 's + m', ipa: '/ʒm/', spokenUnit: 'smo', example: 'mesmo', meaning: 'cũng; chính' },
    { grapheme: 's + vogal', ipa: '/z/', spokenUnit: 'za', example: 'os amigos', meaning: 'những người bạn' },
  ],
  17: [
    { grapheme: 'am', ipa: '/ɐ̃/', spokenUnit: 'cam', example: 'campo', meaning: 'đồng ruộng' },
    { grapheme: 'an', ipa: '/ɐ̃/', spokenUnit: 'can', example: 'canto', meaning: 'góc; tiếng hát' },
    { grapheme: 'em', ipa: '/ẽ/', spokenUnit: 'tem', example: 'tempo', meaning: 'thời gian' },
  ],
  18: [
    { grapheme: 'ão', ipa: '/ɐ̃w̃/', spokenUnit: 'pão', example: 'pão', meaning: 'bánh mì' },
    { grapheme: 'ãe', ipa: '/ɐ̃j̃/', spokenUnit: 'mãe', example: 'mãe', meaning: 'mẹ' },
    { grapheme: 'õe', ipa: '/õj̃/', spokenUnit: 'põe', example: 'põe', meaning: 'đặt; để' },
  ],
  19: [
    { grapheme: 'ai', ipa: '/aj/', spokenUnit: 'pai', example: 'pai', meaning: 'bố', cue: 'Hai chữ a + i cùng nằm trong một âm tiết: pai chỉ có một nhịp.' },
    { grapheme: 'ei', ipa: '/ɐj/ ~ /ej/', spokenUnit: 'lei', example: 'leite', meaning: 'sữa', cue: 'Trong leite, ei nằm trọn trong âm tiết LEI. Chất âm có thể thay đổi theo vùng Portugal.' },
    { grapheme: 'éi', ipa: '/ɛj/', spokenUnit: 'péis', example: 'papéis', meaning: 'những tờ giấy', cue: 'Dấu sắc cho biết e mở và được nhấn; éi vẫn là một âm tiết.' },
    { grapheme: 'oi', ipa: '/oj/', spokenUnit: 'boi', example: 'boi', meaning: 'bò đực', cue: 'O + i lướt liền trong một nhịp: boi.' },
    { grapheme: 'ói', ipa: '/ɔj/', spokenUnit: 'rói', example: 'herói', meaning: 'anh hùng', cue: 'Dấu sắc cho biết o mở và được nhấn; ói vẫn đọc liền trong một âm tiết.' },
    { grapheme: 'ui', ipa: '/uj/', spokenUnit: 'fui', example: 'fui', meaning: 'đã đi / đã là', cue: 'U + i đọc liền trong một nhịp ở từ fui.' },
    { grapheme: 'au', ipa: '/aw/', spokenUnit: 'pau', example: 'pau', meaning: 'que gỗ', cue: 'A + u lướt liền trong một âm tiết: pau chỉ có một nhịp.' },
    { grapheme: 'eu', ipa: '/ew/', spokenUnit: 'meu', example: 'meu', meaning: 'của tôi (giống đực)', cue: 'E khép + u đọc liền trong một nhịp ở từ meu.' },
    { grapheme: 'éu', ipa: '/ɛw/', spokenUnit: 'céu', example: 'céu', meaning: 'bầu trời', cue: 'Dấu sắc cho biết e mở; éu vẫn nằm trong cùng một âm tiết.' },
    { grapheme: 'iu', ipa: '/iw/', spokenUnit: 'viu', example: 'viu', meaning: 'đã thấy', cue: 'I + u đọc liền trong một nhịp ở từ viu.' },
    { grapheme: 'ou', ipa: '/ow/ ~ /o/', spokenUnit: 'rou', example: 'roupa', meaning: 'quần áo', cue: 'Trong roupa, ou thuộc cùng âm tiết ROU. Nhiều giọng pt-PT đọc gần /o/, một số vùng còn nghe âm lướt /ow/.' },
  ],
  20: [
    { grapheme: 'a-í', ipa: '/ɐˈi/', spokenUnit: 'aí', example: 'país', meaning: 'đất nước' },
    { grapheme: 'a-ú', ipa: '/ɐˈu/', spokenUnit: 'aú', example: 'baú', meaning: 'rương' },
    { grapheme: 'a-ú', ipa: '/ɐˈu/', spokenUnit: 'aú', example: 'saúde', meaning: 'sức khỏe' },
  ],
  21: [
    { grapheme: 'á', ipa: '/a/', spokenUnit: 'pá', example: 'pá', meaning: 'xẻng' },
    { grapheme: 'é / ê', ipa: '/ɛ/ ~ /e/', spokenUnit: 'pé, vê', example: 'pé / vê', meaning: 'bàn chân / thấy' },
    { grapheme: 'ó / ô', ipa: '/ɔ/ ~ /o/', spokenUnit: 'avó, avô', example: 'avó / avô', meaning: 'bà / ông' },
  ],
  22: [
    { grapheme: '-o', ipa: '/u/', spokenUnit: 'vro', example: 'livro', meaning: 'sách' },
    { grapheme: '-l', ipa: '/ɫ/', spokenUnit: 'sol', example: 'sol', meaning: 'mặt trời' },
    { grapheme: '-r', ipa: '/ɾ/ hoặc /ʁ/', spokenUnit: 'lar', example: 'falar', meaning: 'nói' },
  ],
  23: [
    { grapheme: 'pr', ipa: '/pɾ/', spokenUnit: 'pra', example: 'prato', meaning: 'đĩa' },
    { grapheme: 'br', ipa: '/bɾ/', spokenUnit: 'bra', example: 'bravo', meaning: 'dũng cảm' },
    { grapheme: 'fl', ipa: '/fl/', spokenUnit: 'flor', example: 'flor', meaning: 'hoa' },
  ],
  24: [
    { grapheme: 'x', ipa: '/ʃ/', spokenUnit: 'xa', example: 'xarope', meaning: 'xi-rô' },
    { grapheme: 'x', ipa: '/ks/', spokenUnit: 'xi', example: 'táxi', meaning: 'xe taxi' },
    { grapheme: 'h', ipa: 'không có âm riêng', spokenUnit: 'ho', example: 'hoje', meaning: 'hôm nay' },
  ],
  25: [
    { grapheme: 'a', ipa: '/a/', spokenUnit: 'pá', example: 'pá', meaning: 'xẻng' },
    { grapheme: 'e', ipa: '/ɛ/', spokenUnit: 'pé', example: 'pé', meaning: 'bàn chân' },
    { grapheme: 'o', ipa: '/ɔ/', spokenUnit: 'bola', example: 'bola', meaning: 'quả bóng' },
  ],
  26: [
    { grapheme: 'a không nhấn', ipa: '/ɐ/', spokenUnit: 'sa', example: 'casa', meaning: 'nhà' },
    { grapheme: 'e không nhấn', ipa: '/ɨ/', spokenUnit: 've', example: 'chave', meaning: 'chìa khóa' },
    { grapheme: 'o không nhấn', ipa: '/u/', spokenUnit: 'to', example: 'pato', meaning: 'vịt' },
  ],
  27: [
    { grapheme: 'ai', ipa: '/aj/', spokenUnit: 'pai', example: 'pai', meaning: 'bố' },
    { grapheme: 'ei', ipa: '/ɐj/', spokenUnit: 'lei', example: 'leite', meaning: 'sữa' },
    { grapheme: 'oi', ipa: '/oj/', spokenUnit: 'boi', example: 'boi', meaning: 'bò đực' },
  ],
  28: [
    { grapheme: 'qu + a', ipa: '/kwɐ/', spokenUnit: 'qua', example: 'quatro', meaning: 'bốn' },
    { grapheme: 'á + gua', ipa: '/ˈaɡwɐ/', spokenUnit: 'água', example: 'água', meaning: 'nước' },
    { grapheme: 'uai', ipa: '/waj/', spokenUnit: 'guai', example: 'Paraguai', meaning: 'Paraguay' },
  ],
  29: [
    { grapheme: 'am', ipa: '/ɐ̃/', spokenUnit: 'cam', example: 'campo', meaning: 'đồng ruộng' },
    { grapheme: 'em', ipa: '/ẽ/', spokenUnit: 'tem', example: 'tempo', meaning: 'thời gian' },
    { grapheme: 'om', ipa: '/õ/', spokenUnit: 'som', example: 'som', meaning: 'âm thanh' },
  ],
  30: [
    { grapheme: 'ão', ipa: '/ɐ̃w̃/', spokenUnit: 'pão', example: 'pão', meaning: 'bánh mì' },
    { grapheme: 'ãe', ipa: '/ɐ̃j̃/', spokenUnit: 'mãe', example: 'mãe', meaning: 'mẹ' },
    { grapheme: 'õe', ipa: '/õj̃/', spokenUnit: 'põe', example: 'põe', meaning: 'đặt; để' },
  ],
  31: [
    { grapheme: 'em', ipa: '/ɐ̃j̃/', spokenUnit: 'bem', example: 'bem', meaning: 'tốt' },
    { grapheme: 'am', ipa: '/ɐ̃w̃/', spokenUnit: 'lam', example: 'falam', meaning: 'họ nói' },
    { grapheme: 'im', ipa: '/ĩ/', spokenUnit: 'dim', example: 'jardim', meaning: 'khu vườn' },
  ],
  32: [
    { grapheme: 'p', ipa: '/p/', spokenUnit: 'pa', example: 'pato', meaning: 'vịt' },
    { grapheme: 'b', ipa: '/b/', spokenUnit: 'bo', example: 'bola', meaning: 'quả bóng' },
    { grapheme: 'm', ipa: '/m/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ' },
  ],
  33: [
    { grapheme: 'j', ipa: '/ʒ/', spokenUnit: 'ja', example: 'janela', meaning: 'cửa sổ' },
    { grapheme: 'g + e', ipa: '/ʒ/', spokenUnit: 'ge', example: 'gelo', meaning: 'nước đá' },
  ],
  34: [
    { grapheme: 's-', ipa: '/s/', spokenUnit: 'sa', example: 'sapo', meaning: 'con cóc' },
    { grapheme: 'ss', ipa: '/s/', spokenUnit: 'ssa', example: 'massa', meaning: 'bột nhào' },
    { grapheme: 'c + e', ipa: '/s/', spokenUnit: 'ci', example: 'cidade', meaning: 'thành phố' },
  ],
  35: [
    { grapheme: 'ch', ipa: '/ʃ/', spokenUnit: 'cha', example: 'chave', meaning: 'chìa khóa' },
    { grapheme: 's + t', ipa: '/ʃt/', spokenUnit: 'sta', example: 'pasta', meaning: 'mì ống; bìa hồ sơ' },
    { grapheme: 's + m', ipa: '/ʒm/', spokenUnit: 'smo', example: 'mesmo', meaning: 'cũng; chính' },
  ],
  36: [
    { grapheme: 'x', ipa: '/ʃ/', spokenUnit: 'xa', example: 'xarope', meaning: 'xi-rô' },
    { grapheme: 'x', ipa: '/z/', spokenUnit: 'xa', example: 'exame', meaning: 'bài kiểm tra' },
    { grapheme: 'x', ipa: '/ks/', spokenUnit: 'xi', example: 'táxi', meaning: 'xe taxi' },
  ],
  37: [
    { grapheme: 'qu', ipa: '/k/; u thường câm', spokenUnit: 'que', example: 'queijo', meaning: 'phô mai' },
    { grapheme: 'qu', ipa: '/kw/; u được đọc', spokenUnit: 'qua', example: 'quatro', meaning: 'bốn' },
    { grapheme: 'gu', ipa: '/g/; u thường câm', spokenUnit: 'gue', example: 'guerra', meaning: 'chiến tranh' },
  ],
  38: [
    { grapheme: 'h', ipa: 'không có âm riêng', spokenUnit: 'ho', example: 'hoje', meaning: 'hôm nay' },
    { grapheme: 'k', ipa: '/k/ (từ mượn)', spokenUnit: 'ki', example: 'kiwi', meaning: 'kiwi' },
    { grapheme: 'w', ipa: 'thay đổi theo từ mượn', spokenUnit: 'web', example: 'web', meaning: 'web' },
  ],
  39: [
    { grapheme: 'r đầu từ', ipa: '/ʁ/', spokenUnit: 'ra', example: 'rato', meaning: 'chuột' },
    { grapheme: 'rr', ipa: '/ʁ/', spokenUnit: 'rro', example: 'carro', meaning: 'ô tô' },
    { grapheme: 'r giữa hai nguyên âm', ipa: '/ɾ/', spokenUnit: 'ro', example: 'caro', meaning: 'đắt' },
  ],
  40: [
    { grapheme: 'pr', ipa: '/pɾ/', spokenUnit: 'pra', example: 'prato', meaning: 'đĩa' },
    { grapheme: 'br', ipa: '/bɾ/', spokenUnit: 'bra', example: 'braço', meaning: 'cánh tay' },
    { grapheme: 'pl', ipa: '/pl/', spokenUnit: 'pla', example: 'plano', meaning: 'kế hoạch' },
  ],
  41: [
    { grapheme: 'si', ipa: '/ˈsi/', spokenUnit: 'si', example: 'sino', meaning: 'cái chuông' },
    { grapheme: 'su', ipa: '/ˈsu/', spokenUnit: 'su', example: 'sumo', meaning: 'nước quả' },
    { grapheme: 'nu', ipa: '/nu/', spokenUnit: 'nu', example: 'nuvem', meaning: 'đám mây' },
  ],
  42: [
    { grapheme: 'c + a/o/u', ipa: '/k/', spokenUnit: 'ca', example: 'casa', meaning: 'nhà' },
    { grapheme: 'c + e/i', ipa: '/s/', spokenUnit: 'ci', example: 'cidade', meaning: 'thành phố' },
    { grapheme: 'g + e/i', ipa: '/ʒ/', spokenUnit: 'ge', example: 'gelo', meaning: 'nước đá' },
  ],
  43: [
    { grapheme: 'ai', ipa: '/aj/', spokenUnit: 'pai', example: 'pai', meaning: 'bố' },
    { grapheme: 'ão', ipa: '/ɐ̃w̃/', spokenUnit: 'pão', example: 'pão', meaning: 'bánh mì' },
    { grapheme: 'ãe', ipa: '/ɐ̃j̃/', spokenUnit: 'mãe', example: 'mãe', meaning: 'mẹ' },
  ],
  44: [
    { grapheme: 'ca-sa', ipa: '/ˈka.zɐ/', spokenUnit: 'casa', example: 'casa', meaning: 'nhà; hai âm tiết' },
    { grapheme: 'bo-la', ipa: '/ˈbɔ.lɐ/', spokenUnit: 'bola', example: 'bola', meaning: 'quả bóng; hai âm tiết' },
    { grapheme: 'fi-lho', ipa: '/ˈfi.ʎu/', spokenUnit: 'filho', example: 'filho', meaning: 'con trai; giữ LH cùng âm tiết' },
  ],
  45: [
    { grapheme: 'á', ipa: '/ˈa/', spokenUnit: 'pá', example: 'pá', meaning: 'xẻng; dấu sắc đánh dấu trọng âm' },
    { grapheme: 'é', ipa: '/ˈɛ/', spokenUnit: 'pé', example: 'pé', meaning: 'bàn chân' },
    { grapheme: 'ê', ipa: '/ˈe/', spokenUnit: 'vê', example: 'vê', meaning: 'thấy' },
  ],
  46: [
    { grapheme: 's + vogal', ipa: '/z/', spokenUnit: 'dois amigos', example: 'dois amigos', meaning: 'hai người bạn' },
    { grapheme: 's + vogal', ipa: '/z/', spokenUnit: 'os amigos', example: 'os amigos', meaning: 'những người bạn' },
    { grapheme: 's + phụ âm', ipa: '/ʃ/', spokenUnit: 'os gatos', example: 'os gatos', meaning: 'những con mèo' },
  ],
  47: [
    { grapheme: 'ch', ipa: '/ʃ/', spokenUnit: 'cha', example: 'chave', meaning: 'chìa khóa' },
    { grapheme: 'nh', ipa: '/ɲ/', spokenUnit: 'nho', example: 'ninho', meaning: 'tổ chim' },
    { grapheme: 'lh', ipa: '/ʎ/', spokenUnit: 'lho', example: 'filho', meaning: 'con trai' },
  ],
  48: [
    { grapheme: 'ch', ipa: '/ʃ/', spokenUnit: 'cha', example: 'chuva', meaning: 'mưa' },
    { grapheme: 'lh', ipa: '/ʎ/', spokenUnit: 'lho', example: 'filho', meaning: 'con trai' },
    { grapheme: 'nh', ipa: '/ɲ/', spokenUnit: 'nho', example: 'ninho', meaning: 'tổ chim' },
  ],
};

const vowelLetterNames: Record<string, { text: string; ipa: string }> = {
  a: { text: 'á', ipa: '/a/' },
  e: { text: 'é', ipa: '/ɛ/' },
  i: { text: 'i', ipa: '/i/' },
  o: { text: 'ó', ipa: '/ɔ/' },
  u: { text: 'u', ipa: '/u/' },
};

function getLetterName(
  target: LessonPronunciationTarget,
  lessonId: number,
): { text: string; ipa?: string } | undefined {
  const label = target.label ?? target.grapheme ?? '';
  if (lessonId === 2 && vowelLetterNames[label.toLowerCase()]) {
    return vowelLetterNames[label.toLowerCase()];
  }

  const text = alphabetLetterNames[label.toUpperCase()];
  return text ? { text } : undefined;
}

const baseSupplementalPronunciationTargets: Record<number, LessonPronunciationTarget[]> = {
 
  4: [{ grapheme: 'MA', ipa: '/ˈma/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ; âm tiết đầu được nhấn' }],
  10: [
    { grapheme: '-o yếu', ipa: '/u/', spokenUnit: 'pato', example: 'pato', meaning: 'vịt; chữ o cuối viết nguyên dạng' },
    { grapheme: '-a yếu', ipa: '/ɐ/', spokenUnit: 'mapa', example: 'mapa', meaning: 'bản đồ; chữ a cuối viết nguyên dạng' },
    { grapheme: '-e yếu', ipa: '/ɨ/', spokenUnit: 'chave', example: 'chave', meaning: 'chìa khóa; chữ e cuối viết nguyên dạng' },
    { grapheme: 'câu đọc', ipa: 'cụm từ hoàn chỉnh', spokenUnit: 'O pato vê a bola.', example: 'O pato vê a bola.', meaning: 'Con vịt nhìn thấy quả bóng' },
    { grapheme: 'câu đọc', ipa: 'cụm từ hoàn chỉnh', spokenUnit: 'A menina vê o mapa.', example: 'A menina vê o mapa.', meaning: 'Bé gái nhìn thấy bản đồ' },
  ],
  11: [
    { grapheme: 'ci', ipa: '/si/', spokenUnit: 'ci', example: 'cidade', meaning: 'thành phố' },
    { grapheme: 'qui', ipa: '/ki/', spokenUnit: 'qui', example: 'quilo', meaning: 'ki-lô-gam' },
    { grapheme: 'qua, u được đọc', ipa: '/kw/', spokenUnit: 'qua', example: 'quase', meaning: 'gần như' },
  ],
  12: [
    { grapheme: 'go', ipa: '/go/', spokenUnit: 'go', example: 'gota', meaning: 'giọt' },
    { grapheme: 'gu', ipa: '/gu/', spokenUnit: 'gu', example: 'gula', meaning: 'tính háu ăn' },
    { grapheme: 'gi', ipa: '/ʒi/', spokenUnit: 'gi', example: 'girafa', meaning: 'hươu cao cổ' },
    { grapheme: 'gue, u thường câm', ipa: '/g/', spokenUnit: 'gue', example: 'guerra', meaning: 'chiến tranh' },
    { grapheme: 'gu, u được đọc', ipa: '/gw/', spokenUnit: 'guen', example: 'aguentar', meaning: 'chịu đựng' },
  ],
  14: [{ grapheme: 'z', ipa: '/z/', spokenUnit: 'ze', example: 'zero', meaning: 'số không' }],
  15: [
    { grapheme: 'r đầu từ', ipa: '/ʁ/', spokenUnit: 'ra', example: 'rato', meaning: 'chuột; r đầu từ là R mạnh' },
    { grapheme: 'ç + a', ipa: '/s/', spokenUnit: 'çu', example: 'açúcar', meaning: 'đường' },
    { grapheme: 'ç + o', ipa: '/s/', spokenUnit: 'ço', example: 'almoço', meaning: 'bữa trưa' },
  ],
  16: [
    { grapheme: 's cuối từ', ipa: '/ʃ/', spokenUnit: 'dois', example: 'dois', meaning: 'hai; s ở cuối khi đứng riêng' },
    { grapheme: 'z cuối từ', ipa: '/ʃ/ trước pausa trong giọng mẫu', spokenUnit: 'liz', example: 'feliz', meaning: 'vui' },
    { grapheme: 's nối sang nguyên âm', ipa: '/z/', spokenUnit: 'os amigos', example: 'os amigos', meaning: 'những người bạn' },
  ],
  17: [
    { grapheme: 'm mở âm tiết sau', ipa: 'nguyên âm miệng', spokenUnit: 'ma', example: 'cama', meaning: 'giường; so sánh với campo' },
    { grapheme: 'am + m cuối âm tiết', ipa: '/ɐ̃/', spokenUnit: 'cam', example: 'campo', meaning: 'đồng ruộng; nguyên âm mũi' },
    { grapheme: 'im', ipa: '/ĩ/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
  ],
  18: [{ grapheme: 'ã', ipa: '/ɐ̃/', spokenUnit: 'mã', example: 'irmã', meaning: 'chị/em gái' }],
  20: [
    { grapheme: 'u-a, hai âm tiết', ipa: '/u.ɐ/', spokenUnit: 'lu-a', example: 'lua', meaning: 'mặt trăng' },
    { grapheme: 'pai / país', ipa: 'một âm tiết / hai âm tiết', spokenUnit: 'pai, pa-ís', example: 'país', meaning: 'đất nước; so sánh với pai (bố)' },
  ],
  21: [
    { grapheme: 'í / ú', ipa: 'dấu sắc đánh dấu trọng âm', spokenUnit: 'lá-pis, mú-si-ca', example: 'lápis / música', meaning: 'bút chì / âm nhạc' },
    { grapheme: 'â / ô', ipa: 'dấu mũ; nguyên âm khép trong ví dụ', spokenUnit: 'câ-ma-ra, avô', example: 'câmara / avô', meaning: 'phòng / ông' },
    { grapheme: 'ã / õ', ipa: 'dấu ngã biểu thị âm mũi', spokenUnit: 'ir-mã, põe', example: 'irmã / põe', meaning: 'chị/em gái / đặt' },
    { grapheme: 'à', ipa: 'dấu chính tả, không phải thanh huyền', spokenUnit: 'à', example: 'à', meaning: 'dạng dấu huyền trong chính tả' },
    { grapheme: 'ç', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân; c có móc' },
  ],
  22: [
    { grapheme: '-s cuối', ipa: '/ʃ/ hoặc /z/ theo ngữ cảnh', spokenUnit: 'dois', example: 'dois', meaning: 'hai' },
    { grapheme: '-z cuối', ipa: '/ʃ/ trước pausa trong giọng mẫu', spokenUnit: 'liz', example: 'feliz', meaning: 'vui' },
    { grapheme: '-m cuối', ipa: 'thường báo hiệu nguyên âm mũi', spokenUnit: 'bem', example: 'bem', meaning: 'tốt' },
    { grapheme: '-am cuối', ipa: 'đuôi động từ thường không nhấn', spokenUnit: 'lam', example: 'falam', meaning: 'họ nói' },
  ],
  23: [
    { grapheme: 'tr', ipa: '/tɾ/', spokenUnit: 'tre', example: 'trevo', meaning: 'cỏ ba lá' },
    { grapheme: 'vr', ipa: '/vɾ/', spokenUnit: 'vro', example: 'livro', meaning: 'sách; cụm vr trong từ thật' },
  ],
  24: [
    { grapheme: 'x', ipa: '/z/', spokenUnit: 'za', example: 'exame', meaning: 'bài kiểm tra' },
    { grapheme: 'x', ipa: '/s/', spokenUnit: 'si', example: 'próximo', meaning: 'tiếp theo; gần nhất' },
  ],
  25: [
    { grapheme: 'a', ipa: '/ɐ/', spokenUnit: 'ca', example: 'cama', meaning: 'giường; âm a hẹp theo môi trường' },
    { grapheme: 'e', ipa: '/e/', spokenUnit: 'ge', example: 'gelo', meaning: 'nước đá; e khép' },
    { grapheme: 'i', ipa: '/i/', spokenUnit: 'di', example: 'dia', meaning: 'ngày' },
    { grapheme: 'o', ipa: '/o/', spokenUnit: 'vo', example: 'avô', meaning: 'ông; o khép' },
    { grapheme: 'u', ipa: '/u/', spokenUnit: 'lu', example: 'lua', meaning: 'mặt trăng' },
  ],
  26: [
    { grapheme: 'i không nhấn', ipa: '/i/', spokenUnit: 'i', example: 'menina', meaning: 'bé gái; i thường giữ âm cao' },
    { grapheme: 'u không nhấn', ipa: '/u/', spokenUnit: 'u', example: 'uva', meaning: 'nho' },
    { grapheme: 'e đầu từ yếu', ipa: '/ɨ/ có thể rút gọn', spokenUnit: 'es', example: 'escola', meaning: 'trường học; e đầu có thể rất yếu' },
  ],
  27: [
    { grapheme: 'éi', ipa: '/ɛj/', spokenUnit: 'péis', example: 'papéis', meaning: 'những tờ giấy' },
    { grapheme: 'ói', ipa: '/ɔj/', spokenUnit: 'rói', example: 'herói', meaning: 'anh hùng' },
    { grapheme: 'ui', ipa: '/uj/', spokenUnit: 'fui', example: 'fui', meaning: 'đã đi / đã là' },
    { grapheme: 'au', ipa: '/aw/', spokenUnit: 'pau', example: 'pau', meaning: 'khúc gỗ' },
    { grapheme: 'eu', ipa: '/ew/', spokenUnit: 'meu', example: 'meu', meaning: 'của tôi' },
    { grapheme: 'éu', ipa: '/ɛw/', spokenUnit: 'céu', example: 'céu', meaning: 'bầu trời' },
    { grapheme: 'iu', ipa: '/iw/', spokenUnit: 'viu', example: 'viu', meaning: 'đã thấy' },
    { grapheme: 'ou', ipa: '/ow/', spokenUnit: 'ou', example: 'roupa', meaning: 'quần áo' },
    { grapheme: 'ui mũi', ipa: 'cách đọc mũi trong từ mẫu', spokenUnit: 'muito', example: 'muito', meaning: 'nhiều; rất' },
  ],
  28: [
    { grapheme: 'u-a hiatus', ipa: '/u.ɐ/', spokenUnit: 'lu-a', example: 'lua', meaning: 'mặt trăng; hai âm tiết' },
    { grapheme: 'uai', ipa: '/waj/', spokenUnit: 'quais', example: 'quais', meaning: 'những cái nào' },
    { grapheme: 'uais', ipa: '/wɐjʃ/', spokenUnit: 'guais', example: 'iguais', meaning: 'giống nhau' },
    { grapheme: 'uão', ipa: 'chuỗi ba nguyên âm/vần mũi theo từ', spokenUnit: 'guão', example: 'saguão', meaning: 'sảnh lớn' },
  ],
  29: [
    { grapheme: 'im / in', ipa: '/ĩ/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
    { grapheme: 'um / un', ipa: '/ũ/', spokenUnit: 'mun', example: 'mundo', meaning: 'thế giới' },
  ],
  30: [
    { grapheme: 'ãi', ipa: 'vần mũi được nêu trong bài', spokenUnit: 'cãi', example: 'cãibra', meaning: 'chuột rút' },
    { grapheme: '-ães', ipa: 'đuôi số nhiều; nghe cả từ', spokenUnit: 'mães', example: 'mães', meaning: 'những người mẹ' },
    { grapheme: '-ões', ipa: 'đuôi số nhiều; nghe cả từ', spokenUnit: 'mões', example: 'limões', meaning: 'những quả chanh' },
    { grapheme: '-ãos', ipa: 'đuôi số nhiều; nghe cả từ', spokenUnit: 'ãos', example: 'irmãos', meaning: 'các anh/em trai' },
  ],
  31: [
    { grapheme: 'om', ipa: '/õ/', spokenUnit: 'som', example: 'som', meaning: 'âm thanh' },
    { grapheme: 'um', ipa: '/ũ/', spokenUnit: 'gum', example: 'algum', meaning: 'một vài; nào đó' },
    { grapheme: 'ui', ipa: 'vần mũi trong từ mẫu', spokenUnit: 'muito', example: 'muito', meaning: 'nhiều; rất' },
    { grapheme: '-ém', ipa: '/ɐ̃j̃/', spokenUnit: 'bém', example: 'também', meaning: 'cũng' },
  ],
  32: [
    { grapheme: 't', ipa: '/t/', spokenUnit: 'te', example: 'teto', meaning: 'mái nhà' },
    { grapheme: 'd', ipa: '/d/', spokenUnit: 'da', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 'c / qu', ipa: '/k/', spokenUnit: 'ca, quei', example: 'casa / queijo', meaning: 'nhà / phô mai' },
    { grapheme: 'g / gu', ipa: '/g/', spokenUnit: 'ga, gui', example: 'gato / guitarra', meaning: 'mèo / đàn ghi-ta' },
    { grapheme: 'f / v', ipa: '/f/ /v/', spokenUnit: 'fa, va', example: 'faca / vaca', meaning: 'dao / bò cái' },
    { grapheme: 's / z', ipa: '/s/ /z/ tùy vị trí', spokenUnit: 'sa, ze', example: 'sapo / zero', meaning: 'con cóc / số không' },
    { grapheme: 'ch / j', ipa: '/ʃ/ /ʒ/', spokenUnit: 'cha, ja', example: 'chave / janela', meaning: 'chìa khóa / cửa sổ' },
    { grapheme: 'nh / lh', ipa: '/ɲ/ /ʎ/', spokenUnit: 'nho, lho', example: 'ninho / filho', meaning: 'tổ chim / con trai' },
    { grapheme: 'l cuối âm tiết', ipa: '/ɫ/', spokenUnit: 'sol', example: 'sol', meaning: 'mặt trời' },
    { grapheme: 'r mạnh / r nhẹ', ipa: '/ʁ/ /ɾ/', spokenUnit: 'ra, ro', example: 'rato / caro', meaning: 'chuột / đắt' },
  ],
  33: [
    { grapheme: 'g + i', ipa: '/ʒ/', spokenUnit: 'gi', example: 'girafa', meaning: 'hươu cao cổ' },
    { grapheme: 'j + o', ipa: '/ʒ/', spokenUnit: 'jo', example: 'jogo', meaning: 'trò chơi' },
  ],
  34: [
    { grapheme: 'sc', ipa: '/s/', spokenUnit: 'nas', example: 'nascer', meaning: 'sinh ra' },
    { grapheme: 'sç', ipa: '/s/', spokenUnit: 'sça', example: 'cresça', meaning: 'lớn lên; dạng chia động từ' },
    { grapheme: 'xc', ipa: '/s/', spokenUnit: 'cel', example: 'excelente', meaning: 'xuất sắc' },
    { grapheme: 'ç', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân' },
  ],
  35: [
    { grapheme: 'x', ipa: '/ʃ/', spokenUnit: 'xei', example: 'peixe', meaning: 'cá' },
    { grapheme: 's cuối từ', ipa: '/ʃ/', spokenUnit: 'dois', example: 'dois', meaning: 'hai; s cuối từ' },
  ],
  36: [
    { grapheme: 'x', ipa: '/s/', spokenUnit: 'ximo', example: 'próximo', meaning: 'tiếp theo; gần nhất' },
    { grapheme: 'x', ipa: '/gz/ trong ví dụ này', spokenUnit: 'xá', example: 'hexágono', meaning: 'hình lục giác' },
  ],
  37: [
    { grapheme: 'qu, u được đọc', ipa: '/kw/', spokenUnit: 'quã', example: 'cinquenta', meaning: 'năm mươi' },
    { grapheme: 'gu, u được đọc', ipa: '/gw/', spokenUnit: 'guen', example: 'aguentar', meaning: 'chịu đựng' },
    { grapheme: 'gu, u được đọc', ipa: '/gw/', spokenUnit: 'gui', example: 'linguiça', meaning: 'xúc xích kiểu Portugal' },
    { grapheme: 'gu, u được đọc', ipa: '/gw/', spokenUnit: 'guim', example: 'pinguim', meaning: 'chim cánh cụt' },
  ],
  38: [{ grapheme: 'y trong từ mượn', ipa: 'tùy từ mượn', spokenUnit: 'yo', example: 'yoga', meaning: 'yoga' }],
  39: [
    { grapheme: 'r cuối âm tiết', ipa: 'âm r cuối; có biến thể vùng', spokenUnit: 'mar', example: 'mar', meaning: 'biển' },
    { grapheme: 'l cuối âm tiết', ipa: '/ɫ/', spokenUnit: 'sol', example: 'sol', meaning: 'mặt trời' },
    { grapheme: 'l trước phụ âm', ipa: '/ɫ/', spokenUnit: 'al', example: 'alto', meaning: 'cao' },
    { grapheme: 'l cuối từ', ipa: '/ɫ/', spokenUnit: 'pel', example: 'papel', meaning: 'giấy' },
  ],
  40: [
    { grapheme: 'dr', ipa: '/dɾ/', spokenUnit: 'dro', example: 'quadro', meaning: 'bức tranh; khung' },
    { grapheme: 'cr', ipa: '/kɾ/', spokenUnit: 'cra', example: 'cravo', meaning: 'đinh; hoa cẩm chướng tùy ngữ cảnh' },
    { grapheme: 'gr', ipa: '/gɾ/', spokenUnit: 'gri', example: 'grilo', meaning: 'con dế' },
    { grapheme: 'fr', ipa: '/fɾ/', spokenUnit: 'fru', example: 'fruta', meaning: 'trái cây' },
    { grapheme: 'vr', ipa: '/vɾ/', spokenUnit: 'vro', example: 'livro', meaning: 'sách' },
    { grapheme: 'bl', ipa: '/bl/', spokenUnit: 'blo', example: 'bloco', meaning: 'khối; tòa nhà' },
    { grapheme: 'cl', ipa: '/kl/', spokenUnit: 'cla', example: 'claro', meaning: 'rõ; sáng' },
    { grapheme: 'gl', ipa: '/gl/', spokenUnit: 'glo', example: 'globo', meaning: 'quả địa cầu' },
  ],
  41: [
    { grapheme: 'p', ipa: '/p/', spokenUnit: 'pa', example: 'pato', meaning: 'vịt' },
    { grapheme: 'b', ipa: '/b/', spokenUnit: 'ba', example: 'bala', meaning: 'kẹo' },
    { grapheme: 't', ipa: '/t/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
    { grapheme: 'd', ipa: '/d/', spokenUnit: 'da', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 'f', ipa: '/f/', spokenUnit: 'fa', example: 'faca', meaning: 'dao' },
    { grapheme: 'v', ipa: '/v/', spokenUnit: 'va', example: 'vaca', meaning: 'bò cái' },
    { grapheme: 'm', ipa: '/m/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ' },
    { grapheme: 'n', ipa: '/n/', spokenUnit: 'nu', example: 'nuvem', meaning: 'đám mây' },
    { grapheme: 'l', ipa: '/l/', spokenUnit: 'la', example: 'lata', meaning: 'cái lon' },
    { grapheme: 's', ipa: '/s/', spokenUnit: 'si', example: 'sino', meaning: 'cái chuông' },
    { grapheme: 'r', ipa: '/ʁ/ hoặc /ɾ/ tùy vị trí', spokenUnit: 'ra', example: 'rato', meaning: 'chuột' },
    { grapheme: 'j', ipa: '/ʒ/', spokenUnit: 'ja', example: 'janela', meaning: 'cửa sổ' },
  ],
  42: [
    { grapheme: 'g + a/o/u', ipa: '/g/', spokenUnit: 'ga', example: 'gato', meaning: 'mèo' },
    { grapheme: 'gu + e/i', ipa: '/g/', spokenUnit: 'gue', example: 'guerra', meaning: 'chiến tranh' },
    { grapheme: 'ç + a/o/u', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân' },
    { grapheme: 'j', ipa: '/ʒ/', spokenUnit: 'ja', example: 'janela', meaning: 'cửa sổ' },
    { grapheme: 'z', ipa: '/z/', spokenUnit: 'ze', example: 'zero', meaning: 'số không' },
  ],
  43: [
    { grapheme: 'au', ipa: '/aw/', spokenUnit: 'pau', example: 'pau', meaning: 'khúc gỗ' },
    { grapheme: 'eu', ipa: '/ew/', spokenUnit: 'meu', example: 'meu', meaning: 'của tôi' },
    { grapheme: 'oi', ipa: '/oj/', spokenUnit: 'boi', example: 'boi', meaning: 'bò đực' },
    { grapheme: 'éu', ipa: '/ɛw/', spokenUnit: 'céu', example: 'céu', meaning: 'bầu trời' },
    { grapheme: 'ui', ipa: '/uj/', spokenUnit: 'fui', example: 'fui', meaning: 'đã đi / đã là' },
    { grapheme: 'õe', ipa: '/õj̃/', spokenUnit: 'põe', example: 'põe', meaning: 'đặt; để' },
    { grapheme: 'em', ipa: '/ɐ̃j̃/', spokenUnit: 'bem', example: 'bem', meaning: 'tốt' },
    { grapheme: 'om', ipa: '/õ/', spokenUnit: 'som', example: 'som', meaning: 'âm thanh' },
    { grapheme: 'im', ipa: '/ĩ/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
  ],
  44: [
    { grapheme: 'pai / país', ipa: 'một âm tiết / hai âm tiết', spokenUnit: 'pai, pa-ís', example: 'país', meaning: 'đất nước; so sánh với pai' },
    { grapheme: 'rr chia khi viết âm tiết', ipa: '/ʁ/', spokenUnit: 'car-ro', example: 'carro', meaning: 'ô tô' },
    { grapheme: 'ss chia khi viết âm tiết', ipa: '/s/', spokenUnit: 'mas-sa', example: 'massa', meaning: 'bột nhào' },
    { grapheme: 'ch giữ trong một âm tiết', ipa: '/ʃ/', spokenUnit: 'cha-ve', example: 'chave', meaning: 'chìa khóa' },
  ],
  45: [
    { grapheme: 'í / ú', ipa: 'dấu sắc đánh dấu trọng âm', spokenUnit: 'lá-pis, mú-si-ca', example: 'lápis / música', meaning: 'bút chì / âm nhạc' },
    { grapheme: 'â / ô', ipa: 'dấu mũ; nguyên âm khép trong ví dụ', spokenUnit: 'câ-ma-ra, avô', example: 'câmara / avô', meaning: 'phòng / ông' },
    { grapheme: 'ã / õ', ipa: 'dấu ngã biểu thị âm mũi', spokenUnit: 'ir-mã, põe', example: 'irmã / põe', meaning: 'chị/em gái / đặt' },
    { grapheme: 'à', ipa: 'dấu chính tả, không phải thanh huyền', spokenUnit: 'à', example: 'à', meaning: 'dấu xuất hiện trong một số dạng viết' },
    { grapheme: '-ico / -ica', ipa: 'trọng âm theo từ', spokenUnit: 'mé-di-co', example: 'médico', meaning: 'bác sĩ' },
    { grapheme: 'falamos / falámos', ipa: 'khác dạng viết/đọc theo trọng âm', spokenUnit: 'falámos', example: 'falámos', meaning: 'chúng tôi đã nói' },
  ],
  46: [
    { grapheme: 's trước phụ âm hữu thanh', ipa: '/ʒ/', spokenUnit: 'li-vros', example: 'os livros', meaning: 'những quyển sách' },
    { grapheme: 'e cuối + nguyên âm', ipa: 'e yếu có thể rút gọn khi nối', spokenUnit: 'o a-mi-go', example: 'o amigo', meaning: 'người bạn' },
    { grapheme: 'de + água', ipa: 'nối nguyên âm giữa hai từ', spokenUnit: 'de água', example: 'de água', meaning: 'của nước / bằng nước tùy câu' },
    { grapheme: 'a + escola', ipa: 'nối nguyên âm giữa hai từ', spokenUnit: 'a escola', example: 'a escola', meaning: 'ngôi trường' },
  ],
  47: [
    { grapheme: 'nguyên âm miệng', ipa: 'a e i o u', spokenUnit: 'a e i o u', example: 'a e i o u', meaning: 'năm chữ nguyên âm' },
    { grapheme: 'nguyên âm mũi', ipa: 'âm mũi theo từng vần', spokenUnit: 'pão, mãe, bem', example: 'pão / mãe / bem', meaning: 'bánh mì / mẹ / tốt' },
    { grapheme: 'r mạnh / r nhẹ', ipa: '/ʁ/ /ɾ/', spokenUnit: 'rato, caro, carro', example: 'rato / caro / carro', meaning: 'chuột / đắt / ô tô' },
    { grapheme: 'c / qu', ipa: '/k/ hoặc /s/ theo chữ sau', spokenUnit: 'casa, cidade, queijo', example: 'casa / cidade / queijo', meaning: 'nhà / thành phố / phô mai' },
  ],
  48: [
    { grapheme: 'c + e / ss', ipa: '/s/', spokenUnit: 'ce, ssa', example: 'casa / massa', meaning: 'nhà / bột nhào' },
    { grapheme: 'g mềm / g cứng', ipa: '/ʒ/ /g/', spokenUnit: 'ge, ga', example: 'gelo / gato', meaning: 'nước đá / mèo' },
    { grapheme: 'qu', ipa: '/k/; u thường câm trong que', spokenUnit: 'que', example: 'queijo', meaning: 'phô mai' },
    { grapheme: 'ão', ipa: 'vần mũi', spokenUnit: 'pão', example: 'pão', meaning: 'bánh mì' },
    { grapheme: 'rr', ipa: '/ʁ/', spokenUnit: 'carro', example: 'autocarro', meaning: 'xe buýt; có rr' },
    { grapheme: 's cuối từ', ipa: '/ʃ/ hoặc nối /z/ tùy ngữ cảnh', spokenUnit: 'dois amigos', example: 'dois amigos', meaning: 'hai người bạn' },
  ],
};

// Supplemental targets fill every explicitly taught branch/example category in the manuscript.
// This is curriculum coverage, not a claim to enumerate every Portuguese word or dialect form.
const supplementalPronunciationTargets: Record<number, LessonPronunciationTarget[]> = {
  
  4: [
    { grapheme: 'MA', ipa: '/ˈma/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ; nhấn âm tiết đầu' },
  ],
  10: [
    { grapheme: '-o không nhấn', ipa: '/u/', spokenUnit: 'pato', example: 'pato', meaning: 'vịt; âm cuối yếu nhưng viết o' },
    { grapheme: '-a không nhấn', ipa: '/ɐ/', spokenUnit: 'mapa', example: 'mapa', meaning: 'bản đồ; âm cuối yếu nhưng viết a' },
    { grapheme: '-e không nhấn', ipa: '/ɨ/', spokenUnit: 'chave', example: 'chave', meaning: 'chìa khóa; e cuối rất nhẹ nhưng vẫn viết e' },
    { grapheme: 'O pato vê a bola', ipa: 'câu luyện đọc', spokenUnit: 'O pato vê a bola.', example: 'O pato vê a bola.', meaning: 'Con vịt nhìn thấy quả bóng' },
    { grapheme: 'A menina vê o mapa', ipa: 'câu luyện đọc', spokenUnit: 'A menina vê o mapa.', example: 'A menina vê o mapa.', meaning: 'Bé gái nhìn thấy bản đồ' },
  ],
  11: [
    { grapheme: 'ci', ipa: '/si/', spokenUnit: 'ci', example: 'cidade', meaning: 'thành phố' },
    { grapheme: 'qui', ipa: '/ki/', spokenUnit: 'qui', example: 'quilo', meaning: 'ki-lô-gam; u thường câm trong qui' },
    { grapheme: 'qua', ipa: '/kwɐ/', spokenUnit: 'qua', example: 'quase', meaning: 'gần như; trong từ này u được đọc' },
  ],
  12: [
    { grapheme: 'go', ipa: '/go/', spokenUnit: 'go', example: 'gota', meaning: 'giọt' },
    { grapheme: 'gu', ipa: '/gu/', spokenUnit: 'gu', example: 'gula', meaning: 'tính háu ăn' },
    { grapheme: 'gi', ipa: '/ʒi/', spokenUnit: 'gi', example: 'girafa', meaning: 'hươu cao cổ' },
    { grapheme: 'gue', ipa: '/g/', spokenUnit: 'gue', example: 'guerra', meaning: 'chiến tranh; u thường câm' },
    { grapheme: 'gu + u được đọc', ipa: '/gw/', spokenUnit: 'guen', example: 'aguentar', meaning: 'chịu đựng; trong từ này u được đọc' },
  ],
  14: [
    { grapheme: 'z', ipa: '/z/', spokenUnit: 'ze', example: 'zero', meaning: 'số không' },
  ],
  15: [
    { grapheme: 'r đầu từ', ipa: '/ʁ/', spokenUnit: 'ra', example: 'rato', meaning: 'chuột; r đầu từ là R mạnh' },
    { grapheme: 'ç + a', ipa: '/s/', spokenUnit: 'çu', example: 'açúcar', meaning: 'đường' },
    { grapheme: 'ç + o', ipa: '/s/', spokenUnit: 'ço', example: 'almoço', meaning: 'bữa trưa' },
  ],
  16: [
    { grapheme: 's cuối từ', ipa: '/ʃ/', spokenUnit: 'dois', example: 'dois', meaning: 'hai; s cuối trước pausa' },
    { grapheme: 'z cuối từ', ipa: '/ʃ/', spokenUnit: 'feliz', example: 'feliz', meaning: 'vui; z cuối có thể nghe /ʃ/' },
    { grapheme: 's + nguyên âm', ipa: '/z/', spokenUnit: 'os amigos', example: 'os amigos', meaning: 'những người bạn; s nối sang nguyên âm' },
  ],
  17: [
    { grapheme: 'am miệng', ipa: '/ɐm/', spokenUnit: 'cama', example: 'cama', meaning: 'giường; m mở đầu âm tiết sau nên không tạo vần mũi như campo' },
    { grapheme: 'am mũi', ipa: '/ɐ̃/', spokenUnit: 'cam', example: 'campo', meaning: 'đồng ruộng; m cuối âm tiết làm nguyên âm mũi' },
    { grapheme: 'im', ipa: '/ĩ/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
  ],
  18: [
    { grapheme: 'ã', ipa: '/ɐ̃/', spokenUnit: 'mã', example: 'irmã', meaning: 'chị/em gái' },
  ],
  20: [
    { grapheme: 'u-a (hiatus)', ipa: '/u.ɐ/', spokenUnit: 'lu-a', example: 'lua', meaning: 'mặt trăng; hai nguyên âm thuộc hai âm tiết' },
    { grapheme: 'pai / país', ipa: 'một nhịp / hai nhịp', spokenUnit: 'pai, pa-ís', example: 'país', meaning: 'đất nước; so sánh pai và país' },
  ],
  21: [
    { grapheme: 'í / ú', ipa: '/i/ /u/ có trọng âm', spokenUnit: 'pa-ís, ba-ú', example: 'país / baú', meaning: 'đất nước / rương' },
    { grapheme: 'â / ô', ipa: 'dấu mũ: nguyên âm khép trong ví dụ', spokenUnit: 'câmara, avô', example: 'câmara / avô', meaning: 'phòng / ông' },
    { grapheme: 'ã / õ', ipa: 'dấu ngã biểu thị nguyên âm mũi', spokenUnit: 'irmã, põe', example: 'irmã / põe', meaning: 'chị/em gái / đặt' },
    { grapheme: 'à', ipa: 'dấu huyền trong chính tả, không phải thanh huyền', spokenUnit: 'à', example: 'à', meaning: 'dấu xuất hiện trong một số dạng viết; không gán thanh điệu tiếng Việt' },
    { grapheme: 'ç', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân; chữ c có móc' },
  ],
  22: [
    { grapheme: '-s cuối', ipa: '/ʃ/ hoặc /z/ tùy ngữ cảnh', spokenUnit: 'dois', example: 'dois', meaning: 'hai; âm cuối s đổi theo vị trí/nối âm' },
    { grapheme: '-z cuối', ipa: '/ʃ/ trước pausa trong giọng mẫu', spokenUnit: 'feliz', example: 'feliz', meaning: 'vui' },
    { grapheme: '-m cuối', ipa: 'thường báo hiệu nguyên âm mũi', spokenUnit: 'bem', example: 'bem', meaning: 'tốt' },
    { grapheme: '-am cuối', ipa: 'đuôi động từ, thường không nhấn', spokenUnit: 'falam', example: 'falam', meaning: 'họ nói' },
  ],
  23: [
    { grapheme: 'tr', ipa: '/tɾ/', spokenUnit: 'tre', example: 'trevo', meaning: 'cỏ ba lá' },
    { grapheme: 'vr', ipa: '/vɾ/', spokenUnit: 'vro', example: 'livro', meaning: 'sách; cụm vr nằm giữa từ' },
  ],
  24: [
    { grapheme: 'x', ipa: '/z/', spokenUnit: 'exa', example: 'exame', meaning: 'bài kiểm tra' },
    { grapheme: 'x', ipa: '/s/', spokenUnit: 'ximo', example: 'próximo', meaning: 'gần tiếp theo' },
  ],
  25: [
    { grapheme: 'a', ipa: '/ɐ/', spokenUnit: 'ca', example: 'cama', meaning: 'giường; ví dụ nguyên âm a hẹp theo môi trường' },
    { grapheme: 'e', ipa: '/e/', spokenUnit: 'ge', example: 'gelo', meaning: 'nước đá; e khép' },
    { grapheme: 'i', ipa: '/i/', spokenUnit: 'di', example: 'dia', meaning: 'ngày' },
    { grapheme: 'o', ipa: '/o/', spokenUnit: 'vo', example: 'avô', meaning: 'ông; o khép' },
    { grapheme: 'u', ipa: '/u/', spokenUnit: 'lu', example: 'lua', meaning: 'mặt trăng' },
  ],
  26: [
    { grapheme: 'i không nhấn', ipa: '/i/', spokenUnit: 'i', example: 'menina', meaning: 'bé gái; i giữ nguyên chất âm cao' },
    { grapheme: 'u không nhấn', ipa: '/u/', spokenUnit: 'u', example: 'uva', meaning: 'nho' },
    { grapheme: 'e đầu từ yếu', ipa: '/ɨ/ có thể rút gọn', spokenUnit: 'es', example: 'escola', meaning: 'trường học; e đầu có thể rất yếu' },
  ],
  27: [
    { grapheme: 'éi', ipa: '/ɛj/', spokenUnit: 'péis', example: 'papéis', meaning: 'những tờ giấy' },
    { grapheme: 'ói', ipa: '/ɔj/', spokenUnit: 'rói', example: 'herói', meaning: 'anh hùng' },
    { grapheme: 'ui', ipa: '/uj/', spokenUnit: 'fui', example: 'fui', meaning: 'đã đi / đã là' },
    { grapheme: 'au', ipa: '/aw/', spokenUnit: 'pau', example: 'pau', meaning: 'khúc gỗ' },
    { grapheme: 'eu', ipa: '/ew/', spokenUnit: 'meu', example: 'meu', meaning: 'của tôi' },
    { grapheme: 'éu', ipa: '/ɛw/', spokenUnit: 'céu', example: 'céu', meaning: 'bầu trời' },
    { grapheme: 'iu', ipa: '/iw/', spokenUnit: 'viu', example: 'viu', meaning: 'đã thấy' },
    { grapheme: 'ou', ipa: '/ow/', spokenUnit: 'ou', example: 'roupa', meaning: 'quần áo' },
    { grapheme: 'ui mũi', ipa: 'vần có âm mũi theo từ', spokenUnit: 'muito', example: 'muito', meaning: 'nhiều; rất' },
  ],
  28: [
    { grapheme: 'u-a hiatus', ipa: '/u.ɐ/', spokenUnit: 'lu-a', example: 'lua', meaning: 'mặt trăng; hai âm tiết' },
    { grapheme: 'uai', ipa: '/waj/', spokenUnit: 'quais', example: 'quais', meaning: 'những cái nào' },
    { grapheme: 'uais', ipa: '/wɐjʃ/', spokenUnit: 'iguais', example: 'iguais', meaning: 'giống nhau' },
    { grapheme: 'uão', ipa: 'chuỗi ba nguyên âm/vần mũi theo từ', spokenUnit: 'guão', example: 'saguão', meaning: 'sảnh lớn' },
  ],
  29: [
    { grapheme: 'im / in', ipa: '/ĩ/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
    { grapheme: 'um / un', ipa: '/ũ/', spokenUnit: 'mun', example: 'mundo', meaning: 'thế giới' },
  ],
  30: [
    { grapheme: 'ãi', ipa: 'vần mũi được nêu trong bài', spokenUnit: 'cãi', example: 'cãibra', meaning: 'chuột rút' },
    { grapheme: '-ães', ipa: 'đuôi số nhiều; nghe cả dạng từ', spokenUnit: 'mães', example: 'mães', meaning: 'những người mẹ' },
    { grapheme: '-ões', ipa: 'đuôi số nhiều; nghe cả dạng từ', spokenUnit: 'limões', example: 'limões', meaning: 'những quả chanh' },
    { grapheme: '-ãos', ipa: 'đuôi số nhiều; nghe cả dạng từ', spokenUnit: 'irmãos', example: 'irmãos', meaning: 'anh/em trai; các anh em' },
  ],
  31: [
    { grapheme: 'om', ipa: '/õ/', spokenUnit: 'som', example: 'som', meaning: 'âm thanh' },
    { grapheme: 'um', ipa: '/ũ/', spokenUnit: 'gum', example: 'algum', meaning: 'một vài; nào đó' },
    { grapheme: 'ui', ipa: 'vần mũi trong từ mẫu', spokenUnit: 'muito', example: 'muito', meaning: 'nhiều; rất' },
    { grapheme: '-ém', ipa: '/ɐ̃j̃/', spokenUnit: 'bém', example: 'também', meaning: 'cũng' },
  ],
  32: [
    { grapheme: 't', ipa: '/t/', spokenUnit: 'te', example: 'teto', meaning: 'mái nhà' },
    { grapheme: 'd', ipa: '/d/', spokenUnit: 'da', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 'k/c/qu', ipa: '/k/', spokenUnit: 'ca', example: 'casa / queijo', meaning: 'nhà / phô mai' },
    { grapheme: 'g/gu', ipa: '/g/', spokenUnit: 'ga', example: 'gato / guitarra', meaning: 'mèo / đàn ghi-ta' },
    { grapheme: 'f/v', ipa: '/f/ và /v/', spokenUnit: 'fa, va', example: 'faca / vaca', meaning: 'dao / bò cái' },
    { grapheme: 's/z', ipa: '/s/ và /z/ tùy vị trí', spokenUnit: 'sa, za', example: 'sapo / zero', meaning: 'con cóc / số không' },
    { grapheme: 'ch/j', ipa: '/ʃ/ và /ʒ/', spokenUnit: 'cha, ja', example: 'chave / janela', meaning: 'chìa khóa / cửa sổ' },
    { grapheme: 'nh/lh', ipa: '/ɲ/ và /ʎ/', spokenUnit: 'nho, lho', example: 'ninho / filho', meaning: 'tổ chim / con trai' },
    { grapheme: 'l cuối âm tiết', ipa: '/ɫ/', spokenUnit: 'sol', example: 'sol', meaning: 'mặt trời' },
    { grapheme: 'r mạnh / r nhẹ', ipa: '/ʁ/ và /ɾ/', spokenUnit: 'ra, ro', example: 'rato / caro', meaning: 'chuột / đắt' },
  ],
  33: [
    { grapheme: 'g + i', ipa: '/ʒ/', spokenUnit: 'gi', example: 'girafa', meaning: 'hươu cao cổ' },
    { grapheme: 'g + o', ipa: '/g/', spokenUnit: 'go', example: 'jogo', meaning: 'trò chơi; so sánh âm j/g mềm theo bài' },
  ],
  34: [
    { grapheme: 'sc', ipa: '/s/', spokenUnit: 'nas', example: 'nascer', meaning: 'sinh ra' },
    { grapheme: 'sç', ipa: '/s/', spokenUnit: 'sça', example: 'cresça', meaning: 'lớn lên; dạng chia động từ' },
    { grapheme: 'xc', ipa: '/s/', spokenUnit: 'cel', example: 'excelente', meaning: 'xuất sắc' },
    { grapheme: 'ç', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân' },
  ],
  35: [
    { grapheme: 'x', ipa: '/ʃ/', spokenUnit: 'xei', example: 'peixe', meaning: 'cá' },
    { grapheme: 's cuối từ', ipa: '/ʃ/', spokenUnit: 'dois', example: 'dois', meaning: 'hai; s cuối từ' },
  ],
  36: [
    { grapheme: 'x', ipa: '/s/', spokenUnit: 'ximo', example: 'próximo', meaning: 'gần tiếp theo' },
    { grapheme: 'x', ipa: '/gz/ trong ví dụ này', spokenUnit: 'xá', example: 'hexágono', meaning: 'hình lục giác' },
  ],
  37: [
    { grapheme: 'qu + u được đọc', ipa: '/kw/', spokenUnit: 'quã', example: 'cinquenta', meaning: 'năm mươi' },
    { grapheme: 'gu + u được đọc', ipa: '/gw/', spokenUnit: 'guen', example: 'aguentar', meaning: 'chịu đựng' },
    { grapheme: 'gu + u được đọc', ipa: '/gw/', spokenUnit: 'gui', example: 'linguiça', meaning: 'xúc xích kiểu Portugal' },
    { grapheme: 'gu + u được đọc', ipa: '/gw/', spokenUnit: 'guim', example: 'pinguim', meaning: 'chim cánh cụt' },
  ],
  38: [
    { grapheme: 'y (từ mượn)', ipa: 'tùy từ mượn', spokenUnit: 'yo', example: 'yoga', meaning: 'yoga' },
  ],
  39: [
    { grapheme: 'r cuối âm tiết', ipa: 'âm r coda; biến thể theo vùng', spokenUnit: 'mar', example: 'mar', meaning: 'biển' },
    { grapheme: 'l cuối âm tiết', ipa: '/ɫ/', spokenUnit: 'sol', example: 'sol', meaning: 'mặt trời' },
    { grapheme: 'l trước phụ âm', ipa: '/ɫ/', spokenUnit: 'al-to', example: 'alto', meaning: 'cao' },
    { grapheme: 'l cuối từ', ipa: '/ɫ/', spokenUnit: 'pel', example: 'papel', meaning: 'giấy' },
  ],
  40: [
    { grapheme: 'dr', ipa: '/dɾ/', spokenUnit: 'dro', example: 'quadro', meaning: 'bức tranh; khung' },
    { grapheme: 'cr', ipa: '/kɾ/', spokenUnit: 'cra', example: 'cravo', meaning: 'đinh; hoa cẩm chướng tùy ngữ cảnh' },
    { grapheme: 'gr', ipa: '/gɾ/', spokenUnit: 'gri', example: 'grilo', meaning: 'con dế' },
    { grapheme: 'fr', ipa: '/fɾ/', spokenUnit: 'fru', example: 'fruta', meaning: 'trái cây' },
    { grapheme: 'vr', ipa: '/vɾ/', spokenUnit: 'vro', example: 'livro', meaning: 'sách' },
    { grapheme: 'bl', ipa: '/bl/', spokenUnit: 'bla', example: 'bloco', meaning: 'khối; tòa nhà' },
    { grapheme: 'cl', ipa: '/kl/', spokenUnit: 'cla', example: 'claro', meaning: 'sáng; rõ' },
    { grapheme: 'gl', ipa: '/gl/', spokenUnit: 'glo', example: 'globo', meaning: 'quả địa cầu' },
  ],
  41: [
    { grapheme: 'p', ipa: '/p/', spokenUnit: 'pa', example: 'pato', meaning: 'vịt' },
    { grapheme: 'b', ipa: '/b/', spokenUnit: 'ba', example: 'bala', meaning: 'kẹo' },
    { grapheme: 't', ipa: '/t/', spokenUnit: 'tin', example: 'tinta', meaning: 'mực; sơn' },
    { grapheme: 'd', ipa: '/d/', spokenUnit: 'da', example: 'dado', meaning: 'xúc xắc' },
    { grapheme: 'f', ipa: '/f/', spokenUnit: 'fa', example: 'faca', meaning: 'dao' },
    { grapheme: 'v', ipa: '/v/', spokenUnit: 'va', example: 'vaca', meaning: 'bò cái' },
    { grapheme: 'm', ipa: '/m/', spokenUnit: 'ma', example: 'mapa', meaning: 'bản đồ' },
    { grapheme: 'n', ipa: '/n/', spokenUnit: 'nu', example: 'nuvem', meaning: 'đám mây' },
    { grapheme: 'l', ipa: '/l/', spokenUnit: 'la', example: 'lata', meaning: 'cái lon' },
    { grapheme: 's', ipa: '/s/', spokenUnit: 'si', example: 'sino', meaning: 'cái chuông' },
    { grapheme: 'r', ipa: '/ʁ/ hoặc /ɾ/ theo vị trí', spokenUnit: 'ra', example: 'rato', meaning: 'chuột' },
    { grapheme: 'j', ipa: '/ʒ/', spokenUnit: 'ja', example: 'janela', meaning: 'cửa sổ' },
  ],
  42: [
    { grapheme: 'g + a/o/u', ipa: '/g/', spokenUnit: 'ga', example: 'gato', meaning: 'mèo' },
    { grapheme: 'gu + e/i', ipa: '/g/', spokenUnit: 'gue', example: 'guerra', meaning: 'chiến tranh' },
    { grapheme: 'ç + a/o/u', ipa: '/s/', spokenUnit: 'ça', example: 'taça', meaning: 'cốc có chân' },
    { grapheme: 'j', ipa: '/ʒ/', spokenUnit: 'ja', example: 'janela', meaning: 'cửa sổ' },
    { grapheme: 'z', ipa: '/z/', spokenUnit: 'ze', example: 'zero', meaning: 'số không' },
  ],
  43: [
    { grapheme: 'au', ipa: '/aw/', spokenUnit: 'pau', example: 'pau', meaning: 'khúc gỗ' },
    { grapheme: 'eu', ipa: '/ew/', spokenUnit: 'meu', example: 'meu', meaning: 'của tôi' },
    { grapheme: 'oi', ipa: '/oj/', spokenUnit: 'boi', example: 'boi', meaning: 'bò đực' },
    { grapheme: 'éu', ipa: '/ɛw/', spokenUnit: 'céu', example: 'céu', meaning: 'bầu trời' },
    { grapheme: 'ui', ipa: '/uj/', spokenUnit: 'fui', example: 'fui', meaning: 'đã đi / đã là' },
    { grapheme: 'õe', ipa: '/õj̃/', spokenUnit: 'põe', example: 'põe', meaning: 'đặt; để' },
    { grapheme: 'em', ipa: '/ɐ̃j̃/', spokenUnit: 'bem', example: 'bem', meaning: 'tốt' },
    { grapheme: 'om', ipa: '/õ/', spokenUnit: 'som', example: 'som', meaning: 'âm thanh' },
    { grapheme: 'im', ipa: '/ĩ/', spokenUnit: 'tim', example: 'tinta', meaning: 'mực; sơn' },
  ],
  44: [
    { grapheme: 'pai / país', ipa: 'một âm tiết / hai âm tiết', spokenUnit: 'pai, pa-ís', example: 'país', meaning: 'đất nước; đối chiếu với pai' },
    { grapheme: 'rr chia khi viết âm tiết', ipa: '/ʁ/', spokenUnit: 'car-ro', example: 'carro', meaning: 'ô tô' },
    { grapheme: 'ss chia khi viết âm tiết', ipa: '/s/', spokenUnit: 'mas-sa', example: 'massa', meaning: 'bột nhào' },
    { grapheme: 'ch giữ trong một âm tiết', ipa: '/ʃ/', spokenUnit: 'cha-ve', example: 'chave', meaning: 'chìa khóa' },
  ],
  45: [
    { grapheme: 'í / ú', ipa: 'dấu sắc đánh dấu trọng âm', spokenUnit: 'lápis, música', example: 'música', meaning: 'âm nhạc' },
    { grapheme: 'â / ô', ipa: 'dấu mũ; nguyên âm khép trong ví dụ', spokenUnit: 'câmara, avô', example: 'câmara / avô', meaning: 'phòng / ông' },
    { grapheme: 'ã / õ', ipa: 'dấu ngã biểu thị âm mũi', spokenUnit: 'irmã, põe', example: 'irmã / põe', meaning: 'chị/em gái / đặt' },
    { grapheme: 'à', ipa: 'dấu huyền trong chính tả, không phải thanh huyền', spokenUnit: 'à', example: 'à', meaning: 'dấu xuất hiện trong một số dạng viết' },
    { grapheme: '-ico / -ica', ipa: 'trọng âm theo từ', spokenUnit: 'mé-di-co', example: 'médico', meaning: 'bác sĩ' },
    { grapheme: 'falamos / falámos', ipa: 'khác nghĩa/đọc do dấu trọng âm', spokenUnit: 'falámos', example: 'falámos', meaning: 'chúng tôi đã nói' },
  ],
  46: [
    { grapheme: 's trước phụ âm hữu thanh', ipa: '/ʒ/', spokenUnit: 'livros', example: 'os livros', meaning: 'những quyển sách' },
    { grapheme: 'e cuối + nguyên âm', ipa: 'e yếu có thể nối/rút gọn', spokenUnit: 'o amigo', example: 'o amigo', meaning: 'người bạn' },
    { grapheme: 'de + água', ipa: 'nối nguyên âm giữa hai từ', spokenUnit: 'de água', example: 'de água', meaning: 'của nước / bằng nước tùy câu' },
    { grapheme: 'a + escola', ipa: 'nối nguyên âm giữa hai từ', spokenUnit: 'a escola', example: 'a escola', meaning: 'ngôi trường' },
  ],
  47: [
    { grapheme: 'nguyên âm miệng', ipa: 'a e i o u', spokenUnit: 'a e i o u', example: 'a e i o u', meaning: 'năm chữ nguyên âm' },
    { grapheme: 'nguyên âm mũi', ipa: 'âm mũi theo từng vần', spokenUnit: 'pão, mãe, bem', example: 'pão / mãe / bem', meaning: 'bánh mì / mẹ / tốt' },
    { grapheme: 'r mạnh / r nhẹ', ipa: '/ʁ/ /ɾ/', spokenUnit: 'rato, caro, carro', example: 'rato / caro / carro', meaning: 'chuột / đắt / ô tô' },
    { grapheme: 'c / qu', ipa: '/k/ hoặc /s/ theo chữ sau', spokenUnit: 'casa, cidade, queijo', example: 'casa / cidade / queijo', meaning: 'nhà / thành phố / phô mai' },
  ],
  48: [
    { grapheme: 'c + e / ss', ipa: '/s/', spokenUnit: 'ce, ssa', example: 'casa / massa', meaning: 'nhà / bột nhào' },
    { grapheme: 'g mềm / g cứng', ipa: '/ʒ/ /g/', spokenUnit: 'ge, ga', example: 'gelo / gato', meaning: 'nước đá / mèo' },
    { grapheme: 'qu', ipa: '/k/; u thường câm trong que', spokenUnit: 'que', example: 'queijo', meaning: 'phô mai' },
    { grapheme: 'ão', ipa: 'vần mũi', spokenUnit: 'pão', example: 'pão', meaning: 'bánh mì' },
    { grapheme: 'rr', ipa: '/ʁ/', spokenUnit: 'carro', example: 'autocarro', meaning: 'xe buýt; có rr' },
    { grapheme: 's cuối từ', ipa: '/ʃ/ hoặc nối /z/ tùy ngữ cảnh', spokenUnit: 'dois amigos', example: 'dois amigos', meaning: 'hai người bạn' },
  ],
};

const consonantSyllableRows: Record<number, SyllablePracticeRow[]> = {
  3: [
    { label: 'm', syllables: ['ma', 'me', 'mi', 'mo', 'mu'] },
    { label: 'p', syllables: ['pa', 'pe', 'pi', 'po', 'pu'] },
    { label: 'b', syllables: ['ba', 'be', 'bi', 'bo', 'bu'] },
  ],
  5: [
    { label: 'm', syllables: ['ma', 'me', 'mi', 'mo', 'mu'] },
    { label: 'p', syllables: ['pa', 'pe', 'pi', 'po', 'pu'] },
  ],
  6: [
    { label: 'b', syllables: ['ba', 'be', 'bi', 'bo', 'bu'] },
    { label: 't', syllables: ['ta', 'te', 'ti', 'to', 'tu'] },
    { label: 'd', syllables: ['da', 'de', 'di', 'do', 'du'] },
  ],
  7: [
    { label: 'n', syllables: ['na', 'ne', 'ni', 'no', 'nu'] },
    { label: 'l', syllables: ['la', 'le', 'li', 'lo', 'lu'] },
  ],
  8: [
    { label: 'f', syllables: ['fa', 'fe', 'fi', 'fo', 'fu'] },
    { label: 'v', syllables: ['va', 've', 'vi', 'vo', 'vu'] },
  ],
  11: [
    { label: 'c', syllables: ['ca', 'ce', 'ci', 'co', 'cu'], note: 'C đọc /k/ trước a, o, u; đọc /s/ trước e, i.' },
    { label: 'qu', syllables: ['qua', 'que', 'qui', 'quo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'QUA là tổ hợp hợp lệ với u được đọc; trong que/qui, u thường câm. QUO/QU+U không thuộc ví dụ bài này.' },
  ],
  12: [
    { label: 'g', syllables: ['ga', 'ge', 'gi', 'go', 'gu'], note: 'G đọc /g/ trước a, o, u; trước e, i thường đọc /ʒ/.' },
    { label: 'gu', syllables: ['gua', 'gue', 'gui', 'guo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'GUA có u được đọc; trong gue/gui, u thường câm để giữ /g/ trước e/i. Các tổ hợp còn lại không phải trọng tâm ví dụ bài này.' },
  ],
  13: [
    { label: 'ch', syllables: ['cha', 'che', 'chi', 'cho', 'chu'], note: 'CH biểu thị một âm /ʃ/; mỗi tổ hợp dưới đây là âm tiết luyện đọc.' },
    { label: 'lh', syllables: ['lha', 'lhe', 'lhi', 'lho', 'lhu'], note: 'LH biểu thị một âm; các tổ hợp là bài tập ghép, không phải đều là từ thông dụng.' },
    { label: 'nh', syllables: ['nha', 'nhe', 'nhi', 'nho', 'nhu'], note: 'NH biểu thị một âm mũi; các tổ hợp là bài tập ghép.' },
  ],
  14: [
    { label: 's đầu từ', syllables: ['sa', 'se', 'si', 'so', 'su'], note: 'S đầu từ thường đọc /s/. SS không đứng đầu từ; giữa nguyên âm, ss biểu thị /s/ như trong massa.' },
    { label: 'z', syllables: ['za', 'ze', 'zi', 'zo', 'zu'], note: 'Bảng ghép để luyện nhận dạng âm đầu /z/; ví dụ từ thật: zero.' },
  ],
  15: [
    { label: 'r đầu từ', syllables: ['ra', 're', 'ri', 'ro', 'ru'], note: 'R đầu từ là R mạnh; âm thanh cụ thể có thể đổi theo vùng.' },
    { label: 'l', syllables: ['la', 'le', 'li', 'lo', 'lu'] },
    { label: 'ç', syllables: ['ça', '—', '—', 'ço', 'çu'], statuses: ['valid', 'invalid', 'invalid', 'valid', 'valid'], note: 'Ç chỉ viết trước a, o, u và đọc /s/; không dùng ç trước e/i.' },
  ],
  32: [
    { label: 'p', syllables: ['pa', 'pe', 'pi', 'po', 'pu'] },
    { label: 'b', syllables: ['ba', 'be', 'bi', 'bo', 'bu'] },
    { label: 't', syllables: ['ta', 'te', 'ti', 'to', 'tu'] },
    { label: 'd', syllables: ['da', 'de', 'di', 'do', 'du'] },
    { label: 'm', syllables: ['ma', 'me', 'mi', 'mo', 'mu'] },
    { label: 'n', syllables: ['na', 'ne', 'ni', 'no', 'nu'] },
    { label: 'f', syllables: ['fa', 'fe', 'fi', 'fo', 'fu'] },
    { label: 'v', syllables: ['va', 've', 'vi', 'vo', 'vu'] },
    { label: 'l', syllables: ['la', 'le', 'li', 'lo', 'lu'] },
    { label: 's', syllables: ['sa', 'se', 'si', 'so', 'su'] },
    { label: 'z', syllables: ['za', 'ze', 'zi', 'zo', 'zu'] },
    { label: 'j', syllables: ['ja', 'je', 'ji', 'jo', 'ju'] },
    { label: 'r mạnh đầu từ', syllables: ['ra', 're', 'ri', 'ro', 'ru'], note: 'R đầu từ là R mạnh; R đơn giữa hai nguyên âm có âm khác.' },
    { label: 'c + a/o/u', syllables: ['ca', '—', '—', 'co', 'cu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Nhánh cứng của C: âm /k/ trước a/o/u.' },
    { label: 'c + e/i', syllables: ['—', 'ce', 'ci', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Nhánh mềm của C: âm /s/ trước e/i.' },
    { label: 'g + a/o/u', syllables: ['ga', '—', '—', 'go', 'gu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Nhánh cứng của G: âm /g/ trước a/o/u.' },
    { label: 'g + e/i', syllables: ['—', 'ge', 'gi', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Nhánh mềm của G: âm /ʒ/ trước e/i.' },
  ],
  33: [
    { label: 'j', syllables: ['ja', 'je', 'ji', 'jo', 'ju'], note: 'J thường biểu thị /ʒ/ trước cả năm nguyên âm.' },
    { label: 'g mềm', syllables: ['—', 'ge', 'gi', '—', '—'], note: 'G trước e/i cũng biểu thị /ʒ/.' },
  ],
  34: [
    { label: 's đầu từ', syllables: ['sa', 'se', 'si', 'so', 'su'], note: 'S đầu từ thường là /s/. Trong các vị trí khác, chữ viết và vị trí quyết định âm.' },
    { label: 'c mềm', syllables: ['—', 'ce', 'ci', '—', '—'], note: 'C trước e/i đọc /s/.' },
    { label: 'ç', syllables: ['ça', '—', '—', 'ço', 'çu'], note: 'Ç trước a/o/u đọc /s/; SS thường ở giữa hai nguyên âm.' },
  ],
  35: [
    { label: 'ch', syllables: ['cha', 'che', 'chi', 'cho', 'chu'], note: 'CH biểu thị /ʃ/; đọc như một âm đầu.' },
  ],
  37: [
    { label: 'qu', syllables: ['qua', 'que', 'qui', 'quo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'U thường câm trong que/qui nhưng được đọc trong qua và một số từ. Hãy nghe từ thật.' },
    { label: 'gu', syllables: ['gua', 'gue', 'gui', 'guo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'U thường câm trong gue/gui để giữ âm /g/, nhưng được đọc trong từ như aguentar.' },
  ],
  39: [
    { label: 'r đầu từ', syllables: ['ra', 're', 'ri', 'ro', 'ru'], note: 'R đầu từ thường là R mạnh.' },
    { label: 'l', syllables: ['la', 'le', 'li', 'lo', 'lu'], note: 'L cuối âm tiết có cách phát âm khác L đầu; hãy nghe từ mẫu.' },
  ],
  40: [
    { label: 'pr', syllables: ['pra', 'pre', 'pri', 'pro', 'pru'] },
    { label: 'br', syllables: ['bra', 'bre', 'bri', 'bro', 'bru'] },
    { label: 'tr', syllables: ['tra', 'tre', 'tri', 'tro', 'tru'] },
    { label: 'fl', syllables: ['fla', 'fle', 'fli', 'flo', 'flu'] },
    { label: 'dr', syllables: ['dra', 'dre', 'dri', 'dro', 'dru'] },
    { label: 'cr', syllables: ['cra', 'cre', 'cri', 'cro', 'cru'] },
    { label: 'gr', syllables: ['gra', 'gre', 'gri', 'gro', 'gru'] },
    { label: 'fr', syllables: ['fra', 'fre', 'fri', 'fro', 'fru'] },
    { label: 'vr', syllables: ['vra', 'vre', 'vri', 'vro', 'vru'], note: 'VR xuất hiện giữa từ như livro; đây là cụm phụ âm để nhận diện, không phải mọi ô đều là từ.' },
    { label: 'pl', syllables: ['pla', 'ple', 'pli', 'plo', 'plu'] },
    { label: 'bl', syllables: ['bla', 'ble', 'bli', 'blo', 'blu'] },
    { label: 'cl', syllables: ['cla', 'cle', 'cli', 'clo', 'clu'] },
    { label: 'gl', syllables: ['gla', 'gle', 'gli', 'glo', 'glu'] },
  ],
  42: [
    { label: 'c + a/o/u', syllables: ['ca', '—', '—', 'co', 'cu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Nhánh cứng của C: âm /k/ trước a, o, u.' },
    { label: 'c + e/i', syllables: ['—', 'ce', 'ci', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Nhánh mềm của C: âm /s/ trước e, i.' },
    { label: 'g + a/o/u', syllables: ['ga', '—', '—', 'go', 'gu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Nhánh cứng của G: âm /g/ trước a, o, u.' },
    { label: 'g + e/i', syllables: ['—', 'ge', 'gi', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Nhánh mềm của G: âm /ʒ/ trước e, i.' },
    { label: 'qu', syllables: ['qua', 'que', 'qui', 'quo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Trong que/qui, u thường câm; trong qua, u được đọc.' },
    { label: 'gu', syllables: ['gua', 'gue', 'gui', 'guo', '—'], statuses: ['valid', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Trong gue/gui, u thường câm để giữ âm /g/; một số từ đọc u.' },
    { label: 'ç', syllables: ['ça', '—', '—', 'ço', 'çu'], statuses: ['valid', 'invalid', 'invalid', 'valid', 'valid'], note: 'Ç chỉ viết trước a, o, u và phát âm /s/; không viết ç trước e/i.' },
    { label: 'j', syllables: ['ja', 'je', 'ji', 'jo', 'ju'], note: 'J thường biểu thị /ʒ/ trước năm nguyên âm.' },
    { label: 'z', syllables: ['za', 'ze', 'zi', 'zo', 'zu'], note: 'Z đầu từ thường biểu thị /z/.' },
  ],
  41: [
    { label: 'p', syllables: ['pa', 'pe', 'pi', 'po', 'pu'] },
    { label: 'b', syllables: ['ba', 'be', 'bi', 'bo', 'bu'] },
    { label: 't', syllables: ['ta', 'te', 'ti', 'to', 'tu'] },
    { label: 'd', syllables: ['da', 'de', 'di', 'do', 'du'] },
    { label: 'f', syllables: ['fa', 'fe', 'fi', 'fo', 'fu'] },
    { label: 'v', syllables: ['va', 've', 'vi', 'vo', 'vu'] },
    { label: 'm', syllables: ['ma', 'me', 'mi', 'mo', 'mu'] },
    { label: 'n', syllables: ['na', 'ne', 'ni', 'no', 'nu'] },
    { label: 'l', syllables: ['la', 'le', 'li', 'lo', 'lu'] },
    { label: 's', syllables: ['sa', 'se', 'si', 'so', 'su'] },
    { label: 'r', syllables: ['ra', 're', 'ri', 'ro', 'ru'], note: 'Bảng luyện ghép; âm R thay đổi theo vị trí trong từ.' },
    { label: 'j', syllables: ['ja', 'je', 'ji', 'jo', 'ju'] },
    { label: 'c + a/o/u', syllables: ['ca', '—', '—', 'co', 'cu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Cứng /k/ trước a, o, u.' },
    { label: 'c + e/i', syllables: ['—', 'ce', 'ci', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Mềm /s/ trước e, i.' },
    { label: 'g + a/o/u', syllables: ['ga', '—', '—', 'go', 'gu'], statuses: ['valid', 'notTaught', 'notTaught', 'valid', 'valid'], note: 'Cứng /g/ trước a, o, u.' },
    { label: 'g + e/i', syllables: ['—', 'ge', 'gi', '—', '—'], statuses: ['notTaught', 'valid', 'valid', 'notTaught', 'notTaught'], note: 'Mềm /ʒ/ trước e, i.' },
  ],
};



export function getSoundGroups(lesson: Lesson): SoundGroup[] {
  if (lesson.id === 1) return alphabetGroups();

  const targetMap = new Map<string, LessonPronunciationTarget>();
  for (const target of [
    ...(lessonPronunciationTargets[lesson.id] ?? []),
    ...(baseSupplementalPronunciationTargets[lesson.id] ?? []),
    ...(supplementalPronunciationTargets[lesson.id] ?? []),
  ]) {
    const key = [target.label ?? target.grapheme, target.grapheme, target.ipa, target.example].join('|');
    targetMap.set(key, target);
  }
  const lessonTargets = [...targetMap.values()];
  const pronunciationSamples = lessonTargets.map((target, index) => {
    const label = target.label ?? target.grapheme ?? '';
    const letterName = getLetterName(target, lesson.id);
    return {
      id: `lesson-${lesson.id}-sound-${index}`,
      label,
      grapheme: target.grapheme,
      diacritic: target.diacritic,
      audioText: target.diacritic?.[0]?.example ?? target.example ?? '',
      syllableAudioText: target.diacritic?.[0]?.spokenUnit ?? target.spokenUnit,
      syllableAudioIpa: strictIpa(target.diacritic?.[0]?.ipa ?? target.ipa),
      letterNameText: letterName?.text,
      letterNameIpa: letterName?.ipa,
      phoneme: target.diacritic ? undefined : target.ipa,
      cue: target.cue ?? (target.diacritic
        ? `Chữ nguyên âm “${label}” có các cách viết/cách đọc mẫu bên dưới. Chọn từng dạng để so sánh.`
        : `“${target.grapheme ?? ''}” thường biểu thị ${target.ipa ?? ''} trong bài này. Nghe âm qua “${target.spokenUnit ?? ''}”, rồi nghe từ “${target.example ?? ''}”.`),
      meaning: target.meaning,
    };
  });

  

  return [
    {
      title: 'Chữ và âm (IPA)',
      hint: 'Mỗi thẻ cho biết chữ/cụm chữ, phiên âm IPA, âm mẫu trong ngữ cảnh và một từ ví dụ.',
      samples: pronunciationSamples,
      syllableRows: consonantSyllableRows[lesson.id],
    }
  ];
}

export function getAdultNotes(lesson: Lesson): string[] {
  const adultMarkers = /^(?:người lớn|tai portugal|nhắc pt-pt|góc học âm|cảnh báo|lưu ý|quy ước|chốt|ngoại lệ|cần nhớ|ghi nhớ cho người học|mẹo cho người mới|nghe pt-pt|sơ đồ nghe)/i;
  return lesson.blocks
    .map((block) => block.text)
    .filter((text) => adultMarkers.test(text.trim()));
}

export function getChildContent(lesson: Lesson): LessonBlock[] {
  const adultNotes = new Set(getAdultNotes(lesson));
  return lesson.blocks.filter((block) => !adultNotes.has(block.text));
}