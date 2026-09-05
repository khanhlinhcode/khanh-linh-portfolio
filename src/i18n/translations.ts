export type Language = 'en' | 'vi';

type ProjectCopy = {
  category: string;
  description: string;
  features: string[];
};

type LiveProjectCopy = {
  category: string;
  description: string;
  previewTitle: string;
  previewHint?: string;
};

type ExperienceCopy = {
  role: string;
  period?: string;
  mode?: string;
  bullets: string[];
};

type AwardCopy = {
  title: string;
  date?: string;
  description: string;
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
  projectLinkLabels: Record<string, string>;
  brandSubtitle: string;
  hero: {
    badge: string;
    headline: string;
    title: string;
    description: string;
    focusLine: string;
    status: string;
    dashboard: string;
    featuredProject: string;
    featuredSummary: string;
  };
  focusAreas: string[];
  summary: Array<{ title: string; description: string }>;
  sections: {
    about: { title: string; description: string };
    skills: { title: string; description: string };
    experience: { title: string; description: string };
    projects: { title: string; description: string };
    liveProjects: { title: string; description: string };
    credentials: { title: string; description: string };
    contact: { title: string; description: string };
  };
  aboutHighlights: Array<{ title: string; description: string }>;
  skillTitles: Record<string, string>;
  skillTiers: Record<string, { title: string; description: string }>;
  experience: {
    metadataConnector: string;
    techLabel: string;
    items: Record<string, ExperienceCopy>;
  };
  projects: Record<string, ProjectCopy>;
  liveShowcase: {
    status: string;
    openProject: string;
    technologyLabel: string;
  };
  liveProjects: Record<string, LiveProjectCopy>;
  education: {
    degree: string;
    graduation: string;
    classification: string;
    courseworkLabel: string;
  };
  awards: Record<string, AwardCopy>;
  awardTeamLabel: string;
  certifications: {
    openFolder: string;
    noIssuer: string;
  };
  contact: {
    portfolioLabel: string;
    liveProjectsLabel: string;
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
    projectLinkLabels: {
      github: 'GitHub',
      demo: 'Live Demo',
      backend: 'Backend',
      frontend: 'Frontend',
      docs: 'API Docs',
    },
    brandSubtitle: 'AI & Software Engineer',
    hero: {
      badge: 'Computer Science Engineer',
      headline: 'Applied AI, engineered for real-world use.',
      title: 'AI Engineer | Software Engineer',
      description:
        'Computer Science Engineer building NLP/RAG, computer vision, and LLM applications—backed by hands-on production software experience.',
      focusLine: 'Python · FastAPI · RAG · TensorFlow/Keras · Computer Vision · LLMs · Docker',
      status: 'Open to AI & Software Engineering roles',
      dashboard: 'AI & Software Engineer',
      featuredProject: 'Featured work',
      featuredSummary: 'Hybrid academic search and grounded Q&A with BM25, dense retrieval, RRF, and evidence verification.',
    },
    focusAreas: ['NLP / RAG', 'Computer Vision', 'LLM Applications', 'Software Engineering'],
    summary: [
      {
        title: 'NLP / RAG systems',
        description: 'Hybrid retrieval, grounded answers, and evidence verification',
      },
      {
        title: 'Computer vision',
        description: 'Classification and real-time detection with TensorFlow/Keras and MediaPipe',
      },
      {
        title: 'Production engineering',
        description: 'Full-stack and mobile delivery with APIs, data, Docker, and CI',
      },
    ],
    sections: {
      about: {
        title: 'Applied AI, backed by practical engineering.',
        description: 'From retrieval and model workflows to APIs, interfaces, deployment, and product integration.',
      },
      skills: {
        title: 'AI-first capabilities. Broad engineering range.',
        description: 'Core AI skills first, supported by the languages, platforms, and tools used to ship complete products.',
      },
      experience: {
        title: 'From production software to applied AI.',
        description: 'Full-stack product delivery, computer vision, and real-time IoT monitoring in practical environments.',
      },
      projects: {
        title: 'Selected AI and software systems.',
        description: 'Focused work across NLP/RAG, computer vision, LLM applications, automation, and software engineering.',
      },
      liveProjects: {
        title: 'Built, deployed, and ready to explore.',
        description: 'Three live products spanning blockchain verification, production web delivery, and academic NLP search.',
      },
      credentials: {
        title: 'Education and achievements.',
        description: 'Computer Science engineering, AI-focused competition results, and continued technical learning.',
      },
      contact: {
        title: 'Let’s build useful AI.',
        description: 'Open to Applied AI and Software Engineering opportunities.',
      },
    },
    aboutHighlights: [
      {
        title: 'NLP / RAG',
        description: 'Hybrid search and grounded Q&A with BM25, FAISS, RRF, and evidence verification.',
      },
      {
        title: 'Computer Vision & Deep Learning',
        description: 'Image classification and real-time detection with CNNs, transfer learning, TensorFlow/Keras, and MediaPipe.',
      },
      {
        title: 'LLM Applications',
        description: 'Local and cloud LLM integrations with Ollama, Groq, Claude API, and support workflows.',
      },
      {
        title: 'Production Software Engineering',
        description: 'APIs, databases, full-stack delivery, Git, Docker, and CI with FastAPI and NestJS.',
      },
    ],
    skillTitles: {
      'AI / Machine Learning': 'AI / Machine Learning',
      'NLP / RAG / LLM': 'NLP / RAG / LLM',
      'Applied AI / IoT & Automation': 'Applied AI / IoT & Automation',
      'Programming Languages': 'Programming Languages',
      'Frontend / Application Development': 'Frontend / Application Development',
      'Backend & APIs': 'Backend & APIs',
      Databases: 'Databases',
      'Blockchain & Verification': 'Blockchain & Verification',
      'Tools & Deployment': 'Tools & Deployment',
    },
    skillTiers: {
      ai: {
        title: 'Core AI & Applied Intelligence',
        description: 'Primary capabilities for building retrieval, model, vision, IoT, and AI-automation workflows.',
      },
      engineering: {
        title: 'Software Engineering Foundation',
        description: 'Languages, frameworks, platforms, and delivery tools supporting complete product development.',
      },
    },
    experience: {
      metadataConnector: ' · ',
      techLabel: 'Technology',
      items: {},
    },
    projects: {},
    liveShowcase: {
      status: '3 deployed products',
      openProject: 'Open live website',
      technologyLabel: 'Technology stack',
    },
    liveProjects: {
      'certchain-live': {
        category: 'Blockchain verification',
        description: 'Certificate issuance and permanent verification through blockchain, IPFS, QR codes, and PDF records.',
        previewTitle: 'Verified on-chain',
      },
      'phuong-nam-restaurant-live': {
        category: 'One Mekong · Production web',
        description: 'A polished restaurant landing experience presenting Southern Vietnamese cuisine and a direct reservation path.',
        previewTitle: 'Phương Nam',
        previewHint: 'Southern cuisine · Can Tho',
      },
      'nlp-academic-search-live': {
        category: 'NLP / RAG application',
        description: 'Hybrid academic retrieval and grounded Q&A with traceable citations and evidence verification.',
        previewTitle: 'Grounded answer',
        previewHint: 'academic retrieval',
      },
    },
    education: {
      degree: "Engineer's Degree, Computer Science",
      graduation: 'Graduated August 2026',
      classification: 'Good classification',
      courseworkLabel: 'Relevant coursework',
    },
    awards: {},
    awardTeamLabel: 'Team',
    certifications: {
      openFolder: 'Open Certificates Folder',
      noIssuer: '',
    },
    contact: {
      portfolioLabel: 'Portfolio website',
      liveProjectsLabel: 'Explore 3 live products',
      graduation: 'Graduated August 2026',
    },
    footer: 'Applied AI and software-engineering portfolio.',
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
    projectLinkLabels: {
      github: 'GitHub',
      demo: 'Demo',
      backend: 'Backend',
      frontend: 'Frontend',
      docs: 'Tài liệu API',
    },
    brandSubtitle: 'AI & Software Engineer',
    hero: {
      badge: 'Kỹ sư Khoa học Máy tính',
      headline: 'AI ứng dụng, được xây dựng cho bài toán thực tế.',
      title: 'AI Engineer | Software Engineer',
      description:
        'Kỹ sư Khoa học Máy tính xây dựng ứng dụng NLP/RAG, Computer Vision và LLM, với nền tảng phát triển phần mềm production thực tế.',
      focusLine: 'Python · FastAPI · RAG · TensorFlow/Keras · Computer Vision · LLM · Docker',
      status: 'Sẵn sàng cho các vị trí AI & Software Engineering',
      dashboard: 'AI & Software Engineer',
      featuredProject: 'Dự án tiêu biểu',
      featuredSummary: 'Tìm kiếm học thuật hybrid và grounded Q&A với BM25, dense retrieval, RRF và kiểm chứng evidence.',
    },
    focusAreas: ['NLP / RAG', 'Computer Vision', 'Ứng dụng LLM', 'Software Engineering'],
    summary: [
      {
        title: 'Hệ thống NLP / RAG',
        description: 'Hybrid retrieval, grounded answers và kiểm chứng evidence',
      },
      {
        title: 'Computer Vision',
        description: 'Phân loại và nhận diện thời gian thực với TensorFlow/Keras và MediaPipe',
      },
      {
        title: 'Production engineering',
        description: 'Phát triển full-stack và mobile với APIs, data, Docker và CI',
      },
    ],
    sections: {
      about: {
        title: 'AI ứng dụng, trên nền tảng engineering thực tế.',
        description: 'Từ retrieval và model workflow đến API, giao diện, triển khai và tích hợp sản phẩm.',
      },
      skills: {
        title: 'Năng lực AI cốt lõi. Nền tảng engineering rộng.',
        description: 'Ưu tiên kỹ năng AI, cùng ngôn ngữ, nền tảng và công cụ cần thiết để hoàn thiện sản phẩm.',
      },
      experience: {
        title: 'Từ production software đến AI ứng dụng.',
        description: 'Phát triển sản phẩm full-stack, Computer Vision và giám sát IoT thời gian thực trong môi trường thực tế.',
      },
      projects: {
        title: 'Các hệ thống AI và phần mềm tiêu biểu.',
        description: 'Tập trung vào NLP/RAG, Computer Vision, ứng dụng LLM, automation và Software Engineering.',
      },
      liveProjects: {
        title: 'Đã xây dựng, triển khai và sẵn sàng trải nghiệm.',
        description: 'Ba sản phẩm đang hoạt động, trải dài từ xác thực blockchain đến website production và tìm kiếm học thuật bằng NLP.',
      },
      credentials: {
        title: 'Học vấn và thành tích.',
        description: 'Đào tạo Kỹ sư Khoa học Máy tính, thành tích cuộc thi AI và quá trình học tập kỹ thuật.',
      },
      contact: {
        title: 'Cùng xây dựng AI hữu ích.',
        description: 'Sẵn sàng cho cơ hội Applied AI và Software Engineering.',
      },
    },
    aboutHighlights: [
      {
        title: 'NLP / RAG',
        description: 'Hybrid search và grounded Q&A với BM25, FAISS, RRF và kiểm chứng evidence.',
      },
      {
        title: 'Computer Vision & Deep Learning',
        description: 'Phân loại ảnh và nhận diện thời gian thực với CNN, transfer learning, TensorFlow/Keras và MediaPipe.',
      },
      {
        title: 'Ứng dụng LLM',
        description: 'Tích hợp LLM local/cloud với Ollama, Groq, Claude API và các support workflow.',
      },
      {
        title: 'Production Software Engineering',
        description: 'API, database, full-stack delivery, Git, Docker và CI với FastAPI và NestJS.',
      },
    ],
    skillTitles: {
      'AI / Machine Learning': 'AI / Machine Learning',
      'NLP / RAG / LLM': 'NLP / RAG / LLM',
      'Applied AI / IoT & Automation': 'AI ứng dụng / IoT & Automation',
      'Programming Languages': 'Ngôn ngữ lập trình',
      'Frontend / Application Development': 'Frontend / Phát triển ứng dụng',
      'Backend & APIs': 'Backend & APIs',
      Databases: 'Databases',
      'Blockchain & Verification': 'Blockchain & Verification',
      'Tools & Deployment': 'Công cụ & Triển khai',
    },
    skillTiers: {
      ai: {
        title: 'Năng lực AI & ứng dụng cốt lõi',
        description: 'Các năng lực chính để xây dựng retrieval, model, Computer Vision, IoT và quy trình AI automation.',
      },
      engineering: {
        title: 'Nền tảng Software Engineering',
        description: 'Ngôn ngữ, framework, nền tảng và công cụ triển khai phục vụ quá trình phát triển sản phẩm hoàn chỉnh.',
      },
    },
    experience: {
      metadataConnector: ' · ',
      techLabel: 'Công nghệ',
      items: {
        'onemekong-software-engineer': {
          role: 'Software Engineer (Full-Stack)',
          period: 'Tháng 06/2026 – Hiện tại',
          bullets: [
            'Phụ trách các tính năng production cho đặt món và đặt phòng khách sạn, triển khai luồng backend và frontend cho duyệt menu, giỏ hàng, đặt món, phân phòng và quản trị nhà hàng.',
            'Xây dựng xác thực OTP qua số điện thoại và chuyển nhà cung cấp SMS từ Firebase sang eSMS sau các vấn đề về độ ổn định.',
            'Đóng góp vào quy trình đặt phòng và phân phòng nội bộ, thay thế sự phụ thuộc vào hệ thống POS bên thứ ba.',
          ],
        },
        'tien-phong-ai-iot-intern': {
          role: 'Software Engineering Intern — AI Drowsiness Detection & IoT Monitoring',
          period: 'Tháng 10/2025 – Tháng 06/2026',
          mode: 'Làm việc trực tiếp',
          bullets: [
            'Xây dựng React UI components cho hệ thống AI phát hiện buồn ngủ thời gian thực và hỗ trợ quy trình nhận diện Computer Vision bằng MediaPipe.',
            'Đóng góp vào tích hợp IoT với ESP32, Raspberry Pi, MQTT, camera và buzzer để cảnh báo thời gian thực.',
            'Hỗ trợ testing và debugging qua quy trình Git/GitHub.',
          ],
        },
      },
    },
    projects: {
      'NLP Academic Search & RAG Engine': {
        category: 'NLP / Information Retrieval / RAG',
        description: 'Xây dựng hệ thống tìm kiếm học thuật local-first và grounded Q&A, kết hợp BM25 với dense retrieval qua Reciprocal Rank Fusion và tùy chọn cross-encoder reranking.',
        features: [
          'Kiểm chứng citation và evidence cho câu trả lời grounded',
          'FastAPI SSE streaming với giao diện Streamlit',
          'Versioning cho corpus và index với cấu hình triển khai local/cloud',
          'Continuous integration bằng GitHub Actions',
        ],
      },
      'AI Currency Recognition System': {
        category: 'Computer Vision / Deep Learning',
        description: 'Mô hình CNN baseline và transfer learning để phân loại tiền VN, USD và EUR, cung cấp qua Python REST API cùng giao diện React.',
        features: [
          'Quy trình CNN baseline và EfficientNetB0 transfer learning',
          'REST API phân loại tiền VN, USD và EUR',
          'Giao diện React cho quy trình nhận diện từ hình ảnh',
        ],
      },
      'Farta Market — AI Support Chatbot': {
        category: 'Ứng dụng LLM / E-commerce',
        description: 'Xây dựng AI chat backend linh hoạt dùng Ollama local hoặc Anthropic Claude API để trả lời về trạng thái đơn hàng và tồn kho, tích hợp với storefront.',
        features: ['Linh hoạt lựa chọn LLM provider local hoặc cloud', 'Quy trình hỗ trợ trạng thái đơn hàng và tồn kho', 'Tích hợp storefront với ứng dụng React'],
      },
      'Auto Video Pipeline': {
        category: 'AI Content Automation',
        description: 'Pipeline tự host để tự động hóa video ngắn tiếng Việt, dùng Groq viết kịch bản, tạo ảnh, Edge-TTS lồng tiếng, FFmpeg dựng video, n8n điều phối và tự động đăng TikTok.',
        features: ['Tự động tạo kịch bản, hình ảnh và giọng đọc tiếng Việt', 'Dựng video bằng FFmpeg qua n8n', 'Tự động đăng qua TikTok Content Posting API'],
      },
      CertChain: {
        category: 'Hệ thống xác thực chứng chỉ Blockchain',
        description: 'Hệ thống full-stack xác thực chứng chỉ bằng blockchain, hỗ trợ cấp, quản lý, thu hồi và xác thực qua Certificate ID, PDF upload và QR.',
        features: ['Xác thực qua Certificate ID, QR và PDF upload', 'Smart contract kết hợp IPFS và đồng bộ MongoDB', 'Quy trình quản trị để cấp, quản lý và thu hồi chứng chỉ'],
      },
    },
    liveShowcase: {
      status: '3 sản phẩm đã triển khai',
      openProject: 'Mở website thực tế',
      technologyLabel: 'Công nghệ sử dụng',
    },
    liveProjects: {
      'certchain-live': {
        category: 'Xác thực Blockchain',
        description: 'Nền tảng cấp và xác thực chứng chỉ lâu dài bằng blockchain, IPFS, QR và hồ sơ PDF.',
        previewTitle: 'Đã xác thực on-chain',
      },
      'phuong-nam-restaurant-live': {
        category: 'One Mekong · Website production',
        description: 'Landing page nhà hàng chỉn chu, giới thiệu ẩm thực Nam Bộ và dẫn khách hàng trực tiếp tới hành động đặt bàn.',
        previewTitle: 'Phương Nam',
        previewHint: 'Ẩm thực Nam Bộ · Cần Thơ',
      },
      'nlp-academic-search-live': {
        category: 'Ứng dụng NLP / RAG',
        description: 'Tìm kiếm học thuật hybrid và grounded Q&A với citation rõ ràng cùng quy trình kiểm chứng evidence.',
        previewTitle: 'Câu trả lời có căn cứ',
        previewHint: 'tìm kiếm học thuật',
      },
    },
    education: {
      degree: 'Bằng Kỹ sư, Khoa học Máy tính',
      graduation: 'Tốt nghiệp tháng 08/2026',
      classification: 'Xếp loại Khá',
      courseworkLabel: 'Môn học liên quan',
    },
    awards: {
      'auto-race-2024': {
        title: 'Giải Ba — Auto Race 2024',
        date: 'Tháng 12/2024',
        description: 'Ứng dụng Deep Learning trong dự án đua xe tự hành.',
      },
      'ai-olympic-2025': {
        title: 'Top 10 — AI Olympic 2025',
        date: 'Tháng 03/2025',
        description: 'Thử thách Computer Vision tập trung nhận diện bệnh trên cây lúa từ hình ảnh.',
      },
    },
    awardTeamLabel: 'Đội',
    certifications: {
      openFolder: 'Mở thư mục chứng chỉ',
      noIssuer: '',
    },
    contact: {
      portfolioLabel: 'Website portfolio',
      liveProjectsLabel: 'Khám phá 3 sản phẩm thực tế',
      graduation: 'Tốt nghiệp tháng 08/2026',
    },
    footer: 'Portfolio AI ứng dụng và Software Engineering.',
  },
};
