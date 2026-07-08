export type Project = {
  name: string;
  category: string;
  description: string;
  stack: string[];
  features: string[];
  github: string;
  demo?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'CertChain',
    category: 'Blockchain Certificate Verification System',
    description:
      'Full-stack blockchain certificate verification system for issuing, managing, revoking, and verifying digital certificates by Certificate ID, PDF upload, and QR verification.',
    stack: [
      'Solidity',
      'Hardhat',
      'Node.js',
      'Express.js',
      'MongoDB',
      'ethers.js',
      'JWT',
      'IPFS',
      'QR Code',
      'Next.js',
      'TypeScript',
      'Docker Compose',
    ],
    features: [
      'Admin dashboard for issuing, managing, and revoking certificates',
      'Public verification by Certificate ID, PDF upload, and QR code',
      'Smart contract verification data with MongoDB synchronization',
      'IPFS integration for decentralized certificate storage',
    ],
    github: 'https://github.com/khanhlinhcode/BlockChain',
    demo: 'https://n-xi-pink.vercel.app/',
    featured: true,
  },
  {
    name: 'Farta Market Frontend',
    category: 'E-commerce Frontend',
    description:
      'E-commerce frontend with product browsing, responsive UI, SCSS styling, and Playwright end-to-end testing.',
    stack: ['React 19', 'Vite', 'JavaScript', 'SCSS', 'Playwright'],
    features: ['Product browsing interface', 'Responsive UI components', 'End-to-end testing workflows'],
    github: 'https://github.com/khanhlinhcode/Farta_Market',
  },
  {
    name: 'AI Currency Recognition System',
    category: 'AI Backend',
    description:
      'AI backend for recognizing VN, USD, and EUR banknotes using CNN and transfer learning.',
    stack: ['Python', 'Deep Learning', 'CNN', 'Transfer Learning', 'API', 'SQLite', 'Render', 'Railway'],
    features: ['Model inference API', 'Currency recognition backend', 'SQLite persistence'],
    github: 'https://github.com/khanhlinhcode/Currency_Backend',
  },
  {
    name: 'Currency Recognition Frontend',
    category: 'AI Frontend',
    description:
      'Frontend for AI currency recognition with image upload, preview, confidence display, history, filtering, pagination, export, and dashboard.',
    stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Axios', 'Vercel'],
    features: ['Drag-and-drop upload', 'Confidence display', 'History filters and export', 'Dashboard interface'],
    github: 'https://github.com/khanhlinhcode/Currency_Frontend',
  },
  {
    name: 'PERN Stack Product Store',
    category: 'Full-stack Product App',
    description:
      'Product management app using the PERN Stack with REST APIs and PostgreSQL.',
    stack: ['PostgreSQL', 'Express.js', 'React', 'Node.js'],
    features: ['Product management UI', 'REST APIs', 'PostgreSQL-backed data flows'],
    github: 'https://github.com/khanhlinhcode/PERT-STACK',
  },
];
