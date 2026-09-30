import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const generatedPath = path.resolve('src/generated/lessons.json');

test('content generation creates lesson data from source markdown', () => {
  assert.equal(fs.existsSync(generatedPath), true, 'expected generated lesson data file to exist');

  const data = JSON.parse(fs.readFileSync(generatedPath, 'utf8'));
  assert.ok(Array.isArray(data.lessons), 'lessons should be an array');
  assert.equal(data.lessons.length, 48, 'exactly 48 lessons should be generated');
  assert.equal(new Set(data.lessons.map((lesson) => lesson.id)).size, 48, 'lesson IDs should be unique');
  assert.equal(data.meta.locale, 'pt-PT', 'locale should be pt-PT');
});

test('lesson parser preserves tables, quotes, lists, and review content', () => {
  const data = JSON.parse(fs.readFileSync(generatedPath, 'utf8'));
  const lesson = (id) => data.lessons.find((item) => item.id === id);

  assert.ok(lesson(3).blocks.some((block) => block.type === 'table' && block.rows.length === 4), 'lesson 3 consonant-vowel chart should be retained');
  assert.ok(lesson(6).blocks.some((block) => block.type === 'quote' && block.text.includes('batata')), 'lesson 6 word-building examples should be retained');
  assert.ok(lesson(10).blocks.some((block) => block.type === 'list' && block.items.some((item) => item.includes('batata'))), 'lesson 10 review list should be retained');
  assert.ok(lesson(11).blocks.some((block) => block.type === 'table'), 'lesson 11 vocabulary table should be retained');
  assert.ok(lesson(11).blocks.some((block) => block.type === 'quote' && block.text.includes('que/qui')), 'lesson 11 spelling rules should be retained');
  assert.ok(lesson(20).blocks.some((block) => block.text.includes('saúde')), 'lesson 20 hiato examples should be retained');
  const lesson48Text = lesson(48).blocks.flatMap((block) => [block.text, ...(block.items ?? [])]).join('\n');
  assert.ok(lesson48Text.includes('autocarro'), 'lesson 48 capstone practice should be retained');
  assert.ok(!/Bài đọc [A-H]/.test(lesson48Text), 'reading passages must not leak into lesson 48');
});
