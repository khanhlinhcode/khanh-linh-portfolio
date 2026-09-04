export type SkillGroup = {
  title: string;
  icon: 'blocks' | 'code' | 'cpu' | 'database' | 'rocket' | 'search' | 'shield' | 'sparkles' | 'wrench';
  items: string[];
};

export type SkillTier = {
  id: 'ai' | 'engineering';
  groups: SkillGroup[];
};

export const skillTiers: SkillTier[] = [
  {
    id: 'ai',
    groups: [
      {
        title: 'AI / Machine Learning',
        icon: 'sparkles',
        items: [
          'Python',
          'NumPy',
          'Pandas',
          'Matplotlib',
          'scikit-learn',
          'TensorFlow/Keras',
          'Deep Learning',
          'CNN',
          'Transfer Learning',
          'MediaPipe',
        ],
      },
      {
        title: 'NLP / RAG / LLM',
        icon: 'search',
        items: [
          'BM25',
          'FAISS',
          'Reciprocal Rank Fusion',
          'Sentence-Transformers',
          'Ollama',
          'Groq',
          'Anthropic Claude API',
        ],
      },
      {
        title: 'Applied AI / IoT & Automation',
        icon: 'cpu',
        items: ['ESP32', 'Raspberry Pi', 'MQTT', 'Camera Module', 'Buzzer Alerts', 'n8n', 'FFmpeg'],
      },
    ],
  },
  {
    id: 'engineering',
    groups: [
      {
        title: 'Programming Languages',
        icon: 'code',
        items: ['JavaScript', 'TypeScript', 'Java', 'C++', 'SQL'],
      },
      {
        title: 'Frontend / Application Development',
        icon: 'rocket',
        items: ['React', 'Next.js', 'Vite', 'HTML', 'CSS', 'SCSS', 'Axios', 'Flutter'],
      },
      {
        title: 'Backend & APIs',
        icon: 'blocks',
        items: [
          'FastAPI',
          'NestJS',
          'Node.js',
          'Express.js',
          'Laravel',
          'REST API',
          'REST API Design',
          'JWT Authentication',
        ],
      },
      {
        title: 'Databases',
        icon: 'database',
        items: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Redis'],
      },
      {
        title: 'Blockchain & Verification',
        icon: 'shield',
        items: ['Solidity', 'Hardhat', 'ethers.js', 'IPFS', 'Smart Contracts', 'QR Verification'],
      },
      {
        title: 'Tools & Deployment',
        icon: 'wrench',
        items: [
          'Git',
          'GitHub',
          'VS Code',
          'Docker',
          'Docker Compose',
          'GitHub Actions',
          'Vercel',
          'Render',
          'Railway',
          'Playwright',
        ],
      },
    ],
  },
];
