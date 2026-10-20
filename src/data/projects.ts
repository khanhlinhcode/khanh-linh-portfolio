export type ProjectLinkKind = 'github' | 'demo' | 'backend' | 'frontend' | 'docs' | 'admin';

export type ProjectLink = {
  label: string;
  url: string;
  kind?: ProjectLinkKind;
};

export type Project = {
  id: ProjectId;
  name: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  featured?: boolean;
  group: 'ai' | 'engineering';
  status: 'source' | 'local' | 'staging' | 'competition' | 'academic';
  limitation: string;
};

export type ProjectId = 'nlp-academic-search-rag-engine' | 'drowsiness-edge-iot'
  | 'auto-race-2024' | 'yolov8-face-mask' | 'ai-currency-recognition'
  | 'farta-market' | 'auto-video-pipeline' | 'certchain';

export type LiveProjectKind = 'blockchain' | 'product' | 'nlp' | 'commerce';

export type LiveProject = {
  id: string;
  name: string;
  url: string;
  kind: LiveProjectKind;
  stack: string[];
};

export const liveProjects: LiveProject[] = [
  {
    id: 'certchain-live',
    name: 'CertChain',
    url: 'https://n-xi-pink.vercel.app/',
    kind: 'blockchain',
    stack: ['Solidity', 'Hardhat', 'IPFS', 'Next.js', 'MongoDB'],
  },
  {
    id: 'phuong-nam-restaurant-live',
    name: 'Phương Nam Restaurant',
    url: 'https://phuongnamrestaurant.vercel.app/',
    kind: 'product',
    stack: ['React', 'Vite', 'Framer Motion', 'Cloudinary'],
  },
  {
    id: 'farta-market-live',
    name: 'Farta Market',
    url: 'https://fartamarket.company/',
    kind: 'commerce',
    stack: ['React', 'Laravel 12', 'Sanctum', 'MySQL', 'Cloudflare Pages', 'Northflank'],
  },
  {
    id: 'nlp-academic-search-live',
    name: 'NLP Academic Search',
    url: 'https://nlp-academic-search.streamlit.app/',
    kind: 'nlp',
    stack: ['Python', 'Streamlit', 'Sentence-Transformers', 'FAISS', 'BM25'],
  },
];

