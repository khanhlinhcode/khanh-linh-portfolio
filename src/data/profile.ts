export const profile = {
  name: 'Khanh Linh To',
  vietnameseName: 'To Khanh Linh',
  title: 'AI Engineer | Software Engineer',
  roleFocus: 'NLP/RAG | Computer Vision | LLM Applications',
  location: 'Can Tho, Vietnam',
  phone: '0848994188',
  email: 'linhto01012000cm@gmail.com',
  github: 'https://github.com/khanhlinhcode',
  portfolio: 'https://khanh-linh-portfolio.vercel.app/',
  avatar: 'https://github.com/khanhlinhcode.png',
  certificates: 'https://drive.google.com/drive/folders/163PDnA74SZ5_VxvmHyDJqxUa5Axgto-2?usp=sharing',
  cvUrl: '',
};

export const navItems = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'credentials', href: '#credentials' },
  { key: 'contact', href: '#contact' },
];

export const profileSignals = [
  'NLP / RAG systems',
  'Computer vision & deep learning',
  'LLM-powered applications',
  'Production software engineering',
];

export const aboutHighlights = [
  {
    title: 'NLP / RAG',
    description: 'Hybrid information retrieval, grounded Q&A, BM25, dense retrieval, FAISS, Reciprocal Rank Fusion, and evidence verification.',
  },
  {
    title: 'Computer Vision & Deep Learning',
    description: 'CNN, transfer learning, TensorFlow/Keras, MediaPipe, and image classification and recognition workflows.',
  },
  {
    title: 'LLM Applications',
    description: 'Ollama, Groq, Anthropic Claude API, AI support chatbots, and workflow integration.',
  },
  {
    title: 'Production Software Engineering',
    description: 'FastAPI, NestJS, REST APIs, databases, Git, Docker, CI, and full-stack production workflows.',
  },
];

export const education = {
  school: 'Nam Can Tho University',
  degree: "Engineer's Degree, Computer Science",
  classification: 'Good',
  coursework: ['Data Structures', 'Algorithms', 'Database Systems', 'Software Engineering', 'Machine Learning', 'Computer Vision'],
};

export type AwardItem = {
  id: string;
  title: string;
  organizer: string;
  location?: string;
  team?: string;
  date: string;
  description: string;
};

export const awards: AwardItem[] = [
  {
    id: 'auto-race-2024',
    title: '3rd Prize — Auto Race 2024',
    organizer: 'FPT University Can Tho Campus',
    team: 'Tracklab',
    date: 'December 2024',
    description: 'Applied deep learning in an autonomous-vehicle racing project.',
  },
  {
    id: 'ai-olympic-2025',
    title: 'Top 10 — AI Olympic 2025',
    organizer: 'FPT University',
    date: 'March 2025',
    description: 'Computer-vision challenge focused on identifying diseases in rice plants from images.',
  },
];

export const certifications: Array<{ name: string; issuer?: string; date?: string }> = [
  { name: 'JavaScript Basic', date: '07/2024' },
  { name: 'JavaScript Advanced', date: '09/2024' },
  { name: 'React Basic & Advanced', date: '12/2024' },
  { name: 'MLOps Concepts', issuer: 'DataCamp' },
  { name: 'Introduction to MLflow', issuer: 'DataCamp' },
  { name: 'Feature Engineering for Machine Learning in Python', issuer: 'DataCamp' },
  { name: 'Supervised Learning with scikit-learn', issuer: 'DataCamp' },
  { name: 'Extreme Gradient Boosting with XGBoost', issuer: 'DataCamp' },
  { name: 'Model Validation in Python', issuer: 'DataCamp' },
  { name: 'Hyperparameter Tuning in Python', issuer: 'DataCamp' },
];
