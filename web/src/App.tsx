import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import lessonsData from './generated/lessons.json';
import type { Lesson, LessonData } from './types';

const lessonData = lessonsData as LessonData;

function App() {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);

  const lessonList = useMemo(() => lessonData.lessons ?? [], []);
  const currentLesson = useMemo<Lesson | undefined>(
    () => lessonData.lessons.find((lesson) => lesson.id === selectedLessonId) ?? lessonData.lessons[0],
    [selectedLessonId],
  );

  const handleStartLesson = () => {
    setSelectedLessonId(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowPath = () => {
    document.getElementById('lesson-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div className="hero-top">
          <span className="pill">pt-PT • 48 bài học</span>
          <span className="pill">{lessonData.meta.locale}</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1>{lessonData.title}</h1>
            <p className="subtitle">{lessonData.subtitle}</p>
            <div className="controls">
              <Link to="/lesson/1" className="primary-btn" onClick={handleStartLesson}>
                Bắt đầu học
              </Link>
              <button className="secondary-btn" type="button" onClick={handleShowPath}>
                Xem lộ trình
              </button>
            </div>
            <div className="card" style={{ marginTop: 16 }}>
              <strong>Cách học đơn giản:</strong> nhìn chữ → nghe mẫu → ghép âm → đọc từ → luyện câu ngắn.
            </div>
          </div>

          <div className="card">
            <h3>Chương trình</h3>
            <ul className="feature-list">
              <li>Gắn chữ với âm</li>
              <li>Ghép âm tiết</li>
              <li>Đọc từ và câu</li>
              <li>Ôn luyện trên 8 bài đọc</li>
            </ul>
          </div>
        </div>
      </header>

      <main className="section" id="lesson-list">
        <div className="section-header">
          <h2>Toàn bộ lộ trình</h2>
          <span className="tag">{lessonList.length} bài</span>
        </div>

        <div className="lesson-grid">
          {lessonList.map((lesson) => (
            <Link
              key={lesson.id}
              to={`/lesson/${lesson.id}`}
              className="lesson-card"
              onClick={() => {
                setSelectedLessonId(lesson.id);
              }}
              style={{
                textAlign: 'left',
                border: lesson.id === selectedLessonId ? '2px solid #d99559' : undefined,
                boxShadow: lesson.id === selectedLessonId ? '0 12px 20px rgba(217, 149, 89, 0.2)' : undefined,
              }}
            >
              <span className="lesson-index">Bài {lesson.id}</span>
              <h3>{lesson.title}</h3>
              <p>{lesson.summary}</p>
            </Link>
          ))}
        </div>
      </main>

      {currentLesson && (
        <section className="section lesson-detail" id="lesson-detail" aria-live="polite">
          <div className="section-header">
            <div>
              <span className="tag">Bài {currentLesson.id}</span>
              <h2 style={{ marginTop: '10px' }}>{currentLesson.title}</h2>
            </div>
            <Link className="primary-btn" to={`/lesson/${currentLesson.id}`}>
              Mở bài học tương tác →
            </Link>
          </div>

          <div className="card" style={{ marginBottom: 18 }}>
            <strong>Bắt đầu bằng thao tác:</strong> chạm vào thẻ chữ hoặc từ để nghe mẫu, sau đó làm bài nghe và chọn đáp án.
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
