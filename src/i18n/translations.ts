export type Language = 'en' | 'vi';

type ProjectCopy = {
  category: string;
  description: string;
  features: string[];
};

type CertificationCopy = {
  openFolder: string;
  noIssuer: string;
};

export type TranslationDictionary = {
  aria: {
    contactEmail: string;
    languageToggle: string;
    openGithub: string;
    primaryNav: string;
    themeToggle: string;
  };
  nav: Record<string, string>;
  actions: {
    contactMe: string;
    cvComingSoon: string;
    downloadCv: string;
    email: string;
    emailMe: string;
    github: string;
    liveDemo: string;
    viewGithub: string;
    viewProjects: string;
  };
  brandSubtitle: string;
  hero: {
    badge: string;
    headline: string;
    title: string;
    description: string;
    focusLine: string;
    identityLabel: string;
    status: string;
    dashboard: string;
    featuredProject: string;
  };
  focusAreas: string[];
  summary: Array<{ title: string; description: string }>;
  sections: {
    about: { eyebrow: string; title: string; description: string };
    skills: { eyebrow: string; title: string; description: string };
    experience: { eyebrow: string; title: string; description: string };
    projects: { eyebrow: string; title: string; description: string };
    credentials: { eyebrow: string; title: string; description: string };
    contact: { eyebrow: string; title: string; description: string };
  };
  aboutHighlights: Array<{ title: string; description: string }>;
  skillTitles: Record<string, string>;
  experience: {
    role: string;
    metadataConnector: string;
    projectLabel: string;
    bullets: string[];
  };
  projects: Record<string, ProjectCopy>;
  education: {
    degree: string;
    classification: string;
    gpaLabel: string;
    courseworkLabel: string;
  };
  award: {
    title: string;
    description: string;
  };
  certifications: CertificationCopy;
  contact: {
    portfolioLabel: string;
    graduation: string;
  };
  footer: string;
};

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    aria: {
      contactEmail: 'Email Khanh Linh To',
      languageToggle: 'Switch language',
      openGithub: 'Open GitHub profile',
      primaryNav: 'Primary navigation',
      themeToggle: 'Toggle light and dark theme',
    },
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      credentials: 'Credentials',
      contact: 'Contact',
    },
    actions: {
      contactMe: 'Contact Me',
      cvComingSoon: 'CV coming soon',
      downloadCv: 'Download CV',
      email: 'Email',
      emailMe: 'Email Me',
      github: 'GitHub',
      liveDemo: 'Live Demo',
      viewGithub: 'View GitHub',
      viewProjects: 'View Projects',
    },
    brandSubtitle: 'Junior Software Engineer',
    hero: {
      badge: 'Junior Software Engineer',
      headline: 'Building full-stack, blockchain, and AI-IoT applications.',
      title: 'Junior Software Engineer | Full-stack Developer',
      description:
        'Computer Science student focused on React, Next.js, Node.js, blockchain-based verification systems, AI-powered tools, and IoT monitoring workflows.',
      focusLine: 'React · Next.js · Node.js · Solidity · Python · MediaPipe · IoT',
      identityLabel: 'Available profile',
      status: 'Open to Junior Developer Roles',
      dashboard: 'Portfolio dashboard',
      featuredProject: 'Featured project',
    },
    focusAreas: ['Full-stack', 'Blockchain', 'AI apps', 'AI-IoT'],
    summary: [
      {
        title: 'React + Full-stack',
        description: 'Frontend flows, REST APIs, authentication, and database-backed project work',
      },
      {
        title: 'Blockchain',
        description: 'Certificate verification, smart contracts, IPFS, QR verification flows',
      },
      {
        title: 'AI-IoT',
        description: 'MediaPipe workflows, ESP32, Raspberry Pi, MQTT monitoring and alerting',
      },
    ],
    sections: {
      about: {
        eyebrow: 'About',
        title: 'A junior developer profile built around practical systems.',
        description:
          'My work focuses on clear user interfaces, reliable backend flows, and technical projects that connect web development with blockchain, AI, and IoT workflows.',
      },
      skills: {
        eyebrow: 'Skills',
        title: 'Technical skill set',
        description: 'Grouped for fast recruiter scanning without skill bars or inflated percentages.',
      },
      experience: {
        eyebrow: 'Experience',
        title: 'Internship experience',
        description:
          'A focused on-site internship around AI drowsiness detection, React UI work, and IoT monitoring flows.',
      },
      projects: {
        eyebrow: 'Projects',
        title: 'Featured engineering work',
        description: 'CertChain is the flagship project because it shows the strongest end-to-end system scope.',
      },
      credentials: {
        eyebrow: 'Credentials',
        title: 'Education, awards, and certifications',
        description: 'Records are presented as credential cards, with certificate evidence grouped in Google Drive.',
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Open to junior software engineering opportunities.',
        description:
          'Open to Junior Software Engineer, Full-stack Developer, React Developer, AI-IoT, and Blockchain Developer opportunities.',
      },
    },
    aboutHighlights: [
      {
        title: 'Full-stack development',
        description:
          'Builds practical React interfaces, REST API flows, authentication, database-backed features, and deployment-ready project structures.',
      },
      {
        title: 'Blockchain verification',
        description:
          'Focuses on certificate issuing, revocation, QR verification, IPFS records, and smart contract-backed verification flows.',
      },
      {
        title: 'AI applications',
        description:
          'Works with recognition workflows, model inference APIs, image upload experiences, and dashboard-style frontend states.',
      },
      {
        title: 'AI-IoT workflows',
        description:
          'Supports monitoring and alerting flows using React UI, MediaPipe workflows, ESP32, Raspberry Pi, MQTT, camera module, and buzzer.',
      },
    ],
    skillTitles: {
      'Programming Languages': 'Programming Languages',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Databases: 'Databases',
      'AI / Machine Learning': 'AI / Machine Learning',
      Blockchain: 'Blockchain',
      IoT: 'IoT',
      'Tools & Deployment': 'Tools & Deployment',
    },
    experience: {
      role: 'Software Engineering Intern',
      metadataConnector: ' · ',
      projectLabel: 'Project',
      bullets: [
        'Developed frontend UI components for a web-based AI drowsiness detection system using React.',
        'Built interfaces for displaying detection status, monitoring data, and system interaction flows.',
        'Supported computer vision-based drowsiness detection workflows using MediaPipe.',
        'Integrated IoT monitoring and alerting workflows using ESP32, Raspberry Pi, MQTT, camera module, and buzzer.',
        'Supported testing, debugging, and improving web and IoT system functionality.',
        'Used Git, GitHub, and VS Code for source code management and development workflow.',
      ],
    },
    projects: {
      CertChain: {
        category: 'Blockchain Certificate Verification System',
        description:
          'Full-stack blockchain certificate verification system for issuing, managing, revoking, and verifying digital certificates by Certificate ID, PDF upload, and QR verification.',
        features: [
          'Certificate verification by Certificate ID, QR code, and PDF upload',
          'SHA-256 PDF hashing using Web Crypto API',
          'Smart contract verification with IPFS and MongoDB synchronization',
        ],
      },
      'Farta Market Frontend': {
        category: 'E-commerce Frontend',
        description:
          'E-commerce frontend with product browsing, responsive UI, SCSS styling, and Playwright end-to-end testing.',
        features: ['Product browsing interface', 'Responsive UI components', 'End-to-end testing workflows'],
      },
      'AI Currency Recognition System': {
        category: 'AI Backend',
        description: 'AI backend for recognizing VN, USD, and EUR banknotes using CNN and transfer learning.',
        features: ['Model inference API', 'Currency recognition backend', 'SQLite persistence'],
      },
      'Currency Recognition Frontend': {
        category: 'AI Frontend',
        description:
          'Frontend for AI currency recognition with image upload, preview, confidence display, history, filtering, pagination, export, and dashboard.',
        features: ['Drag-and-drop upload', 'Confidence display', 'History filters and export', 'Dashboard interface'],
      },
      'PERN Stack Product Store': {
        category: 'Full-stack Product App',
        description: 'Product management app using the PERN Stack with REST APIs and PostgreSQL.',
        features: ['Product management UI', 'REST APIs', 'PostgreSQL-backed data flows'],
      },
    },
    education: {
      degree: 'Computer Science',
      classification: 'Good classification',
      gpaLabel: 'GPA',
      courseworkLabel: 'Relevant coursework',
    },
    award: {
      title: 'Auto Race 2024 - Third Prize',
      description: 'Recognized as a third-prize team member in Auto Race 2024.',
    },
    certifications: {
      openFolder: 'Open Certificates Folder',
      noIssuer: '',
    },
    contact: {
      portfolioLabel: 'CertChain Live Demo',
      graduation: 'Expected graduation: 10/2026',
    },
    footer: 'Built as a focused developer portfolio for recruiter review.',
  },
  vi: {
    aria: {
      contactEmail: 'Gửi email cho Khanh Linh To',
      languageToggle: 'Chuyển ngôn ngữ',
      openGithub: 'Mở hồ sơ GitHub',
      primaryNav: 'Điều hướng chính',
      themeToggle: 'Chuyển giao diện sáng tối',
    },
    nav: {
      about: 'Giới thiệu',
      skills: 'Kỹ năng',
      experience: 'Kinh nghiệm',
      projects: 'Dự án',
      credentials: 'Hồ sơ',
      contact: 'Liên hệ',
    },
    actions: {
      contactMe: 'Liên hệ',
      cvComingSoon: 'CV sắp cập nhật',
      downloadCv: 'Tải CV',
      email: 'Email',
      emailMe: 'Gửi email',
      github: 'GitHub',
      liveDemo: 'Demo',
      viewGithub: 'Xem GitHub',
      viewProjects: 'Xem dự án',
    },
    brandSubtitle: 'Junior Software Engineer',
    hero: {
      badge: 'Junior Software Engineer',
      headline: 'Xây dựng ứng dụng full-stack, blockchain và AI-IoT.',
      title: 'Junior Software Engineer | Full-stack Developer',
      description:
        'Sinh viên Khoa học Máy tính tập trung vào React, Next.js, Node.js, hệ thống xác thực blockchain, ứng dụng AI và quy trình giám sát IoT.',
      focusLine: 'React · Next.js · Node.js · Solidity · Python · MediaPipe · IoT',
      identityLabel: 'Hồ sơ sẵn sàng',
      status: 'Sẵn sàng cho vị trí Junior Developer',
      dashboard: 'Portfolio dashboard',
      featuredProject: 'Dự án nổi bật',
    },
    focusAreas: ['Full-stack', 'Blockchain', 'AI apps', 'AI-IoT'],
    summary: [
      {
        title: 'React + Full-stack',
        description: 'Giao diện frontend, REST APIs, xác thực và luồng dữ liệu với database',
      },
      {
        title: 'Blockchain',
        description: 'Xác thực chứng chỉ, smart contract, IPFS và quy trình QR verification',
      },
      {
        title: 'AI-IoT',
        description: 'MediaPipe, ESP32, Raspberry Pi, MQTT, giám sát và cảnh báo',
      },
    ],
    sections: {
      about: {
        eyebrow: 'Giới thiệu',
        title: 'Hồ sơ junior developer tập trung vào hệ thống thực tế.',
        description:
          'Mình tập trung xây dựng giao diện rõ ràng, backend flow ổn định và các dự án kỹ thuật kết nối web development với blockchain, AI và IoT.',
      },
      skills: {
        eyebrow: 'Kỹ năng',
        title: 'Nhóm kỹ năng kỹ thuật',
        description: 'Được nhóm để recruiter dễ đọc nhanh, không dùng thanh phần trăm hay thông số phóng đại.',
      },
      experience: {
        eyebrow: 'Kinh nghiệm',
        title: 'Kinh nghiệm thực tập',
        description:
          'Kỳ thực tập on-site tập trung vào AI drowsiness detection, React UI và quy trình giám sát IoT.',
      },
      projects: {
        eyebrow: 'Dự án',
        title: 'Các dự án kỹ thuật nổi bật',
        description: 'CertChain là dự án chính vì thể hiện rõ nhất phạm vi full-stack end-to-end.',
      },
      credentials: {
        eyebrow: 'Hồ sơ',
        title: 'Học vấn, hoạt động và chứng chỉ',
        description: 'Thông tin được trình bày như credential cards, kèm thư mục Google Drive để recruiter kiểm tra.',
      },
      contact: {
        eyebrow: 'Liên hệ',
        title: 'Sẵn sàng cho cơ hội junior software engineering.',
        description:
          'Quan tâm đến các vị trí Junior Software Engineer, Full-stack Developer, React Developer, AI-IoT và Blockchain Developer.',
      },
    },
    aboutHighlights: [
      {
        title: 'Full-stack development',
        description:
          'Xây dựng giao diện React thực tế, REST API flows, xác thực, tính năng có database và cấu trúc project dễ triển khai.',
      },
      {
        title: 'Blockchain verification',
        description:
          'Tập trung vào cấp phát chứng chỉ, thu hồi, QR verification, IPFS records và quy trình xác thực bằng smart contract.',
      },
      {
        title: 'AI applications',
        description:
          'Làm việc với recognition workflows, model inference APIs, trải nghiệm upload hình ảnh và dashboard states.',
      },
      {
        title: 'AI-IoT workflows',
        description:
          'Hỗ trợ quy trình giám sát/cảnh báo bằng React UI, MediaPipe, ESP32, Raspberry Pi, MQTT, camera module và buzzer.',
      },
    ],
    skillTitles: {
      'Programming Languages': 'Programming Languages',
      Frontend: 'Frontend',
      Backend: 'Backend',
      Databases: 'Databases',
      'AI / Machine Learning': 'AI / Machine Learning',
      Blockchain: 'Blockchain',
      IoT: 'IoT',
      'Tools & Deployment': 'Tools & Deployment',
    },
    experience: {
      role: 'Software Engineering Intern',
      metadataConnector: ' · ',
      projectLabel: 'Dự án',
      bullets: [
        'Phát triển các React UI components cho hệ thống AI drowsiness detection trên web.',
        'Xây dựng giao diện hiển thị trạng thái nhận diện, dữ liệu giám sát và luồng tương tác hệ thống.',
        'Hỗ trợ quy trình computer vision-based drowsiness detection sử dụng MediaPipe.',
        'Tích hợp quy trình giám sát và cảnh báo IoT với ESP32, Raspberry Pi, MQTT, camera module và buzzer.',
        'Hỗ trợ testing, debugging và cải thiện chức năng của hệ thống web và IoT.',
        'Sử dụng Git, GitHub và VS Code cho quản lý source code và development workflow.',
      ],
    },
    projects: {
      CertChain: {
        category: 'Blockchain Certificate Verification System',
        description:
          'Hệ thống full-stack xác thực chứng chỉ bằng blockchain, hỗ trợ cấp phát, quản lý, thu hồi và xác thực chứng chỉ bằng Certificate ID, PDF upload và QR verification.',
        features: [
          'Xác thực chứng chỉ bằng Certificate ID, QR code và PDF upload',
          'SHA-256 PDF hashing bằng Web Crypto API',
          'Smart contract verification kết hợp IPFS và đồng bộ MongoDB',
        ],
      },
      'Farta Market Frontend': {
        category: 'E-commerce Frontend',
        description:
          'Frontend thương mại điện tử có product browsing, responsive UI, SCSS styling và Playwright end-to-end testing.',
        features: ['Giao diện duyệt sản phẩm', 'Responsive UI components', 'End-to-end testing workflows'],
      },
      'AI Currency Recognition System': {
        category: 'AI Backend',
        description: 'Backend AI nhận diện tiền VN, USD và EUR bằng CNN và transfer learning.',
        features: ['Model inference API', 'Currency recognition backend', 'SQLite persistence'],
      },
      'Currency Recognition Frontend': {
        category: 'AI Frontend',
        description:
          'Frontend cho hệ thống nhận diện tiền với image upload, preview, confidence display, history, filtering, pagination, export và dashboard.',
        features: ['Drag-and-drop upload', 'Confidence display', 'History filters and export', 'Dashboard interface'],
      },
      'PERN Stack Product Store': {
        category: 'Full-stack Product App',
        description: 'Ứng dụng quản lý sản phẩm dùng PERN Stack với REST APIs và PostgreSQL.',
        features: ['Product management UI', 'REST APIs', 'PostgreSQL-backed data flows'],
      },
    },
    education: {
      degree: 'Khoa học Máy tính',
      classification: 'Xếp loại Good',
      gpaLabel: 'GPA',
      courseworkLabel: 'Môn học liên quan',
    },
    award: {
      title: 'Auto Race 2024 - Third Prize',
      description: 'Thành viên đội đạt giải ba tại Auto Race 2024.',
    },
    certifications: {
      openFolder: 'Mở thư mục chứng chỉ',
      noIssuer: '',
    },
    contact: {
      portfolioLabel: 'Demo CertChain',
      graduation: 'Dự kiến tốt nghiệp: 10/2026',
    },
    footer: 'Portfolio được xây dựng tập trung cho recruiter review.',
  },
};
