import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const source = path.join(root, '..', 'Tap-danh-van-tieng-Bo-Dao-Nha-chau-Au.md');
const outDir = path.join(root, 'src', 'generated');
fs.mkdirSync(outDir, { recursive: true });

const md = fs.readFileSync(source, 'utf8');
const lessons = [];
const seenLessonIds = new Set();
let current = null;

function normalizeText(text = '') {
  return text.replace(/\s+/g, ' ').trim();
}

function isAudienceNote(text) {
  return /^\*\*(?:Bé nhìn|Bé làm|Bé ghép|Người lớn nói|Người lớn nhắc|Chốt|Góc học âm|Từ chạm tay|Sơ đồ thực hành|Nghe và gõ bàn|Sơ đồ|Lưu ý|Cách hiểu đơn giản|Mục tiêu|Bé luyện|Tự kiểm|Qua cửa|Cảnh báo|Nhắc pt-PT|Tai Portugal|Nghe pt-PT|Lưu ý cho người lớn):\*\*/i.test(text.trim());
}

function inlineText(token) {
  if (typeof token === 'string') return token;
  if (!token) return '';
  if (token.type === 'text' || token.type === 'codespan' || token.type === 'escape' || token.type === 'html') return token.text ?? token.raw ?? '';
  if (token.type === 'image') return token.text ?? '';
  if (token.tokens) return token.tokens.map(inlineText).join('');
  return token.text ?? '';
}

function getInlineMarkdown(token) {
  return token.text ?? token.raw ?? '';
}

function buildSummary(title, id) {
  if (id === 2) {
    return 'Nhận ra 5 chữ nguyên âm a, e, i, o, u. Nghe kỹ hai cặp e mở/khép (pé/vê) và o mở/khép (avó/avô).';
  }
  if (id === 9) {
    return 'Nghe nguyên âm a, e, o ở cuối từ khi không được nhấn. So sánh pato, mapa và chave; âm cuối yếu đi nhưng cách viết vẫn giữ nguyên.';
  }
  if (id === 10) {
    return 'Ôn chín từ đã học: đọc từ hai và ba âm tiết, tìm âm tiết được nhấn, nghe nguyên âm cuối yếu và luyện câu. Dùng thêm chave để ôn chữ e cuối.';
  }
  if (id === 3) return 'Ghép m, p và b với năm nguyên âm; đọc từng âm tiết rồi nối thành các từ mapa và pato.';
  if (id === 6) return 'Ghép b, t và d với năm nguyên âm để tạo âm tiết, rồi đọc các từ bola, dado và batata.';
  if (id === 11) return 'Nhìn nguyên âm sau chữ c để chọn âm /k/ hay /s/; dùng qu để giữ âm /k/ trước e và i.';
  if (id === 48) return 'Tự luyện đọc bằng cách nhận chữ, chia âm tiết, tìm trọng âm, đọc câu rồi đối chiếu đáp án.';
  const plain = title.replace(/^[^\-]+\s*[-–]\s*/, '').trim();
  return `Học ${plain.toLowerCase()}. Bạn sẽ nhìn chữ, nghe mẫu, ghép âm và đọc từ ngắn một cách dễ hiểu.`;
}

function buildSteps(title, id) {
  if (id === 2) {
    return [
      'Nhìn và đọc theo: a, e, i, o, u.',
      'Nghe a, i, u trong pá, vi, tu.',
      'So sánh e mở trong pé với e khép trong vê.',
      'So sánh o mở trong avó với o khép trong avô; chọn đúng nghĩa bà/ông.'
    ];
  }
  if (id === 9) {
    return [
      'Nghe cả từ pato, mapa và chave.',
      'Vỗ tay ở âm tiết mạnh: PA-to, MA-pa, CHA-ve.',
      'Nghe âm cuối: o gần /u/, a gần /ɐ/, e rất nhẹ gần /ɨ/.',
      'Điền đúng chữ cuối và nhớ: âm yếu đi nhưng chính tả không đổi.'
    ];
  }
  if (id === 10) {
    return [
      'Đọc bảy từ hai âm tiết: mapa, pato, bola, dado, bolo, vaca, lata.',
      'Đọc batata và menina; vỗ theo âm tiết và nhấn mạnh phần viết hoa.',
      'Nghe o/a/e cuối từ trong pato, mapa, chave; viết đúng chữ dù âm nghe yếu.',
      'Đọc hai câu ngắn rồi tự kiểm tra chín từ đã học.'
    ];
  }
  if (id === 3) return ['Nhìn 5 nguyên âm a, e, i, o, u.', 'Ghép lần lượt m, p, b với từng nguyên âm.', 'Đọc liền các âm tiết ma, pa, bo.', 'Nối âm tiết để đọc mapa và pato.'];
  if (id === 6) return ['Đọc các hàng ba, be, bi, bo, bu; ta, te, ti, to, tu; da, de, di, do, du.', 'Nghe và phân biệt âm đầu b, t, d.', 'Ghép các âm tiết thành bola, dado, batata.', 'Đọc từ và câu mẫu; để ý phát âm pt-PT của ti/di.'];
  if (id === 11) return ['Đọc ca/co/cu và ce/ci.', 'So sánh âm /k/ với /s/ của chữ c.', 'Đọc que/qui; lưu ý u thường không phát âm trong các ví dụ này.', 'Nghe các từ thật e kiểm tra ngoại lệ của qu.'];
  if (id === 48) return ['Đọc mẫu từ đầu đến cuối mà chưa nhìn phần đối chiếu.', 'Gạch chân chữ hoặc cụm chữ đang luyện.', 'Chia âm tiết và đánh dấu âm tiết được nhấn.', 'So sánh với đáp án và ghi lại từ cần ôn.'];
  const short = title.replace(/^[^\-]+\s*[-–]\s*/, '').trim();
  return [
    `Nhìn rõ chữ và chủ đề của bài: ${short}.`,
    'Nghe mẫu chậm, không vội đoán theo thói quen của tiếng Việt.',
    'Ghép âm thành từ ngắn và đọc lại vài lần.',
    'Luyện câu ngắn để nhớ cách đọc và ngữ nghĩa.'
  ];
}

