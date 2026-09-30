export type LessonBlock = {
  type: 'paragraph' | 'note' | 'heading' | 'list' | 'table' | 'quote';
  text: string;
  items?: string[];
  ordered?: boolean;
  rows?: string[][];
};

export type LessonVocabulary = {
  label: string;
  value: string;
  meaning: string;
};

export type Lesson = {
  id: number;
  title: string;
  summary: string;
  steps: string[];
  blocks: LessonBlock[];
  vocabulary: LessonVocabulary[];
};

export type LessonData = {
  title: string;
  subtitle: string;
  lessonCount: number;
  readingCount: number;
  lessons: Lesson[];
  meta: {
    source: string;
    locale: string;
    audioPolicy: string;
  };
};
