export const personal = {
  name: 'Maradana Aravind Kumar',
  display: 'ARAVIND KUMAR',
  shortName: 'AK',
  role: 'AI ENGINEER',
  roles: ['AI ENGINEER', 'BUILDER', 'ARCHITECT'],
  tagline: 'ARCHITECTING THE FUTURE OF AI.',
  year: '2026',
};

export const education = {
  institution: 'R.V.R & J.C College of Engineering, Guntur',
  degree: 'B.Tech, Computer Science and Engineering (Data Science)',
  period: '2022 — 2026',
  cgpa: '8.6',
};

export const focusAreas = [
  'Large Language Models',
  'Agentic Workflows',
  'Intelligent Automation',
  'RAG',
  'Full-stack AI Products',
];

export const philosophy = [
  {
    title: 'IMPACT OVER HYPE',
    text: 'Solving real problems — from attendance automation to document extraction.',
  },
  {
    title: 'LEARN IN PUBLIC',
    text: 'Teaching clarifies thinking.',
  },
  {
    title: 'SHIP FAST.',
    text: 'Done is better than perfect.',
  },
];

export const aboutWords = ['BUILD.', 'LEARN.', 'SHIP.'];

export const experience = [
  {
    id: '01',
    role: 'AI ENGINEER',
    company: 'NimbleBiz AI',
    period: 'Mar 2026 — Aug 2026',
    summary: 'Production GenAI solutions including Voice AI Agents and Noah AI.',
    highlights: [
      'Built and integrated LLM-powered voice agents',
      'Prompt engineering, agent workflows, conversation flows',
      'APIs, webhooks, telephony, call routing, backend services',
      'Designed reliable voice-agent call flows, fallbacks and system integrations',
      'AI-driven application analysis and deployment decisions',
      'Infrastructure configuration and deployment automation',
    ],
    keywords: ['Voice AI Agents', 'Noah AI', 'LLM', 'Telephony', 'Deployment'],
  },
  {
    id: '02',
    role: 'AI INTERN',
    company: '4Sight AI',
    period: 'May 2025 — Jul 2025',
    summary: 'GenAI applications and agentic AI systems for enterprise.',
    highlights: [
      'LLMs and prompt engineering',
      'GenAI applications',
      'Agentic AI systems',
      'Enterprise AI',
      'Real-world AI implementation',
    ],
    keywords: ['LLMs', 'Prompt Engineering', 'GenAI', 'Agentic Systems', 'Enterprise AI'],
  },
];

export const projects = [
  {
    id: '01',
    title: 'Face Recognition Attendance System',
    short: 'FACE RECOGNITION',
    category: 'IDENTITY SYSTEM',
    description:
      'Real-time attendance system using DeepFace and FaceNet with cosine similarity matching, powered by OpenCV and Python with a SQLite backend.',
    tech: ['DeepFace', 'FaceNet', 'Cosine Similarity', 'OpenCV', 'Python', 'SQLite'],
    links: {
      github: 'https://github.com/Aravind56565657/Face_attendace_system',
    },
    flow: ['FACE', 'LANDMARKS', 'MATCH', 'ATTENDANCE'],
  },
  {
    id: '02',
    title: 'Noah AI',
    short: 'NOAH AI',
    category: 'DEPLOYMENT ORCHESTRATION',
    description:
      'GenAI-powered orchestration layer over existing deployment platforms that uses AI agents to analyze applications, make deployment decisions, configure infrastructure and automate end-to-end deployments.',
    tech: ['GenAI', 'AI Agents', 'Deployment Automation', 'Infrastructure', 'Orchestration'],
    links: {
      live: 'https://noah-ai.noahops.com/',
    },
    flow: ['APPLICATION', 'AI ANALYSIS', 'DECISION', 'CONFIGURE', 'DEPLOY'],
  },
  {
    id: '03',
    title: 'Doc to Data',
    short: 'DOC TO DATA',
    category: 'DOCUMENT INTELLIGENCE',
    description:
      'OCR-driven intelligent parser combining Tesseract and custom AI logic to extract names, dates and key fields from PDFs/images while handling diverse document layouts.',
    tech: ['OCR', 'Tesseract', 'AI', 'Python'],
    links: {
      github: 'https://github.com/Aravind56565657/Doc-to-Data',
    },
    flow: ['DOCUMENT', 'OCR', 'EXTRACT', 'FIELDS', 'STRUCTURED DATA'],
  },
  {
    id: '04',
    title: 'Email-to-Telegram Notifier',
    short: 'EMAIL → TELEGRAM',
    category: 'AI NOTIFICATION PIPELINE',
    description:
      'AI-powered email monitoring workflow using Gmail API and Google Gemini to classify, summarize and prioritize incoming messages, delivering real-time alerts through Telegram.',
    tech: ['Gmail API', 'Google Gemini', 'Telegram', 'NLP', 'Automation'],
    links: {
      github: 'https://github.com/Aravind56565657/Email-to-Telegram-Notifier',
    },
    flow: ['GMAIL', 'GEMINI', 'CLASSIFY', 'SUMMARIZE', 'TELEGRAM'],
  },
];

