import { projects, type Project, type ProjectId } from '../data/projects';

export type Language = 'en' | 'vi';

type ProjectCopy = {
  category: string;
  description: string;
  features: string[];
  limitation: string;
};

type LiveProjectCopy = {
  category: string;
  description: string;
  previewTitle: string;
  previewHint?: string;
  status: string;
  limitation: string;
};

type ExperienceCopy = {
  role: string;
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
  projects: Record<ProjectId, ProjectCopy>;
  projectStatuses: Record<Project['status'], string>;
  projectGroups: Record<Project['group'], string>;
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
      demo: 'Demo',
      backend: 'Backend',
      frontend: 'Frontend',
      docs: 'API Docs',
      admin: 'Admin source',
    },
    brandSubtitle: 'AI & Software Engineer',
    hero: {
      badge: 'Computer Science Engineer',
      headline: 'Applied AI, engineered for real-world use.',
      title: 'AI Engineer | Software Engineer',
      description:
        'AI and Software Engineer connecting retrieval and language models, computer vision on edge devices, and full-stack applications.',
      focusLine: 'NLP/RAG · Computer Vision · Edge AI · Python · Laravel · React · Flutter',
      status: 'Open to AI & Software Engineering roles',
      dashboard: 'AI & Software Engineer',
      featuredProject: 'Featured work',
      featuredSummary: 'Hybrid academic search and grounded Q&A with BM25, dense retrieval, RRF, and evidence verification.',
    },
    focusAreas: ['NLP / RAG', 'Computer Vision & Edge AI', 'LLM Applications', 'Full-Stack Engineering'],
    summary: [
      {
        title: 'NLP / RAG systems',
        description: 'Hybrid retrieval, grounded answers, and evidence verification',
      },
      {
        title: 'Computer vision',
        description: 'Classification, face landmarks, and device alerts with OpenCV, MediaPipe, and MQTT',
      },
      {
        title: 'Full-stack engineering',
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
        title: 'Explore the deployed interfaces.',
        description: 'Public entry points with explicit scope: a rendered interface is not proof of backend, payment, or model readiness.',
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
        title: 'Computer Vision & Edge AI',
        description: 'Image classification and face-landmark pipelines, connected to Raspberry Pi, ESP32 alerts, and mobile monitoring.',
      },
      {
        title: 'LLM Applications',
        description: 'Local and cloud LLM integrations with Ollama, Groq, Claude API, and support workflows.',
      },
      {
        title: 'Full-Stack Software Engineering',
        description: 'APIs and data-backed applications with FastAPI, Laravel, NestJS, React, Flutter, Docker, and CI.',
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
    projects: Object.fromEntries(projects.map((project) => [project.id, {
      category: project.category, description: project.description,
      features: project.features, limitation: project.limitation,
    }])) as Record<ProjectId, ProjectCopy>,
    projectStatuses: {
      source: 'Implementation reviewed', local: 'Local prototype', staging: 'Public staging / demo',
      competition: 'Competition · Author-provided', academic: 'Academic · Author-provided',
    },
    projectGroups: { ai: 'AI, vision & edge systems', engineering: 'Full-stack & automation systems' },
    liveShowcase: {
      status: 'Public interfaces · Availability may vary',
      openProject: 'Open website',
      technologyLabel: 'Technology stack',
    },
    liveProjects: {
      'certchain-live': {
        category: 'Blockchain verification',
        description: 'Public frontend for certificate issuance and verification by ID, QR, or PDF. The implementation connects smart contracts, IPFS, and MongoDB.',
        previewTitle: 'Certificate verification',
        status: 'Public frontend',
        limitation: 'Wallet, API, IPFS, and on-chain transactions have not been tested end to end in this audit.',
      },
      'phuong-nam-restaurant-live': {
        category: 'OneMekong · Restaurant website',
        description: 'Responsive restaurant presentation with bilingual content, motion, and Cloudinary media. Visitors discover the menu and reach a telephone reservation path.',
        previewTitle: 'Phương Nam',
        previewHint: 'Southern cuisine · Can Tho',
        status: 'Public website',
        limitation: 'This landing page does not establish an integrated booking backend or completed reservation.',
      },
      'nlp-academic-search-live': {
        category: 'NLP / RAG application',
        description: 'Streamlit entry point for hybrid academic retrieval and citation-based answers, backed by a separate FastAPI service.',
        previewTitle: 'Grounded answer',
        previewHint: 'academic retrieval',
        status: 'Public demo · Sleeping at audit',
        limitation: 'Hosting may sleep; retrieval, generation, and verification depend on backend and provider readiness.',
      },
      'farta-market-live': {
        category: 'Full-stack commerce / Grounded AI',
        description: 'React storefront with catalog, cart, and account workflows backed by Laravel. A separate Admin manages commerce data; AI assistance uses database-backed product facts.',
        previewTitle: 'Farta Market',
        previewHint: 'Storefront · API · Administration',
        status: 'Public staging / demo',
        limitation: 'Cloudflare Pages + Northflank, as documented in the repositories. SePay configuration and end-to-end payment readiness remain unverified.',
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
      liveProjectsLabel: 'Explore deployed interfaces',
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
      admin: 'Source Admin',
    },
    brandSubtitle: 'AI & Software Engineer',
    hero: {
      badge: 'Kỹ sư Khoa học Máy tính',
      headline: 'AI ứng dụng, được xây dựng cho bài toán thực tế.',
      title: 'AI Engineer | Software Engineer',
      description:
        'Kỹ sư AI và phần mềm, kết nối tìm kiếm và mô hình ngôn ngữ, thị giác máy tính trên thiết bị biên với ứng dụng full-stack.',
      focusLine: 'NLP/RAG · Computer Vision · Edge AI · Python · Laravel · React · Flutter',
      status: 'Sẵn sàng cho các vị trí AI & Software Engineering',
      dashboard: 'AI & Software Engineer',
      featuredProject: 'Dự án tiêu biểu',
      featuredSummary: 'Tìm kiếm học thuật hybrid và grounded Q&A với BM25, dense retrieval, RRF và kiểm chứng evidence.',
    },
    focusAreas: ['NLP / RAG', 'Computer Vision & Edge AI', 'Ứng dụng LLM', 'Full-Stack Engineering'],
    summary: [
      {
        title: 'Hệ thống NLP / RAG',
        description: 'Tìm kiếm kết hợp, trả lời dựa trên nguồn và kiểm tra bằng chứng',
      },
      {
        title: 'Computer Vision',
        description: 'Phân loại ảnh, nhận diện điểm mốc khuôn mặt và cảnh báo thiết bị với OpenCV, MediaPipe, MQTT',
      },
      {
        title: 'Phát triển full-stack',
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
        title: 'Khám phá các giao diện đã triển khai.',
        description: 'Các địa chỉ public với phạm vi rõ ràng: giao diện hiển thị không đồng nghĩa backend, thanh toán hay mô hình đã sẵn sàng.',
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
        title: 'Computer Vision & Edge AI',
        description: 'Phân loại ảnh và xử lý điểm mốc khuôn mặt, kết nối Raspberry Pi, cảnh báo ESP32 và ứng dụng giám sát.',
      },
      {
        title: 'Ứng dụng LLM',
        description: 'Tích hợp LLM local/cloud với Ollama, Groq, Claude API và các support workflow.',
      },
      {
        title: 'Phát triển phần mềm full-stack',
        description: 'API và ứng dụng dựa trên dữ liệu với FastAPI, Laravel, NestJS, React, Flutter, Docker và CI.',
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
          bullets: [
            'Đóng góp các luồng Flutter cho xem thực đơn, đặt bàn và gọi món; phát triển giao diện React quản trị dữ liệu nhà hàng, thực đơn và đơn hàng.',
            'Tích hợp REST API, đồng bộ trạng thái đặt chỗ và xử lý lỗi đặt trùng trong luồng ứng dụng.',
            'Tham gia chuyển OTP từ Firebase sang eSMS và tự động cập nhật tỷ giá Vietcombank XML hằng ngày bằng cron.',
          ],
        },
        'tien-phong-ai-iot-intern': {
          role: 'Thực tập sinh kỹ thuật — Computer Vision, Edge AI & IoT',
          mode: 'Làm việc trực tiếp',
          bullets: [
            'Triển khai xử lý camera bằng OpenCV và MediaPipe Face Landmarker trên Raspberry Pi 4, sử dụng tín hiệu nhắm mắt, ngáp và tư thế đầu để nhận diện dấu hiệu buồn ngủ.',
            'Xử lý ưu tiên khung hình mới và firmware ESP32 bằng C++/PlatformIO; tích hợp heartbeat, kết nối lại MQTT cùng cảnh báo còi/LED.',
            'Kết nối Flutter với HTTP API giám sát và triển khai dịch vụ Linux systemd để khởi động, phục hồi hệ thống.',
          ],
        },
      },
    },
    projects: {
      'nlp-academic-search-rag-engine': {
        category: 'NLP / Information Retrieval / RAG',
        description: 'Xây dựng hệ thống tìm kiếm học thuật local-first và grounded Q&A, kết hợp BM25 với dense retrieval qua Reciprocal Rank Fusion và tùy chọn cross-encoder reranking.',
        features: [
          'Truy xuất: BM25 kết hợp dense embeddings, hợp nhất bằng RRF và tùy chọn cross-encoder reranking.',
          'Sinh câu trả lời kèm trích dẫn; bước kiểm chứng đối chiếu nhận định và đoạn trích với nguồn đã truy xuất.',
          'Kiểm tra tính nhất quán corpus/index, FastAPI SSE, Streamlit và các script đánh giá retrieval/RAG riêng biệt.',
        ],
        limitation: 'Truy xuất, sinh câu trả lời và kiểm chứng là ba năng lực riêng; khả năng truy cập bản public không chứng minh chất lượng câu trả lời.',
      },
      'drowsiness-edge-iot': {
        category: 'Computer Vision / Edge AI / IoT',
        description: 'Hệ thống giám sát tại thiết bị biên, chuyển tín hiệu buồn ngủ từ camera thành cảnh báo phần cứng và dữ liệu theo dõi trên điện thoại, có xử lý phục hồi kết nối giữa các thiết bị.',
        features: [
          'Camera → OpenCV → MediaPipe Face Landmarker: phân tích nhắm mắt, ngáp và tư thế đầu trên Raspberry Pi 4.',
          'Ưu tiên khung hình mới để hạn chế dữ liệu trễ; heartbeat và kết nối lại MQTT giúp theo dõi trạng thái thiết bị.',
          'Firmware ESP32 điều khiển còi/LED; Flutter đọc HTTP API giám sát và systemd quản lý các dịch vụ trên Linux.',
        ],
        limitation: 'Đã đối chiếu implementation; không công bố FPS, độ chính xác hay benchmark thiết bị chưa được đo.',
      },
      'auto-race-2024': {
        category: 'Computer Vision / Xe tự hành',
        description: 'Giải Ba Auto Race 2024 cùng đội Tracklab, ứng dụng học từ hình ảnh camera cho xe đua thực tế.',
        features: [
          'Thu thập khung hình camera và nhãn góc lái phục vụ huấn luyện/fine-tuning ResNet-18.',
          'Tham gia xử lý làn đường, biển báo trong bài thi và cải tiến qua các vòng thử nghiệm trên xe.',
        ],
        limitation: 'Thông tin cuộc thi do tác giả cung cấp; chưa đối chiếu training artifact hoặc hiệu năng trên đường đua.',
      },
      'yolov8-face-mask': {
        category: 'Computer Vision / Phát hiện đối tượng',
        description: 'Dự án học thuật phát hiện ba trạng thái: đeo khẩu trang đúng, đeo sai và không đeo khẩu trang.',
        features: [
          'Chuẩn bị ảnh, gán nhãn bounding box và tăng cường dữ liệu cho bài toán phát hiện ba lớp.',
          'Huấn luyện và đánh giá dự đoán YOLOv8 theo từng trạng thái sử dụng khẩu trang.',
        ],
        limitation: 'Thông tin dự án do tác giả cung cấp; không công bố kích thước dataset, mAP, precision hay recall khi chưa có training artifact.',
      },
      'ai-currency-recognition': {
        category: 'Computer Vision / Deep Learning',
        description: 'Prototype nhận diện tiền giấy chạy local, kết nối các thử nghiệm huấn luyện mô hình với dịch vụ suy luận FastAPI và giao diện tải ảnh React.',
        features: [
          'Có script thử nghiệm CNN baseline, MobileNetV2, EfficientNetB0 và EfficientNetV2B0.',
          'Ánh xạ nhãn API gồm tiền Ấn Độ, Mỹ và Việt Nam, kèm các nhãn nền.',
          'Script đánh giá xuất confusion matrix và classification report; không công bố xếp hạng mô hình hay độ chính xác chưa kiểm chứng.',
        ],
        limitation: 'Nhãn API là INR, USD và VND — không phải EUR. Cần kiểm tra runtime về tính tương thích model/label và chất lượng suy luận.',
      },
      'farta-market': {
        category: 'Phát triển full-stack / Grounded AI',
        description: 'Hệ thống thương mại điện tử gồm React storefront, cổng quản trị React riêng và Laravel API, tích hợp trợ lý AI dựa trên dữ liệu sản phẩm và ngữ cảnh mua sắm.',
        features: [
          'Storefront có danh mục, giỏ hàng, checkout, hồ sơ, đánh giá và lịch sử đơn; Admin riêng quản lý sản phẩm, đơn hàng, nội dung và analytics.',
          'Laravel quản lý phiên Sanctum, phân quyền, tồn kho, trạng thái đơn và thanh toán; checkout có idempotency và khóa tồn kho.',
          'AI đọc lại giá/tồn kho từ database, kiểm tra quyền xem đơn và đề xuất thay đổi giỏ hàng để người dùng xác nhận.',
          'Theo tài liệu triển khai: Storefront/Admin trên Cloudflare Pages, API trên Northflank; không trộn với kiến trúc farta-commerce riêng biệt.',
        ],
        limitation: 'Bản staging/demo public, chưa phải bản production hoàn chỉnh. Có code COD/SePay; cấu hình và thanh toán end-to-end chưa được xác minh trong đợt này.',
      },
      'auto-video-pipeline': {
        category: 'AI Content Automation',
        description: 'Pipeline tự host cho video ngắn tiếng Việt, điều phối viết kịch bản, tạo ảnh, lồng tiếng và dựng video qua n8n.',
        features: ['Tạo kịch bản, hình ảnh và giọng đọc tiếng Việt với Groq, Pollinations và Edge-TTS', 'Dựng video bằng FFmpeg qua n8n', 'Tích hợp TikTok Content Posting API tùy chọn, cần cấp quyền tài khoản và cấu hình'],
        limitation: 'Workflow local/self-hosted; đăng TikTok cần OAuth và cấu hình. Không khẳng định hệ thống production chạy tự động không giám sát.',
      },
      certchain: {
        category: 'Hệ thống xác thực chứng chỉ Blockchain',
        description: 'Hệ thống full-stack xác thực chứng chỉ bằng blockchain, hỗ trợ cấp, quản lý, thu hồi và xác thực qua Certificate ID, PDF upload và QR.',
        features: ['Xác thực qua Certificate ID, QR và PDF upload', 'Smart contract kết hợp IPFS và đồng bộ MongoDB', 'Quy trình quản trị để cấp, quản lý và thu hồi chứng chỉ'],
        limitation: 'Có frontend public; ký ví, API/IPFS và luồng cấp/thu hồi/xác thực on-chain cần kiểm thử end-to-end riêng.',
      },
    },
    projectStatuses: {
      source: 'Đã đối chiếu implementation', local: 'Prototype local', staging: 'Staging / Demo public',
      competition: 'Cuộc thi · Tác giả cung cấp', academic: 'Học thuật · Tác giả cung cấp',
    },
    projectGroups: { ai: 'Hệ thống AI, thị giác & thiết bị biên', engineering: 'Hệ thống full-stack & tự động hóa' },
    liveShowcase: {
      status: 'Giao diện public · Khả năng truy cập có thể thay đổi',
      openProject: 'Mở website',
      technologyLabel: 'Công nghệ sử dụng',
    },
    liveProjects: {
      'certchain-live': {
        category: 'Xác thực Blockchain',
        description: 'Frontend public cho cấp và kiểm tra chứng chỉ qua ID, QR hoặc PDF. Implementation kết nối smart contract, IPFS và MongoDB.',
        previewTitle: 'Xác thực chứng chỉ',
        status: 'Frontend public',
        limitation: 'Chưa kiểm thử end-to-end ví, API, IPFS và giao dịch on-chain trong đợt audit này.',
      },
      'phuong-nam-restaurant-live': {
        category: 'OneMekong · Website nhà hàng',
        description: 'Website nhà hàng responsive với nội dung song ngữ, animation và media Cloudinary. Khách xem thực đơn và chuyển tới đặt bàn qua điện thoại.',
        previewTitle: 'Phương Nam',
        previewHint: 'Ẩm thực Nam Bộ · Cần Thơ',
        status: 'Website public',
        limitation: 'Landing page này không chứng minh có backend đặt bàn tích hợp hoặc một lượt đặt bàn đã hoàn tất.',
      },
      'nlp-academic-search-live': {
        category: 'Ứng dụng NLP / RAG',
        description: 'Giao diện Streamlit cho tìm kiếm học thuật kết hợp và trả lời kèm trích dẫn, sử dụng dịch vụ FastAPI riêng.',
        previewTitle: 'Câu trả lời có căn cứ',
        previewHint: 'tìm kiếm học thuật',
        status: 'Demo public · Đang ngủ khi kiểm tra',
        limitation: 'Hosting có thể tạm ngủ; truy xuất, sinh câu trả lời và kiểm chứng phụ thuộc backend và provider.',
      },
      'farta-market-live': {
        category: 'Thương mại điện tử full-stack / Grounded AI',
        description: 'React storefront với danh mục, giỏ hàng và tài khoản, kết nối Laravel. Admin riêng quản lý dữ liệu thương mại; trợ lý AI sử dụng thông tin sản phẩm từ database.',
        previewTitle: 'Farta Market',
        previewHint: 'Storefront · API · Quản trị',
        status: 'Staging / Demo public',
        limitation: 'Cloudflare Pages + Northflank theo tài liệu repo. Chưa xác minh cấu hình SePay và khả năng thanh toán end-to-end.',
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
      'ai-olympic-2026': {
        title: 'Top 10 — AI Olympic 2026',
        date: '2026',
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
      liveProjectsLabel: 'Khám phá các giao diện đã triển khai',
      graduation: 'Tốt nghiệp tháng 08/2026',
    },
    footer: 'Portfolio AI ứng dụng và Software Engineering.',
  },
};
