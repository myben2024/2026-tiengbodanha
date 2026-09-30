import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Volume2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import { speakPortugueseText } from '../audio';
import { lessonData } from '../data';
import { getAdultNotes, getChildContent, getSoundGroups, type SoundSample } from '../lessonPractice';
import type { LessonBlock } from '../types';

function renderInlineMarkdown(source: string) {
  const html = String(marked.parseInline(source));
  return { __html: DOMPurify.sanitize(html) };
}

function strictVariantIpa(value: string) {
  return /^\/[^/]+\/$/u.test(value) && !/[~()]/u.test(value) ? value : undefined;
}

function LessonContentBlock({ block }: { block: LessonBlock }) {
  if (block.type === 'heading') {
    return <h3 className="lesson-content-subheading" dangerouslySetInnerHTML={renderInlineMarkdown(block.text)} />;
  }

  if (block.type === 'list') {
    const ListTag = block.ordered ? 'ol' : 'ul';
    return (
      <div className="lesson-list-block">
        <ListTag>
          {(block.items ?? []).map((item, index) => (
            <li key={`${index}-${item}`} dangerouslySetInnerHTML={renderInlineMarkdown(item)} />
          ))}
        </ListTag>
      </div>
    );
  }

  if (block.type === 'table') {
    const [header = [], ...rows] = block.rows ?? [];
    return (
      <div className="lesson-table-wrap">
        <table className="lesson-table">
          <thead><tr>{header.map((cell, index) => <th key={`${index}-${cell}`} dangerouslySetInnerHTML={renderInlineMarkdown(cell)} />)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`} dangerouslySetInnerHTML={renderInlineMarkdown(cell)} />)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    );
  }

  if (block.type === 'quote') {
    return (
      <blockquote className="lesson-quote">
        {block.text.split(/\n\n+/).filter(Boolean).map((paragraph, index) => (
          <p key={`${index}-${paragraph}`} dangerouslySetInnerHTML={renderInlineMarkdown(paragraph)} />
        ))}
      </blockquote>
    );
  }

  return (
    <p className={block.type === 'note' ? 'lesson-source-note' : 'lesson-source-paragraph'}
      dangerouslySetInnerHTML={renderInlineMarkdown(block.text)} />
  );
}

const stepLabels = [
  { title: 'Nhìn chữ', short: 'Nhận diện mặt chữ' },
  { title: 'Nghe mẫu', short: 'Nghe giọng pt-PT' },
  { title: 'Ghép âm', short: 'Ghép thành âm tiết' },
  { title: 'Đọc từ', short: 'Đọc từ và câu ngắn' },
];

export default function LessonPage() {
  const { lessonId } = useParams();
  const id = Number(lessonId ?? 1);
  const lesson = lessonData.lessons.find((item) => item.id === id) ?? lessonData.lessons[0];
  const soundGroups = useMemo(() => getSoundGroups(lesson), [lesson]);
  const samples = useMemo(() => soundGroups.flatMap((group) => group.samples), [soundGroups]);
  const childContent = useMemo(() => getChildContent(lesson), [lesson]);
  const adultNotes = useMemo(() => getAdultNotes(lesson), [lesson]);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(null);
  const [selectedSyllable, setSelectedSyllable] = useState<string | null>(null);
  const [audioMessage, setAudioMessage] = useState('Chọn một thẻ để nghe mẫu. Chỉ phát khi thiết bị có giọng pt-PT.');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizMessage, setQuizMessage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedSampleId(null);
    setSelectedSyllable(null);
    setAudioMessage('Chọn một thẻ để nghe mẫu. Chỉ phát khi thiết bị có giọng pt-PT.');
    setIsPlaying(false);
    setSelectedAnswer(null);
    setQuizMessage(null);
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0 });
    root.style.scrollBehavior = previousScrollBehavior;
  }, [lesson.id]);

  const selectedSample = samples.find((sample) => sample.id === selectedSampleId) ?? samples[0];
  const quizTarget = samples.length > 0 ? samples[lesson.id % samples.length] : undefined;
  const quizOptions = useMemo(() => {
    if (samples.length < 2 || !quizTarget) return samples;
    const targetIndex = samples.findIndex((sample) => sample.id === quizTarget.id);
    const options = [quizTarget];
    for (let offset = 1; options.length < Math.min(4, samples.length); offset += 1) {
      const next = samples[(targetIndex + offset) % samples.length];
      if (!options.some((option) => option.id === next.id)) options.push(next);
    }
    return options;
  }, [quizTarget, samples]);

  const handleAudio = async (
    sample: SoundSample,
    text = sample.audioText,
    description = 'từ mẫu',
    ipa?: string,
  ) => {
    setSelectedSampleId(sample.id);
    setIsPlaying(true);
    setAudioMessage('Đang tìm giọng pt-PT đã xác nhận trên thiết bị…');
    const status = await speakPortugueseText(text, ipa);
    setAudioMessage(`${description}: ${status.message}`);
    setIsPlaying(false);
  };

  const handleSyllableAudio = async (syllable: string) => {
    setSelectedSyllable(syllable);
    setIsPlaying(true);
    setAudioMessage(`Đang tìm giọng pt-PT để đọc âm tiết “${syllable}”…`);
    const status = await speakPortugueseText(syllable);
    setAudioMessage(`Âm tiết ${syllable}: ${status.message}`);
    setIsPlaying(false);
  };

  const selectSample = (sample: SoundSample) => {
    setSelectedSampleId(sample.id);
    setAudioMessage(sample.syllableAudioText
      ? `Đã chọn ${sample.label}${sample.phoneme ? ` (${sample.phoneme})` : ''}. Nghe mẫu âm trong ngữ cảnh hoặc nghe từ ví dụ bên dưới.`
      : `Đã chọn ${sample.label}. Bấm “Nghe từ ví dụ” để phát mẫu.`);
  };

  const handleAnswer = (sample: SoundSample) => {
    setSelectedAnswer(sample.id);
    const correct = sample.id === quizTarget?.id;
    setQuizMessage(correct
      ? 'Chính xác! Bạn đã nhận ra mẫu vừa nghe.'
      : `Chưa đúng. Hãy nghe lại mẫu rồi thử tiếp: ${quizTarget?.label ?? ''}.`);
  };

  const handleQuizAudio = async () => {
    if (!quizTarget) return;
    setIsPlaying(true);
    setAudioMessage('Đang phát câu hỏi nghe…');
    const status = await speakPortugueseText(quizTarget.audioText);
    setAudioMessage(status.message);
    setIsPlaying(false);
  };

  return (
    <main className="app-shell lesson-page">
      <nav className="lesson-nav" aria-label="Điều hướng bài học">
        <Link to="/" className="back-link">← Lộ trình</Link>
        <span className="tag">Bài {lesson.id} / {lessonData.lessonCount}</span>
      </nav>

      <header className="lesson-heading">
        <div className="lesson-heading-copy">
          <span className="lesson-eyebrow">TIẾNG BỒ ĐÀO NHA CHÂU ÂU · PT-PT</span>
          <h1>{lesson.title}</h1>
          <p>{lesson.summary}</p>
        </div>
        <div className="lesson-progress" aria-label={`Bài ${lesson.id} trong ${lessonData.lessonCount}`}>
          <span>Hành trình học</span>
          <strong>{lesson.id} <small>/ {lessonData.lessonCount}</small></strong>
          <div className="progress-track"><span style={{ width: `${(lesson.id / lessonData.lessonCount) * 100}%` }} /></div>
        </div>
      </header>

      <section className="sound-lab" aria-labelledby="sound-lab-title">
        <div className="sound-lab-header">
          <div>
            <span className="section-kicker child-kicker">THỰC HÀNH CÙNG BÉ</span>
            <h2 id="sound-lab-title">Chạm để nghe mẫu</h2>
            <p>{soundGroups[0]?.hint}</p>
          </div>
          <span className="voice-badge"><span aria-hidden="true">●</span> Ưu tiên giọng pt-PT</span>
        </div>

        <div className="sound-groups">
          {soundGroups.map((group) => (
            <section className="sound-group" key={group.title} aria-label={group.title}>
              {soundGroups.length > 1 && <h3>{group.title}</h3>}
              <div className={`sound-grid ${group.title === 'Các chữ cái còn lại' ? 'alphabet-grid' : ''}`}>
                {group.samples.map((sample) => (
                  <button
                    className={`sound-chip ${selectedSample?.id === sample.id ? 'is-selected' : ''}`}
                    type="button"
                    key={sample.id}
                    aria-pressed={selectedSample?.id === sample.id}
                    onClick={() => {
                      selectSample(sample);
                      void handleAudio(
                        sample,
                        sample.letterNameText ?? sample.syllableAudioText ?? sample.audioText,
                        sample.letterNameText
                          ? `tên chữ ${sample.label}`
                          : sample.phoneme
                            ? `âm ${sample.phoneme} trong ngữ cảnh`
                            : sample.syllableAudioText ? 'âm tiết' : 'từ mẫu',
                        sample.letterNameText ? sample.letterNameIpa : sample.syllableAudioIpa,
                      );
                    }}
                    title={sample.letterNameText
                      ? `Nghe tên chữ ${sample.label}: ${sample.letterNameText}`
                      : sample.cue}
                  >
                    <span>{sample.label}</span>
                    {sample.grapheme && sample.grapheme !== sample.label && (
                      <small className="sound-chip-grapheme">{sample.grapheme}</small>
                    )}
                    <Volume2 size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
              {group.syllableRows && group.syllableRows.length > 0 && (
                <div className="syllable-practice">
                  <h4>Ghép phụ âm với đủ 5 nguyên âm</h4>
                  <p className="syllable-practice-intro">Bấm từng ô để nghe. Đây là âm tiết luyện ghép; không phải ô nào cũng là một từ riêng.</p>
                  <div className="syllable-table-wrap">
                    <div className="syllable-table" role="table" aria-label="Bảng ghép phụ âm với nguyên âm">
                      <div className="syllable-table-row syllable-table-header" role="row">
                        <span role="columnheader">Phụ âm</span>
                        {['a', 'e', 'i', 'o', 'u'].map((vowel) => <span role="columnheader" key={vowel}>{vowel}</span>)}
                      </div>
                      {group.syllableRows.map((row) => (
                        <div className="syllable-table-row" role="row" key={`${group.title}-${row.label}`}>
                          <strong role="rowheader">{row.label}</strong>
                          {row.syllables.map((syllable, index) => (
                            (() => {
                              const status = row.statuses?.[index] ?? (syllable === '—' ? 'notTaught' : 'valid');
                              if (status !== 'valid' || syllable === '—') {
                                const label = status === 'invalid' ? 'Không hợp lệ theo quy tắc' : 'Bài này không đưa ví dụ cho tổ hợp này';
                                return (
                                  <span
                                    className={`syllable-unavailable is-${status}`}
                                    role="cell"
                                    key={`${row.label}-${index}`}
                                    aria-label={label}
                                    title={label}
                                  >
                                    {status === 'invalid' ? '×' : '—'}
                                  </span>
                                );
                              }
                              return (
                              <button
                                className={`syllable-cell ${selectedSyllable === syllable ? 'is-selected' : ''}`}
                                type="button"
                                role="cell"
                                key={`${row.label}-${syllable}`}
                                aria-label={`Nghe âm tiết ${syllable}`}
                                aria-pressed={selectedSyllable === syllable}
                                disabled={isPlaying}
                                onClick={() => void handleSyllableAudio(syllable)}
                              >
                                {syllable}
                              </button>
                              );
                            })()
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="syllable-grid-legend"><strong>Chú giải:</strong> ô có nút là âm tiết luyện đọc; <span className="legend-invalid">×</span> nghĩa là không hợp lệ theo quy tắc; <span className="legend-uncovered">—</span> nghĩa là bài này chưa đưa ví dụ, không phải khẳng định tổ hợp đó sai.</p>
                  {group.syllableRows.map((row) => row.note && (
                    <p className="syllable-row-note" key={`${group.title}-${row.label}-note`}><strong>{row.label}:</strong> {row.note}</p>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {selectedSample && (
          <div className="sample-detail" aria-live="polite">
            <div className="sample-letter" aria-hidden="true">{selectedSample.label}</div>
            <div className="sample-copy">
              <strong>{selectedSample.cue}</strong>
              {selectedSample.phoneme && <span className="phoneme-label">Phiên âm IPA: {selectedSample.phoneme}</span>}
              <span>{selectedSample.diacritic
                ? 'Mỗi dòng bên dưới là một dạng viết và cách đọc mẫu của nguyên âm này.'
                : selectedSample.syllableAudioText
                  ? `Mẫu âm: ${selectedSample.syllableAudioText} · Từ ví dụ: ${selectedSample.audioText}${selectedSample.meaning ? ` · ${selectedSample.meaning}` : ''}`
                  : `Từ ví dụ: ${selectedSample.audioText}${selectedSample.meaning ? ` · ${selectedSample.meaning}` : ''}`}</span>
            </div>
            <div className="sample-actions">
              {selectedSample.diacritic ? (
                <div className="variant-list" aria-label={`Cách đọc của nguyên âm ${selectedSample.label}`}>
                  {selectedSample.diacritic.map((variant) => {
                    const variantIpa = strictVariantIpa(variant.ipa);
                    return (
                      <article className="pronunciation-variant" key={`${selectedSample.id}-${variant.grapheme}`}>
                      <div className="variant-heading">
                        <strong>{selectedSample.label} → {variant.grapheme}</strong>
                        <span className="phoneme-label">{variant.ipa}</span>
                      </div>
                      <p>Nghe “{variant.spokenUnit}” trong ví dụ “{variant.example}” — {variant.meaning}</p>
                      <div className="variant-actions">
                        <button
                          className="listen-button syllable-listen-button"
                          type="button"
                          onClick={() => void handleAudio(
                            selectedSample,
                            variantIpa ? variant.grapheme : variant.spokenUnit,
                            `âm của ${variant.grapheme}`,
                            variantIpa,
                          )}
                          disabled={isPlaying}
                        >
                          <Volume2 size={16} aria-hidden="true" /> {variantIpa
                            ? `Nghe âm ${variant.ipa} của “${variant.grapheme}”`
                            : `Nghe âm qua “${variant.spokenUnit}”`}
                        </button>
                        <button
                          className="listen-button"
                          type="button"
                          onClick={() => void handleAudio(selectedSample, variant.example, 'từ ví dụ')}
                          disabled={isPlaying}
                        >
                          <Volume2 size={16} aria-hidden="true" /> Nghe “{variant.example}”
                        </button>
                      </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <>
              {selectedSample.syllableAudioText && (
                <button
                  className="listen-button syllable-listen-button"
                  type="button"
                  onClick={() => void handleAudio(
                    selectedSample,
                    selectedSample.syllableAudioText,
                    selectedSample.phoneme ? `âm ${selectedSample.phoneme} trong ngữ cảnh` : 'âm tiết',
                    selectedSample.syllableAudioIpa,
                  )}
                  disabled={isPlaying}
                >
                  <Volume2 size={18} aria-hidden="true" /> {selectedSample.phoneme
                    ? `Nghe âm ${selectedSample.phoneme} qua “${selectedSample.syllableAudioText}”`
                    : `Nghe âm tiết “${selectedSample.syllableAudioText}”`}
                </button>
              )}
              <button
                className="listen-button"
                type="button"
                onClick={() => void handleAudio(selectedSample, selectedSample.audioText, 'từ mẫu')}
                disabled={isPlaying}
              >
                <Volume2 size={18} aria-hidden="true" /> Nghe từ ví dụ “{selectedSample.audioText}”
              </button>
                </>
              )}
            </div>
          </div>
        )}
        <p className="audio-status" role="status">{audioMessage}</p>
      </section>

      <section className="learning-path" aria-labelledby="learning-path-title">
        <div className="compact-section-heading">
          <div>
            <span className="section-kicker">LỘ TRÌNH NGẮN</span>
            <h2 id="learning-path-title">Bốn bước học</h2>
          </div>
          <span className="tag">10–15 phút</span>
        </div>
        <div className="step-grid">
          {stepLabels.map((step, index) => (
            <article className="step-card" key={step.title}>
              <span className="step-number">{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.short}</p>
              </div>
              <details className="step-more">
                <summary aria-label={`Xem hướng dẫn bước ${index + 1}`}>?</summary>
                <span>{lesson.steps[index] ?? step.short}</span>
              </details>
            </article>
          ))}
        </div>
      </section>

      <details className="lesson-content-details" open>
        <summary>Hướng dẫn và nội dung đầy đủ của bài</summary>
        <div className="lesson-content-columns">
          <section className="child-content" aria-labelledby="child-content-title">
            <span className="section-kicker child-kicker">CÙNG BÉ LUYỆN</span>
            <h2 id="child-content-title">Thử làm</h2>
            <div className="content-list">
              {childContent.map((block, index) => (
                <article className="content-card child-card" key={`${lesson.id}-child-${index}`}>
                  <LessonContentBlock block={block} />
                </article>
              ))}
              {childContent.length === 0 && <p>Bấm các thẻ âm ở phía trên, nghe mẫu rồi đọc lại.</p>}
            </div>
          </section>

          <section className="adult-content" aria-labelledby="adult-content-title">
            <span className="section-kicker adult-kicker">DÀNH CHO NGƯỜI LỚN</span>
            <h2 id="adult-content-title">Lưu ý khi hướng dẫn</h2>
            <div className="content-list">
              {adultNotes.length > 0 ? adultNotes.map((text, index) => (
                <article className="content-card adult-card" key={`${lesson.id}-adult-${index}`}>{text}</article>
              )) : (
                <article className="content-card adult-card">Ưu tiên cho người học nghe cả âm tiết hoặc từ mẫu. Không ép đọc tên chữ cái thay cho âm trong từ.</article>
              )}
            </div>
          </section>
        </div>
      </details>

      <section className="listening-quiz" aria-labelledby="quiz-title">
        <div className="compact-section-heading">
          <div>
            <span className="section-kicker">ÔN NHANH</span>
            <h2 id="quiz-title">Nghe và chọn thẻ</h2>
          </div>
        </div>
        <p>Bấm nghe trước, sau đó chọn chữ hoặc từ bạn vừa nghe.</p>
        <button className="quiz-play-button" type="button" onClick={() => void handleQuizAudio()} disabled={isPlaying || !quizTarget}>
          <Volume2 size={18} aria-hidden="true" /> Nghe câu hỏi
        </button>
        <div className="quiz-options" role="group" aria-label="Các đáp án">
          {quizOptions.map((sample) => {
            const isCorrect = quizMessage?.startsWith('Chính xác') && sample.id === quizTarget?.id;
            const isWrong = selectedAnswer === sample.id && quizMessage?.startsWith('Chưa đúng');
            return (
              <button
                key={sample.id}
                className={`quiz-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'incorrect' : ''}`}
                type="button"
                aria-pressed={selectedAnswer === sample.id}
                onClick={() => handleAnswer(sample)}
              >
                {sample.diacritic
                  ? `${sample.label} (${sample.diacritic.map((variant) => variant.grapheme).join(' / ')})`
                  : `${sample.label}${sample.grapheme && sample.grapheme !== sample.label ? ` → ${sample.grapheme}` : ''}`}
              </button>
            );
          })}
        </div>
        {quizMessage && <p className={`quiz-feedback ${quizMessage.startsWith('Chính xác') ? 'correct' : 'incorrect'}`} role="status">{quizMessage}</p>}
      </section>

      <footer className="lesson-footer">
        {lesson.id > 1 && <Link className="secondary-btn" to={`/lesson/${lesson.id - 1}`}>← Bài trước</Link>}
        <Link className="primary-btn" to={lesson.id < lessonData.lessonCount ? `/lesson/${lesson.id + 1}` : '/'}>
          {lesson.id < lessonData.lessonCount ? 'Bài tiếp theo →' : 'Hoàn thành · về lộ trình'}
        </Link>
      </footer>
    </main>
  );
}