import { Link } from 'react-router-dom';
import { readingData } from '../data';

export default function ReadingsPage() {
  return (
    <div className="app-shell">
      <div className="section-header" style={{ marginBottom: 20 }}>
        <Link to="/" className="secondary-btn" style={{ display: 'inline-flex', alignItems: 'center' }}>
          ← Quay về
        </Link>
        <span className="tag">8 bài đọc</span>
      </div>

      <div className="lesson-grid">
        {readingData.map((reading) => (
          <div key={reading.id} className="lesson-card" style={{ minHeight: 220 }}>
            <span className="lesson-index">Đọc {reading.id}</span>
            <h3>{reading.title}</h3>
            <ul style={{ paddingLeft: 18, color: '#536074' }}>
              {reading.text.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className="card" style={{ marginTop: 12 }}>
              <strong>Đáp án:</strong> {reading.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
