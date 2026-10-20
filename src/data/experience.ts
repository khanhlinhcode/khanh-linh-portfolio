export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
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
    tech: ['NestJS', 'MongoDB', 'Redis', 'Vite', 'Flutter'],
    bullets: [
      'Contributed Flutter restaurant flows for menus, table reservations, and food ordering, alongside React administration for restaurant data, menus, and incoming orders.',
      'Integrated REST APIs, synchronized booking state, and addressed duplicate-booking issues across the application workflow.',
      'Contributed to the Firebase-to-eSMS OTP migration and scheduled daily Vietcombank XML exchange-rate updates.',
    ],
  },
  {
    id: 'tien-phong-ai-iot-intern',
    company: 'Tien Phong Technology Engineering Co., Ltd.',
    role: 'Engineering Intern — Computer Vision, Edge AI & IoT',
    location: 'Can Tho, Vietnam',
    mode: 'On-site',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Raspberry Pi 4', 'ESP32', 'C++', 'PlatformIO', 'MQTT', 'Flutter', 'systemd'],
    bullets: [
      'Implemented camera processing with OpenCV and MediaPipe Face Landmarker on Raspberry Pi 4, using eye closure, yawning, and head pose as drowsiness indicators.',
      'Worked on latest-frame processing and ESP32 C++/PlatformIO firmware, integrating MQTT heartbeat/reconnect behavior and buzzer/LED alerts.',
      'Integrated Flutter monitoring with HTTP APIs and Linux systemd services for device startup and recovery.',
    ],
  },
];