export const skills = [
  {
    group: 'AI',
    items: [
      { name: 'LLMs', desc: 'Large Language Models for generation and reasoning' },
      { name: 'Generative AI', desc: 'Building production GenAI applications' },
      { name: 'AI Agents', desc: 'Agentic workflows and autonomous systems' },
      { name: 'NLP', desc: 'Natural language processing and understanding' },
      { name: 'Deep Learning', desc: 'Neural networks and representation learning' },
      { name: 'RAG', desc: 'Retrieval-augmented generation pipelines' },
    ],
  },
  {
    group: 'PROGRAMMING',
    items: [
      { name: 'Python', desc: 'Primary language for AI and backend systems' },
      { name: 'C', desc: 'Systems programming and fundamentals' },
      { name: 'Java', desc: 'Object-oriented application development' },
    ],
  },
  {
    group: 'WEB',
    items: [
      { name: 'React', desc: 'Component-driven frontend architecture' },
      { name: 'JavaScript', desc: 'Interactive client-side engineering' },
      { name: 'HTML', desc: 'Semantic document structure' },
      { name: 'CSS', desc: 'Styling and responsive design' },
    ],
  },
  {
    group: 'DATA',
    items: [
      { name: 'SQL', desc: 'Relational database querying and design' },
      { name: 'MongoDB', desc: 'Document-oriented NoSQL databases' },
    ],
  },
  {
    group: 'TOOLS',
    items: [
      { name: 'Git', desc: 'Version control and collaboration' },
      { name: 'Docker', desc: 'Containerization for reproducible deployments' },
      { name: 'AWS', desc: 'Cloud infrastructure and services' },
      { name: 'Linux', desc: 'Server environments and scripting' },
      { name: 'Tableau', desc: 'Data visualization and analytics' },
      { name: 'Power BI', desc: 'Business intelligence dashboards' },
    ],
  },
];

export const certifications = [
  {
    title: 'The Joy of Computing using Python',
    issuer: 'IIT Ropar',
    source: 'NPTEL',
    year: '2025',
  },
  {
    title: 'Data Science for Engineers',
    issuer: 'IIT Madras',
    source: 'NPTEL',
    year: '2024',
  },
  {
    title: 'Programming, Data Structures and Algorithms',
    issuer: 'IIT Kharagpur',
    source: 'NPTEL',
    year: '2024',
  },
];

export const achievement = {
  title: 'Best Idea Award',
  project: 'Smart Irrigation System',
};

export const leadership = [
  {
    role: 'Student Coordinator',
    org: 'College Fests & Cultural Events',
    desc: 'Organized college fests and cultural events.',
  },
  {
    role: 'Member',
    org: 'Student Integrated Committee',
    desc: 'Contributed to student welfare initiatives and campus activities.',
  },
];

export const contact = {
  email: 'aravindkumar23567@gmail.com',
  github: 'https://github.com/Aravind56565657',
  githubLabel: 'GitHub',
  linkedin: 'https://www.linkedin.com/in/aravind-kumar-maradana-209061290/',
  linkedinLabel: 'LinkedIn',
  phone: '+91 9515574466',
};

export const chapters = [
  { id: '00', title: 'THE ARRIVAL', label: 'HERO' },
  { id: '01', title: 'THE PATH', label: 'ABOUT' },
  { id: '02', title: 'THE BATTLEFIELD', label: 'EXPERIENCE' },
  { id: '03', title: 'THE FORGE', label: 'WORK' },
  { id: '04', title: 'THE ARSENAL', label: 'SKILLS' },
  { id: '05', title: 'THE RECORD', label: 'RECORD' },
  { id: '06', title: 'THE NEXT HORIZON', label: 'CONTACT' },
];

export const navItems = [
  { label: 'ABOUT', chapter: 1 },
  { label: 'EXPERIENCE', chapter: 2 },
  { label: 'WORK', chapter: 3 },
  { label: 'SKILLS', chapter: 4 },
  { label: 'CONTACT', chapter: 6 },
];
