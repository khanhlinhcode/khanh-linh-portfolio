export type ProjectLinkKind = 'github' | 'demo' | 'backend' | 'frontend' | 'docs';

export type ProjectLink = {
  label: string;
  url: string;
  kind?: ProjectLinkKind;
};

export type Project = {
  id: string;
  name: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  featured?: boolean;
};

export type LiveProjectKind = 'blockchain' | 'product' | 'nlp';

export type LiveProject = {
  id: string;
  name: string;
  url: string;
  kind: LiveProjectKind;
};

export const liveProjects: LiveProject[] = [
  {
    id: 'certchain-live',
    name: 'CertChain',
    url: 'https://n-xi-pink.vercel.app/',
    kind: 'blockchain',
  },
  {
    id: 'phuong-nam-restaurant-live',
    name: 'Phương Nam Restaurant',
    url: 'https://phuongnamrestaurant.vercel.app/',
    kind: 'product',
  },
  {
    id: 'nlp-academic-search-live',
    name: 'NLP Academic Search',
    url: 'https://nlp-academic-search.streamlit.app/',
    kind: 'nlp',
  },
];

export const projects: Project[] = [
  {
    id: 'nlp-academic-search-rag-engine',
    name: 'NLP Academic Search & RAG Engine',
    category: 'NLP / Information Retrieval / RAG',
    description:
      'Built a local-first academic search and grounded-Q&A system combining BM25 and dense retrieval with Reciprocal Rank Fusion and optional cross-encoder reranking.',
    stack: ['Python', 'FastAPI', 'Streamlit', 'Sentence-Transformers', 'FAISS', 'BM25', 'RRF', 'Ollama', 'Groq', 'Docker', 'GitHub Actions'],
    features: [
      'Citation and evidence verification for grounded answers',
      'FastAPI SSE streaming with a Streamlit interface',
      'Corpus and index versioning with local and cloud deployment profiles',
      'GitHub Actions continuous integration',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/khanhlinhcode/NLP-Academic-Search-RAG-Engine', kind: 'github' },
      { label: 'Live Demo', url: 'https://nlp-academic-search.streamlit.app/', kind: 'demo' },
    ],
    featured: true,
  },
  {
    id: 'ai-currency-recognition',
    name: 'AI Currency Recognition System',
    category: 'Computer Vision / Deep Learning',
    description:
      'CNN baseline and transfer-learning models for VN, USD, and EUR banknote classification, exposed through a Python REST API with a React frontend.',
    stack: ['Python', 'TensorFlow/Keras', 'CNN', 'EfficientNetB0', 'NumPy', 'Matplotlib', 'FastAPI', 'React', 'Vite', 'SQLite', 'Docker'],
    features: [
      'CNN baseline and EfficientNetB0 transfer-learning workflows',
      'REST API for VN, USD, and EUR banknote classification',
      'React interface for image-based recognition workflows',
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/khanhlinhcode/Currency_Backend', kind: 'backend' },
      { label: 'Frontend', url: 'https://github.com/khanhlinhcode/Currency_Frontend', kind: 'frontend' },
    ],
  },
  {
    id: 'farta-market-ai-chatbot',
    name: 'Farta Market — AI Support Chatbot',
    category: 'LLM Application / E-commerce',
    description:
      'Built a pluggable AI chat backend using local Ollama or Anthropic Claude API to answer order-status and stock-availability questions, integrated with the storefront.',
    stack: ['Laravel 12', 'Ollama (qwen3:4b)', 'Anthropic Claude API', 'React 19', 'Vite', 'Redux Toolkit'],
    features: [
      'Pluggable local or cloud LLM provider',
      'Order-status and stock-availability support workflows',
      'Storefront integration with the React application',
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/khanhlinhcode/BE_Farta-Market-', kind: 'backend' },
      { label: 'Frontend', url: 'https://github.com/khanhlinhcode/Farta_Market', kind: 'frontend' },
    ],
  },
  {
    id: 'auto-video-pipeline',
    name: 'Auto Video Pipeline',
    category: 'AI Content Automation',
    description:
      'Self-hosted Vietnamese short-video automation pipeline using Groq for scripting, image generation, Edge-TTS voiceover, FFmpeg rendering, n8n orchestration, and automated TikTok publishing.',
    stack: ['Groq API', 'Pollinations.ai', 'Edge-TTS', 'FFmpeg', 'n8n', 'TikTok Content Posting API', 'Docker Compose'],
    features: [
      'Automated Vietnamese script, image, and voiceover generation',
      'FFmpeg video rendering coordinated through n8n',
      'Automated publishing through the TikTok Content Posting API',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/khanhlinhcode/auto-video-pipeline', kind: 'github' },
    ],
  },
  {
    id: 'certchain',
    name: 'CertChain',
    category: 'Blockchain Certificate Verification System',
    description:
      'Full-stack blockchain certificate verification system for issuing, managing, revoking, and verifying digital certificates by Certificate ID, PDF upload, and QR verification.',
    stack: ['Solidity', 'Hardhat', 'Node.js', 'Express.js', 'MongoDB', 'ethers.js', 'JWT', 'IPFS', 'Next.js', 'TypeScript', 'Docker Compose'],
    features: [
      'Certificate verification by Certificate ID, QR code, and PDF upload',
      'Smart contract verification with IPFS and MongoDB synchronization',
      'Administration workflows for issuing, managing, and revoking certificates',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/khanhlinhcode/BlockChain', kind: 'github' },
      { label: 'Live Demo', url: 'https://n-xi-pink.vercel.app/', kind: 'demo' },
    ],
  },
];