export const projects: Project[] = [
  {
    id: 'nlp-academic-search-rag-engine',
    group: 'ai',
    status: 'source',
    limitation: 'Retrieval, generation, and verification are separate capabilities; public deployment availability does not establish answer quality.',
    name: 'NLP Academic Search & RAG Engine',
    category: 'NLP / Information Retrieval / RAG',
    description:
      'Built a local-first academic search and grounded-Q&A system combining BM25 and dense retrieval with Reciprocal Rank Fusion and optional cross-encoder reranking.',
    stack: ['Python', 'FastAPI', 'Streamlit', 'Sentence-Transformers', 'FAISS', 'BM25', 'RRF', 'Ollama', 'Groq', 'Docker', 'GitHub Actions'],
    features: [
      'Retrieval: BM25 + dense embeddings, RRF fusion, and optional cross-encoder reranking.',
      'Generation: provider-based answers with citations; verification checks claims and quoted evidence against retrieved sources.',
      'Engineering: corpus/index consistency checks, FastAPI SSE, Streamlit, and separate retrieval/RAG evaluation scripts.',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/khanhlinhcode/NLP-Academic-Search-RAG-Engine', kind: 'github' },
      { label: 'Live Demo', url: 'https://nlp-academic-search.streamlit.app/', kind: 'demo' },
      { label: 'API Docs', url: 'https://nlp-academic-search-api.onrender.com/docs', kind: 'docs' },
    ],
    featured: true,
  },
  {
    id: 'drowsiness-edge-iot',
    name: 'Drowsiness Detection — Edge AI & IoT',
    group: 'ai',
    status: 'source',
    category: 'Computer Vision / Edge AI / IoT',
    description: 'An edge monitoring system that turns camera-based drowsiness indicators into hardware alerts and a mobile monitoring view, with recovery handling across devices.',
    stack: ['Python', 'OpenCV', 'MediaPipe', 'Raspberry Pi 4', 'ESP32', 'C++', 'PlatformIO', 'MQTT', 'Flutter', 'systemd'],
    features: [
      'Camera → OpenCV frames → MediaPipe Face Landmarker: eye closure, yawning, and head-pose signals on Raspberry Pi 4.',
      'Latest-frame processing limits stale input; MQTT heartbeat and reconnect handling keep device state observable.',
      'ESP32 firmware drives buzzer/LED alerts; Flutter polls an HTTP monitoring API, with Linux systemd services for deployment.',
    ],
    limitation: 'Implementation reviewed; no measured FPS, detection accuracy, or physical-device benchmark is claimed.',
    links: [],
  },
  {
    id: 'auto-race-2024',
    name: 'Auto Race 2024 — Tracklab',
    group: 'ai',
    status: 'competition',
    category: 'Computer Vision / Autonomous Vehicle',
    description: 'Third Prize with Team Tracklab in Auto Race 2024, applying camera-based learning to a physical racing vehicle.',
    stack: ['NVIDIA Jetson Nano', 'JetRacer Pro', 'ResNet-18', 'Python'],
    features: [
      'Collected camera frames with steering labels for a ResNet-18 training/fine-tuning workflow.',
      'Worked on lane and traffic-sign perception within the competition workflow and iterated through physical vehicle testing.',
    ],
    limitation: 'Author-provided competition account; training artifacts and track performance have not been independently reviewed.',
    links: [],
  },
  {
    id: 'yolov8-face-mask',
    name: 'YOLOv8 Face Mask Detection',
    group: 'ai',
    status: 'academic',
    category: 'Computer Vision / Object Detection',
    description: 'An academic detection project distinguishing correct mask usage, incorrect mask usage, and no mask.',
    stack: ['Python', 'YOLOv8', 'Computer Vision'],
    features: [
      'Prepared images, bounding-box annotations, and augmentation for a three-class detection workflow.',
      'Trained and evaluated YOLOv8 predictions across the three mask-use categories.',
    ],
    limitation: 'Author-provided project account; no dataset size, mAP, precision, or recall is published without training artifacts.',
    links: [],
  },
  {
    id: 'ai-currency-recognition',
    group: 'ai',
    status: 'local',
    limitation: 'API labels identify INR, USD, and VND—not EUR. Model/label compatibility and inference quality still require runtime validation.',
    name: 'AI Currency Recognition System',
    category: 'Computer Vision / Deep Learning',
    description:
      'A local banknote-recognition prototype connecting model-training experiments to a FastAPI inference service and a React image-upload interface.',
    stack: ['Python', 'TensorFlow/Keras', 'CNN', 'MobileNetV2', 'EfficientNetB0', 'EfficientNetV2B0', 'FastAPI', 'React', 'SQLite'],
    features: [
      'Training scripts cover a CNN baseline, MobileNetV2, EfficientNetB0, and EfficientNetV2B0 experiments.',
      'API class mapping covers Indian, US, and Vietnamese currency, including background labels.',
      'Evaluation scripts produce confusion matrices and classification reports; no unvalidated model ranking or accuracy is claimed.',
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/khanhlinhcode/Currency_Backend', kind: 'backend' },
      { label: 'Frontend', url: 'https://github.com/khanhlinhcode/Currency_Frontend', kind: 'frontend' },
    ],
  },
  {
    id: 'farta-market',
    name: 'Farta Market — E-commerce & Grounded AI',
    group: 'engineering',
    status: 'staging',
    limitation: 'Public staging/demo, not a completed production release. COD/SePay code is implemented; payment configuration and end-to-end readiness are not verified here.',
    category: 'Full-Stack Engineering / Grounded AI',
    description:
      'A multi-application commerce system: React storefront, separate React administration portal, and Laravel API, with a grounded assistant connected to product and shopping context.',
    stack: ['React 19', 'Vite', 'Redux Toolkit', 'Laravel 12', 'Sanctum', 'MySQL', 'Cloudinary', 'Cloudflare Pages', 'Northflank'],
    features: [
      'Storefront: catalog, cart, checkout, profiles, reviews, and order history; a separate Admin manages products, orders, content, and analytics.',
      'Laravel owns Sanctum sessions, authorization, inventory, order state, and payment handling; checkout code includes idempotency and inventory locking.',
      'AI tools reload product prices and stock from the database, enforce order ownership, and propose cart changes for explicit user confirmation.',
      'Documented deployment: Storefront/Admin on Cloudflare Pages and API on Northflank; this is distinct from the separate farta-commerce architecture.',
    ],
    links: [
      { label: 'Backend', url: 'https://github.com/khanhlinhcode/BE_Farta-Market-', kind: 'backend' },
      { label: 'Frontend', url: 'https://github.com/khanhlinhcode/Farta_Market', kind: 'frontend' },
      { label: 'Admin source', url: 'https://github.com/khanhlinhcode/websivi-admin', kind: 'admin' },
      { label: 'Public demo', url: 'https://fartamarket.company/', kind: 'demo' },
    ],
  },
  {
    id: 'auto-video-pipeline',
    group: 'engineering',
    status: 'local',
    limitation: 'Local/self-hosted workflow. TikTok publishing is optional and requires OAuth/configuration; unattended production operation is not claimed.',
    name: 'Auto Video Pipeline',
    category: 'AI Content Automation',
    description:
      'A self-hosted pipeline for Vietnamese short videos, coordinating scripting, image generation, voiceover, and rendering through n8n.',
    stack: ['Groq API', 'Pollinations.ai', 'Edge-TTS', 'FFmpeg', 'n8n', 'TikTok Content Posting API', 'Docker Compose'],
    features: [
      'Automated Vietnamese script, image, and voiceover generation',
      'FFmpeg video rendering coordinated through n8n',
      'Optional TikTok Content Posting API integration, gated by account authorization and configuration',
    ],
    links: [
      { label: 'GitHub', url: 'https://github.com/khanhlinhcode/auto-video-pipeline', kind: 'github' },
    ],
  },
  {
    id: 'certchain',
    group: 'engineering',
    status: 'source',
    featured: true,
    limitation: 'Public frontend available; wallet signing, API/IPFS availability, and on-chain issue/revoke/verify flows require separate end-to-end validation.',
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
