import lessonsData from './generated/lessons.json';
import type { LessonData } from './types';

export const lessonData = lessonsData as LessonData;

export const readingData = [
  {
    id: 'A',
    title: 'O mapa e o pato',
    text: ['No mapa há um lago.', 'O pato está no lago.', 'A menina vê o pato.'],
    answer: 'No lago.',
  },
  {
    id: 'B',
    title: 'A chave e a casa',
    text: ['A chave está na mesa.', 'O pai vê a chave.', 'A casa é do pai.'],
    answer: 'A chave.',
  },
  {
    id: 'C',
    title: 'Pão, leite e gelado',
    text: ['A mãe tem pão e leite.', 'O pai tem gelado.', 'A menina vê o gelado.'],
    answer: 'Gelado.',
  },
  {
    id: 'D',
    title: 'Um livro no comboio',
    text: ['A menina vai de comboio.', 'Ela leva um livro.', 'O pai está a ler o livro.'],
    answer: 'De comboio.',
  },
  {
    id: 'E',
    title: 'A chuva e o peixe',
    text: ['Hoje chove muito.', 'O pai vê um peixe no rio.', 'A menina fica em casa com um livro.'],
    answer: 'No rio.',
  },
  {
    id: 'F',
    title: 'A mãe e os pães',
    text: ['A mãe compra pão.', 'Os pães ficam na mesa.', 'O pai põe um copo de leite ao lado.'],
    answer: 'Pão / pães.',
  },
  {
    id: 'G',
    title: 'Na escola',
    text: ['A professora abre a janela.', 'O menino escreve no papel.', 'Depois, lê um livro sobre o mar.'],
    answer: 'No papel.',
  },
  {
    id: 'H',
    title: 'Um dia em Lisboa',
    text: ['A família vai de autocarro para Lisboa.', 'A avó leva uma chávena e um livro.', 'O irmão vê o rio e diz: «O céu é azul!»'],
    answer: 'De autocarro.',
  },
];

export const lessonExercises = lessonData.lessons.map((lesson) => ({
  lessonId: lesson.id,
  question: `Trong bài ${lesson.id}, hãy tìm 1 âm hoặc từ đúng nhất để đọc rõ hơn trong tiếng Bồ Đào Nha pt-PT.`,
  options: [
    'Nghe rõ chữ và chia âm tiết',
    'Đọc đúng trọng âm từ',
    'Chọn đúng chữ viết và âm chính',
    'Kiểm tra từ mới với mẫu nghe',
  ],
  answer: 'Chọn đúng chữ viết và âm chính',
}));
