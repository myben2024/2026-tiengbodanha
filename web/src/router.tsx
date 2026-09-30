import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import LessonPage from './routes/LessonPage';
import ReadingsPage from './routes/ReadingsPage';

export default function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/readings" element={<ReadingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