function finishLesson() {
  if (!current) return;
  lessons.push(current);
  seenLessonIds.add(current.id);
  current = null;
}

function appendBlocks(tokens) {
  if (!current) return;
  for (const token of tokens) {
    if (token.type === 'heading') {
      current.blocks.push({ type: 'heading', text: normalizeText(getInlineMarkdown(token)) });
    } else if (token.type === 'paragraph') {
      const text = getInlineMarkdown(token);
      current.blocks.push({ type: isAudienceNote(text) ? 'note' : 'paragraph', text: normalizeText(text) });
    } else if (token.type === 'blockquote') {
      const text = (token.tokens ?? []).map((child) => {
        if (child.type === 'paragraph') return getInlineMarkdown(child);
        if (child.type === 'list') return child.items.map((item) => item.text).join('\n');
        return child.text ?? '';
      }).filter(Boolean).join('\n\n');
      current.blocks.push({ type: 'quote', text: normalizeText(text) });
    } else if (token.type === 'list') {
      current.blocks.push({
        type: 'list',
        text: '',
        ordered: Boolean(token.ordered),
        items: token.items.map((item) => normalizeText(item.text)),
      });
    } else if (token.type === 'table') {
      const header = token.header.map((cell) => normalizeText(cell.text));
      const body = token.rows.map((row) => row.map((cell) => normalizeText(cell.text)));
      current.blocks.push({ type: 'table', text: '', rows: [header, ...body] });
      if (header.length >= 3) {
        for (const row of body) {
          if (row.length >= 3) current.vocabulary.push({ label: row[0], value: row[1], meaning: row[2] });
        }
      }
    } else if (token.type === 'hr' || token.type === 'space' || token.type === 'html') {
      continue;
    }
  }
}

for (const token of marked.lexer(md)) {
  if (token.type === 'heading' && token.depth === 2) {
    const text = normalizeText(getInlineMarkdown(token));
    const match = /^Bài\s+(\d+)\s+—\s+(.*)$/.exec(text);
    if (match) {
      finishLesson();
      const id = Number(match[1]);
      if (seenLessonIds.has(id)) continue;
      current = {
        id,
        title: match[2],
        summary: buildSummary(match[2], id),
        steps: buildSteps(match[2], id),
        blocks: [],
        vocabulary: [],
      };
      continue;
    }
    if (current) finishLesson();
    continue;
  }
  if (token.type === 'heading' && token.depth === 1) {
    if (current) finishLesson();
    continue;
  }
  if (current) appendBlocks([token]);
}
finishLesson();

const lessonIds = lessons.map((lesson) => lesson.id);
const duplicateIds = lessonIds.filter((id, index) => lessonIds.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  throw new Error(`Duplicate lesson IDs in source markdown: ${[...new Set(duplicateIds)].join(', ')}`);
}
if (lessons.length !== 48) {
  throw new Error(`Expected 48 lessons in source markdown, found ${lessons.length}.`);
}

const combined = {
  title: 'Bé ghép chữ, đọc tiếng Bồ Đào Nha',
  subtitle: 'Português de Portugal (pt-PT)',
  lessonCount: 48,
  readingCount: 8,
  lessons,
  meta: {
    source: 'Tap-danh-van-tieng-Bo-Dao-Nha-chau-Au.md',
    locale: 'pt-PT',
    audioPolicy: 'TTS only with pt-PT voice and explicit validation; never silently fall back to pt-BR.'
  }
};

fs.writeFileSync(path.join(outDir, 'lessons.json'), JSON.stringify(combined, null, 2));
console.log(`Built ${lessons.length} lessons from source markdown.`);
