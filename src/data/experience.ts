export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  mode?: string;
  tech?: string[];
  bullets: string[];
};

export const experiences: ExperienceItem[] = [
  {
    id: 'onemekong-software-engineer',
    company: 'Phuong Vinh Group — OneMekong Platform',
    role: 'Software Engineer (Full-Stack)',
    location: 'Can Tho, Vietnam',
    period: 'June 2026 – Present',
    tech: ['NestJS', 'MongoDB', 'Redis', 'Vite', 'Flutter'],
    bullets: [
      'Owned production features across food ordering and hotel booking, implementing backend and frontend flows for menu browsing, cart, order placement, room assignment, and restaurant administration.',
      'Built phone-number OTP verification and migrated the SMS provider from Firebase to eSMS after reliability issues.',
      'Contributed to an in-house booking and room-assignment workflow replacing a third-party POS dependency.',
    ],
  },
  {
    id: 'tien-phong-ai-iot-intern',
    company: 'Tien Phong Technology Engineering Co., Ltd.',
    role: 'Software Engineering Intern — AI Drowsiness Detection & IoT Monitoring',
    location: 'Can Tho, Vietnam',
    period: 'October 2025 – June 2026',
    mode: 'On-site',
    tech: ['React', 'MediaPipe', 'ESP32', 'Raspberry Pi', 'MQTT', 'Camera', 'Buzzer', 'Git/GitHub'],
    bullets: [
      'Built React UI components for a real-time AI drowsiness-detection system and supported MediaPipe-based computer-vision detection workflows.',
      'Contributed to IoT integration with ESP32, Raspberry Pi, MQTT, camera, and buzzer for real-time alerting.',
      'Supported testing and debugging through Git and GitHub workflows.',
    ],
  },
];
