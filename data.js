/**
 * TECH JAGANNATH – Enterprise Central Data Layer
 * Fully normalized, data-driven structures for products, services, tech stack,
 * team, gallery, testimonials, case studies, channels, careers, and FAQs.
 */

// ─── CENTRAL COMPANY CONTACT CONFIGURATION ───────────────────────────
const COMPANY_CONTACT = {
  email: "info@techjagannath.com",
  phone: "+918884047775",
  displayPhone: "+91 88840 47775",
  whatsapp: "918884047775",
  whatsappText: "Hello Jagannath Tech Solutions, I would like to know more about your services.",
  emailSubject: "Website Inquiry - Jagannath Tech Solutions",
  address: "Jagannath Tech Solutions Corporate Hub, Solapur Road, Vijayapura, Karnataka 586103, India",
  websiteUrl: "https://techjagannath.com"
};

function getWhatsAppUrl(customText) {
  const msg = customText || COMPANY_CONTACT.whatsappText;
  return `https://wa.me/${COMPANY_CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
}

function getMailtoUrl(customSubject) {
  const subj = customSubject || COMPANY_CONTACT.emailSubject;
  return `mailto:${COMPANY_CONTACT.email}?subject=${encodeURIComponent(subj)}`;
}

function getTelUrl() {
  return `tel:${COMPANY_CONTACT.phone}`;
}

const TechJagannathData = {
  // ─── 0. HERO INTERACTIVE SLIDES ──────────────────────────────────
  heroSlides: [
    {
      id: "hero-1",
      badge: "Enterprise AI & Cloud SaaS",
      title: "Architecting Intelligent Systems For Global Impact",
      subtitle: "We engineer proprietary LLM pipelines, intelligent enterprise SaaS platforms (TapAxe, ExamCraft), and resilient cloud architectures that empower institutions and forward-thinking enterprises globally.",
      metrics: [
        { val: "< 24ms", lbl: "Inference Latency" },
        { val: "99.99%", lbl: "Uptime SLA" },
        { val: "SOC-2", lbl: "Enterprise Ready" }
      ],
      primaryCta: "Explore Flagship Products",
      primaryHref: "#products",
      secondaryCta: "Book Consultation",
      tag: "AI Architecture"
    },
    {
      id: "hero-2",
      badge: "Flagship Campus SaaS",
      title: "TapAxe: Intelligent Smart Attendance & Campus Telemetry OS",
      subtitle: "Multi-modal AI facial biometrics, high-speed RFID/NFC edge hardware terminals, and real-time WhatsApp parent alerts deployed across 80+ educational institutions.",
      metrics: [
        { val: "< 0.4s", lbl: "Verification Speed" },
        { val: "99.98%", lbl: "Accuracy SLA" },
        { val: "1.2M+", lbl: "Daily Check-Ins" }
      ],
      primaryCta: "Schedule TapAxe Demo",
      primaryHref: "#products",
      secondaryCta: "View Case Study",
      tag: "TapAxe Platform"
    },
    {
      id: "hero-3",
      badge: "Generative AI Assessment Studio",
      title: "ExamCraft: AI-Powered Question Paper & Exam Studio",
      subtitle: "Autonomous question authoring mapped directly to curriculum standards and Bloom's taxonomy with automated LaTeX, PDF exports, and anti-plagiarism balancing.",
      metrics: [
        { val: "< 90s", lbl: "Paper Generation" },
        { val: "100%", lbl: "Curriculum Match" },
        { val: "3.5M+", lbl: "Questions Authored" }
      ],
      primaryCta: "Explore ExamCraft Studio",
      primaryHref: "#products",
      secondaryCta: "Request Trial",
      tag: "ExamCraft Studio"
    }
  ],

  // ─── 1. INSTITUTIONAL & CLIENT PARTNERS ──────────────────────────
  partners: [
    { name: "Karnataka State University", type: "Higher Education", tag: "Enterprise Client", icon: "🏛️" },
    { name: "BLDEA Engineering Consortium", type: "Colleges Network", tag: "40+ Campuses", icon: "🎓" },
    { name: "Apex Global Technology", type: "FinTech Enterprise", tag: "AI RAG Client", icon: "🏢" },
    { name: "Vidyavardhaka Academic Trust", type: "Academic Group", tag: "ExamCraft Partner", icon: "📚" },
    { name: "Zenith Cloud Systems", type: "Cloud Infrastructure", tag: "Tech Partner", icon: "☁️" },
    { name: "Nexis IoT Solutions", type: "Smart Hardware", tag: "Hardware Partner", icon: "📡" },
    { name: "Sahyadri Global EdTech", type: "Colleges Network", tag: "TapAxe Deployed", icon: "🏫" },
    { name: "Indo-Euro Digital Labs", type: "Software Lab", tag: "R&D Alliance", icon: "🔬" },
    { name: "KLE Technological University", type: "Research Partner", tag: "AI Research", icon: "🔬" },
    { name: "Alliance Global Ventures", type: "Enterprise SaaS", tag: "Cloud Client", icon: "🌐" }
  ],

  // ─── 2. TECHNOLOGIES (GROUPED WITH CRISP SVG LOGOS) ──────────────
  techStack: [
    // Frontend
    {
      name: "React",
      category: "Frontend",
      color: "#61DAFB",
      description: "Declarative component-driven UI architecture",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="11" fill="#61DAFB"/><ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" stroke-width="4.5"/><ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="48" ry="18" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(120 64 64)"/></svg>`
    },
    {
      name: "Next.js",
      category: "Frontend",
      color: "#000000",
      description: "Server-side rendered enterprise React framework",
      svg: `<svg viewBox="0 0 180 180" class="tech-svg" width="24" height="24"><circle cx="90" cy="90" r="90" fill="#0F172A"/><path d="M149.5 163.5L66 56H54v68h12V73.5l73.5 95.5c3.5-1.8 7-3.6 10-5.5z" fill="#FFF"/><path d="M116 56h12v46.5l-12-15.5z" fill="#FFF"/></svg>`
    },
    {
      name: "TypeScript",
      category: "Frontend",
      color: "#3178C6",
      description: "Type-safe robust enterprise JavaScript",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="16" fill="#3178C6"/><path d="M72 88.5c0 8.5 5.5 14 14.5 14 6 0 10.5-2.5 13.5-6.5l8 6.5c-5 6-12 9.5-22 9.5-15 0-25-9.5-25-24 0-14 10-24 25-24 16 0 24 10.5 24 23.5v3H72v-2zm21-8c-.5-6-4.5-10-10-10s-9.5 4-10 10h20zM30 46h42v10H56v49H44V56H30V46z" fill="#FFF"/></svg>`
    },
    {
      name: "JavaScript",
      category: "Frontend",
      color: "#F7DF1E",
      description: "Modern ES6+ high-performance client scripting",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="16" fill="#F7DF1E"/><path d="M30 100c4 3 10 5 18 5 14 0 20-7 20-18V40H52v47c0 6-3 9-8 9-4 0-7-2-9-4l-5 8zm44-3c6 4 15 7 24 7 14 0 22-7 22-17 0-10-7-15-18-20-8-4-12-7-12-12s4-8 10-8c5 0 9 2 12 4l4-8c-4-3-10-5-17-5-13 0-21 8-21 17 0 9 7 15 17 19 9 4 13 8 13 13s-4 9-11 9c-6 0-12-3-16-6l-5 8z" fill="#000"/></svg>`
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      color: "#06B6D4",
      description: "Utility-first design system styling framework",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="60" fill="#0F172A"/><path d="M64 42c-12 0-18 6-18 18 6-6 12-6 18 0 6 6 12 6 18 0-6 6-12 6-18 0zm-18 18c-12 0-18 6-18 18 6-6 12-6 18 0 6 6 12 6 18 0-6 6-12 6-18 0z" fill="#06B6D4"/></svg>`
    },

    // Backend
    {
      name: "Node.js",
      category: "Backend",
      color: "#5FA04E",
      description: "Event-driven asynchronous microservices engine",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M64 8l54 31.2v62.4L64 122.8 10 101.6V39.2L64 8z" fill="#5FA04E"/><path d="M64 18.5L19.5 44.2v51.4L64 112.3l44.5-25.7V44.2L64 18.5z" fill="#FFF"/><path d="M64 26l37.8 21.8v43.6L64 113.2 26.2 91.4V47.8L64 26z" fill="#5FA04E"/><path d="M64 45c-10.5 0-19 8.5-19 19s8.5 19 19 19 19-8.5 19-19-8.5-19-19-19zm0 28c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" fill="#FFF"/></svg>`
    },
    {
      name: "NestJS",
      category: "Backend",
      color: "#E0234E",
      description: "Structured progressive Node.js framework",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M117 48L64 6 11 48l20 68 33 12 33-12 20-68z" fill="#E0234E"/><path d="M64 20L25 51l15 51 24 9 24-9 15-51L64 20z" fill="#FFF"/></svg>`
    },
    {
      name: "Python",
      category: "Backend",
      color: "#3776AB",
      description: "AI pipelines, data engineering & analytics",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M63.5 8c-28 0-26.3 12.1-26.3 12.1l.1 12.5h26.9v3.8H26.3S8 34.3 8 62.9c0 28.5 16 27.5 16 27.5h9.5V77.1s-.5-15.9 15.6-15.9h26.8s15.1-.2 15.1-14.8V23.5S93 8 63.5 8zm-14.7 8.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4z" fill="#3776AB"/><path d="M64.5 120c28 0 26.3-12.1 26.3-12.1l-.1-12.5H63.8v-3.8h37.9s18.3 2.1 18.3-26.5c0-28.5-16-27.5-16-27.5h-9.5v13.3s.5 15.9-15.6 15.9H42.1s-15.1.2-15.1 14.8v23.9s-2 15.5 27.5 15.5zm14.7-8.3a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4z" fill="#FFD43B"/></svg>`
    },
    {
      name: "FastAPI",
      category: "Backend",
      color: "#009688",
      description: "High-performance asynchronous Python API framework",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="60" fill="#009688"/><path d="M68 20L32 72h28l-8 36 36-52H60l8-36z" fill="#FFF"/></svg>`
    },
    {
      name: "Django",
      category: "Backend",
      color: "#092E20",
      description: "Batteries-included secure web framework",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="16" fill="#092E20"/><path d="M56 24h16v48c0 14-6 22-18 22-4 0-8-1-11-2l3-12c2 1 4 1 6 1 6 0 9-4 9-11V24zm-22 36h14v13c-2-1-5-2-8-2-6 0-9 4-9 11 0 8 3 11 8 11 3 0 6-1 8-2v13c-3 1-8 2-13 2-13 0-20-8-20-22 0-14 8-24 20-24z" fill="#FFF"/></svg>`
    },
    {
      name: "Go",
      category: "Backend",
      color: "#00ADD8",
      description: "Ultra low-latency concurrent system services",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="60" fill="#00ADD8"/><ellipse cx="46" cy="52" rx="10" ry="14" fill="#FFF"/><ellipse cx="82" cy="52" rx="10" ry="14" fill="#FFF"/><circle cx="48" cy="52" r="5" fill="#0F172A"/><circle cx="84" cy="52" r="5" fill="#0F172A"/></svg>`
    },

    // Database
    {
      name: "PostgreSQL",
      category: "Database",
      color: "#336791",
      description: "ACID-compliant relational database with pgvector",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="56" fill="#336791"/><ellipse cx="50" cy="50" rx="6" ry="6" fill="#FFF"/><ellipse cx="78" cy="50" rx="6" ry="6" fill="#FFF"/><path d="M44 76c6 8 13 12 20 12s14-4 20-12H44z" fill="#FFF"/></svg>`
    },
    {
      name: "MongoDB",
      category: "Database",
      color: "#47A248",
      description: "Scalable document database for flexible schemas",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M64 6C62 8 40 40 40 70c0 24 16 38 24 46 8-8 24-22 24-46 0-30-22-62-24-64z" fill="#47A248"/><path d="M64 6v110c8-8 24-22 24-46 0-30-22-62-24-64z" fill="#499D4A"/></svg>`
    },
    {
      name: "Redis",
      category: "Database",
      color: "#DC382D",
      description: "In-memory caching and real-time pub/sub broker",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M8 44l56-28 56 28-56 28L8 44z" fill="#D82C20"/><path d="M8 44v40l56 28V84L8 44z" fill="#A3241A"/><path d="M120 44v40l-56 28V84l56-40z" fill="#C62828"/><circle cx="64" cy="44" r="8" fill="#FFF" opacity="0.8"/></svg>`
    },
    {
      name: "Pinecone",
      category: "Database",
      color: "#000000",
      description: "Managed vector search for AI semantic retrieval",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="20" fill="#2563EB"/><path d="M64 20L32 40v48l32 20 32-20V40L64 20zm0 18l20 12-20 12-20-12 20-12z" fill="#FFF"/></svg>`
    },

    // Cloud
    {
      name: "AWS",
      category: "Cloud",
      color: "#FF9900",
      description: "Amazon Web Services scalable cloud infrastructure",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M38 58c-4 0-8 2-9 6l-1 2h10c0-2 2-3 4-3 3 0 5 1 5 4v2c-8 1-16 4-16 11 0 6 5 10 11 10 5 0 8-2 10-5v4h10V68c0-7-5-10-14-10zm-1 25c-3 0-5-2-5-5 0-4 3-5 7-6 2 0 4 0 5 1-1 6-4 10-7 10zm33-25h-9l-9 32h10l2-8h9l2 8h10l-15-32zm-5 17l3-10 3 10h-6zm41-17h-10l-6 22-6-22h-10l10 32h11l11-32z" fill="#232F3E"/><path d="M22 104c26 14 62 14 84-4 2-1 3 0 2 2-24 18-64 18-88 4-2-1 0-3 2-2z" fill="#FF9900"/></svg>`
    },
    {
      name: "Azure",
      category: "Cloud",
      color: "#0089D6",
      description: "Microsoft Azure enterprise cloud solutions",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M32 16L12 80h34L64 16H32z" fill="#0089D6"/><path d="M64 16l-18 64 36 32h34L64 16z" fill="#0078D4"/><path d="M82 112L46 80h36l26 32H82z" fill="#50E6FF"/></svg>`
    },
    {
      name: "Google Cloud",
      category: "Cloud",
      color: "#4285F4",
      description: "GCP AI platform, BigQuery and global network",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M64 30a28 28 0 0 0-26 18H24a20 20 0 0 0 0 40h64a22 22 0 0 0 4-43.6A28 28 0 0 0 64 30z" fill="#4285F4"/><path d="M38 48a28 28 0 0 1 48-12 28 28 0 0 1 6 8" stroke="#EA4335" stroke-width="6" fill="none"/></svg>`
    },

    // AI & ML
    {
      name: "OpenAI",
      category: "AI & ML",
      color: "#10A37F",
      description: "GPT-4o, embeddings & multi-modal AI APIs",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M110.6 54.4a31.3 31.3 0 0 0-2.4-23.7 32 32 0 0 0-31-16.7 32 32 0 0 0-23.3 10.3 32 32 0 0 0-20.9 15.2 32 32 0 0 0 4.1 33.7 31.3 31.3 0 0 0 2.4 23.7 32 32 0 0 0 31 16.7 32 32 0 0 0 23.3-10.3 32 32 0 0 0 20.9-15.2 32 32 0 0 0-4.1-33.7z" fill="none" stroke="#10A37F" stroke-width="8" stroke-linejoin="round"/><path d="M64 45v38M45 54l38 20M45 74l38-20" stroke="#10A37F" stroke-width="8" stroke-linecap="round"/></svg>`
    },
    {
      name: "LangChain",
      category: "AI & ML",
      color: "#00A67E",
      description: "Autonomous LLM orchestrator & RAG framework",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="20" fill="#0F172A"/><circle cx="44" cy="64" r="16" fill="#10B981"/><circle cx="84" cy="64" r="16" fill="#38BDF8"/><path d="M44 64h40" stroke="#FFF" stroke-width="8" stroke-linecap="round"/></svg>`
    },
    {
      name: "PyTorch",
      category: "AI & ML",
      color: "#EE4C2C",
      description: "Deep learning neural network model training",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M72 16a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm-8 20a40 40 0 1 0 40 40 40 40 0 0 0-40-40zm0 70a30 30 0 1 1 30-30 30 30 0 0 1-30 30z" fill="#EE4C2C"/><path d="M76 46l-14 14 14 14" stroke="#EE4C2C" stroke-width="6" fill="none"/></svg>`
    },
    {
      name: "TensorFlow",
      category: "AI & ML",
      color: "#FF6F00",
      description: "Production machine learning deployment engine",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M64 8l48 28v56l-20 12V64L64 48v-8l28-16L64 8z" fill="#FF6F00"/><path d="M64 8L16 36v56l20 12V64l28-16v-8L36 24 64 8z" fill="#FFA000"/><path d="M64 48l28 16v40l-28 16-28-16V64l28-16z" fill="#FF6F00"/></svg>`
    },

    // Mobile
    {
      name: "Flutter",
      category: "Mobile",
      color: "#02569B",
      description: "High performance 60fps cross-platform mobile apps",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M78 8L22 64l18 18L96 26H78z" fill="#02569B"/><path d="M78 120L44 86l18-18 52 52H78z" fill="#0175C2"/><path d="M44 86l18-18 18 18-18 18-18-18z" fill="#13B9FD"/></svg>`
    },
    {
      name: "React Native",
      category: "Mobile",
      color: "#61DAFB",
      description: "Native mobile user experience powered by React",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="12" fill="#61DAFB"/><ellipse cx="64" cy="64" rx="46" ry="16" fill="none" stroke="#61DAFB" stroke-width="4.5"/><ellipse cx="64" cy="64" rx="46" ry="16" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(60 64 64)"/><ellipse cx="64" cy="64" rx="46" ry="16" fill="none" stroke="#61DAFB" stroke-width="4.5" transform="rotate(120 64 64)"/></svg>`
    },
    {
      name: "Android / Kotlin",
      category: "Mobile",
      color: "#3DDC84",
      description: "Native Android hardware and biometric integrations",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M38 52a26 26 0 0 1 52 0H38z" fill="#3DDC84"/><circle cx="48" cy="42" r="3" fill="#FFF"/><circle cx="80" cy="42" r="3" fill="#FFF"/><path d="M34 26l8 12M94 26l-8 12" stroke="#3DDC84" stroke-width="4" stroke-linecap="round"/><rect x="38" y="58" width="52" height="42" rx="6" fill="#3DDC84"/></svg>`
    },

    // DevOps
    {
      name: "Docker",
      category: "DevOps",
      color: "#2496ED",
      description: "Standardized lightweight containerization",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M120 54c-2-1-8-2-12 1-1-6-6-11-13-13l-4 3c-1 5 1 10 3 13-4 3-12 3-18 1V46H62v14H50V46H38v14H26V46H14v28c0 18 14 32 32 32h40c22 0 38-16 38-38 0-6-1-11-4-14z" fill="#2496ED"/><rect x="38" y="32" width="10" height="10" rx="1" fill="#2496ED"/><rect x="50" y="32" width="10" height="10" rx="1" fill="#2496ED"/><rect x="62" y="32" width="10" height="10" rx="1" fill="#2496ED"/></svg>`
    },
    {
      name: "Kubernetes",
      category: "DevOps",
      color: "#326CE5",
      description: "Automated multi-region container orchestration",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><circle cx="64" cy="64" r="60" fill="#326CE5"/><polygon points="64 24 98 44 98 84 64 104 30 84 30 44" fill="none" stroke="#FFF" stroke-width="6"/><circle cx="64" cy="64" r="14" fill="#FFF"/></svg>`
    },
    {
      name: "GitHub Actions",
      category: "DevOps",
      color: "#2088FF",
      description: "Automated zero-downtime CI/CD workflows",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><rect width="128" height="128" rx="16" fill="#0F172A"/><circle cx="44" cy="64" r="12" fill="#2088FF"/><circle cx="84" cy="40" r="12" fill="#2088FF"/><circle cx="84" cy="88" r="12" fill="#2088FF"/><path d="M44 64l40-24M44 64l40 24" stroke="#FFF" stroke-width="6"/></svg>`
    },
    {
      name: "Git",
      category: "DevOps",
      color: "#F05032",
      description: "Distributed version control & branch integrity",
      svg: `<svg viewBox="0 0 128 128" class="tech-svg" width="24" height="24"><path d="M123 57L71 5a10 10 0 0 0-14 0L5 57a10 10 0 0 0 0 14l52 52a10 10 0 0 0 14 0l52-52a10 10 0 0 0 0-14z" fill="#F05032"/><circle cx="44" cy="64" r="8" fill="#FFF"/><circle cx="84" cy="44" r="8" fill="#FFF"/><circle cx="84" cy="84" r="8" fill="#FFF"/><path d="M44 64h24l16-20m-16 20l16 20" stroke="#FFF" stroke-width="6" fill="none"/></svg>`
    }
  ],

  // ─── 3. ACHIEVEMENTS STATS ───────────────────────────────────────
  achievements: [
    { target: 80, suffix: "+", label: "Educational Institutions", subtext: "Active Universities, Colleges, and School Networks" },
    { target: 120000, suffix: "+", label: "Daily Active Users", subtext: "Students, Faculty, and Corporate Staff Logged Daily" },
    { target: 99.99, decimal: 2, suffix: "%", label: "System Reliability SLA", subtext: "High Availability with Distributed Cloud Mesh" },
    { target: 4.8, decimal: 1, suffix: "★", label: "Client Satisfaction", subtext: "Verified Feedback Across Enterprise Implementations" },
    { target: 24, suffix: "ms", label: "Average Response Time", subtext: "Ultra-low Latency Neural Vector Retrieval" },
    { target: 100, suffix: "%", label: "Data Sovereignty", subtext: "DPDP & SOC-2 Compliant Cloud Architecture" }
  ],

  // ─── 4. FLAGSHIP PRODUCTS ────────────────────────────────────────
  products: [
    {
      id: "tapaxe",
      badge: "Flagship SaaS",
      category: "Campus AI OS",
      name: "TapAxe",
      tagline: "Intelligent Smart Attendance & Campus Telemetry OS",
      image: "assets/tapaxe-logo.png",
      description: "Proprietary campus management operating system integrating multi-modal AI facial biometrics, high-speed RFID/NFC hardware terminals, and real-time WhatsApp parent alerts.",
      highlights: [
        "Multi-Modal Face Recognition & Edge RFID Terminals",
        "Automated WhatsApp & SMS Gateway for Instant Parent Alerts",
        "Custom ERP Integrations with Real-Time Analytics Dashboard",
        "Offline-First Edge Terminal Sync with Auto-Conflict Resolution"
      ],
      stats: [
        { label: "Recognition Speed", value: "< 0.4s" },
        { label: "Accuracy Rate", value: "99.98%" },
        { label: "Daily Check-Ins", value: "1.2M+" }
      ],
      cta: "Schedule TapAxe Demo"
    },
    {
      id: "examcraft",
      badge: "AI Studio",
      category: "AI Assessment Studio",
      name: "ExamCraft",
      tagline: "AI-Powered Examination & Question Paper Generation Studio",
      image: "assets/gallery/ai_hackathon.jpg",
      description: "Generative AI assessment platform designed for educators and universities to automatically author syllabus-aligned question papers, manage secure rubrics, and process grade telemetry.",
      highlights: [
        "Autonomous Question Generation via Bloom's Taxonomy",
        "Multi-Format Export: Printable LaTeX, PDF, and LMS Formats",
        "Integrated Anti-Plagiarism & Difficulty Balancing AI",
        "Instant Automated Grading & Class Performance Analytics"
      ],
      stats: [
        { label: "Paper Creation Time", value: "< 90s" },
        { label: "Curriculum Match", value: "100%" },
        { label: "Questions Authored", value: "3.5M+" }
      ],
      cta: "Explore ExamCraft Studio"
    },
    {
      id: "ai-agents",
      badge: "Enterprise AI",
      category: "Autonomous Systems",
      name: "Enterprise AI & RAG Solutions",
      tagline: "Custom Autonomous Agents & Vector Intelligence Pipelines",
      image: "assets/gallery/keynote_summit.jpg",
      description: "Custom Large Language Model (LLM) fine-tuning, retrieval-augmented generation (RAG), and agentic workflows tailored for proprietary enterprise data repositories.",
      highlights: [
        "Enterprise Knowledge Graphs & Private Vector Search",
        "Custom Autonomous Multi-Agent Decision Pipelines",
        "On-Premise or Private VPC Zero Data Leakage Hosting",
        "Strict SOC-2 Security & Role-Based Access Controls"
      ],
      stats: [
        { label: "Query Latency", value: "< 24ms" },
        { label: "Context Window", value: "128k" },
        { label: "Data Security", value: "100% Private" }
      ],
      cta: "Request AI Architecture"
    },
    {
      id: "cloud-saas",
      badge: "Custom Engineering",
      category: "Cloud Platforms",
      name: "Full-Cycle SaaS & Cloud Engineering",
      tagline: "Scalable Multi-Tenant Platforms & Distributed Systems",
      image: "assets/gallery/hq_opening.jpg",
      description: "End-to-end bespoke software engineering from initial product discovery and UI/UX design to distributed cloud microservices, payment gateways, and automated CI/CD pipelines.",
      highlights: [
        "Multi-Tenant Architecture with Tenant-Level Data Isolation",
        "Elastic Kubernetes Container Orchestration on AWS/Azure",
        "Modern Responsive Web Portals and Cross-Platform Apps",
        "24/7 Dedicated SRE Monitoring & 99.99% Availability SLA"
      ],
      stats: [
        { label: "Cloud Uptime", value: "99.99%" },
        { label: "Sprint Velocity", value: "2 Weeks" },
        { label: "Global Deployments", value: "14 Regions" }
      ],
      cta: "Build Custom Platform"
    }
  ],

  // ─── 5. CASE STUDIES (WITH IMAGES & METRICS) ──────────────────────
  caseStudies: [
    {
      id: "cs-1",
      client: "Karnataka Educational Consortium",
      industry: "Higher Education",
      category: "Campus AI OS",
      tag: "Higher Education",
      title: "Consortium Campus Automation for 40+ Universities",
      image: "assets/gallery/campus_seminar.jpg",
      description: "Replacing legacy manual roll-call across 40 university campuses with TapAxe's multi-modal edge biometric attendance and instant automated parent notification telemetry.",
      challenge: "Manual attendance records across 85,000+ students took 15 minutes per lecture, causing severe administrative overhead and frequent proxy marking.",
      solution: "Deployed 240+ TapAxe smart edge terminals with sub-second facial recognition and automated WhatsApp notification pipelines across all campuses.",
      results: "Saved 4,500+ lecture hours each semester, eliminated proxy marking completely (99.98% accuracy), and achieved 100% real-time parent delivery.",
      metrics: [
        { label: "Proxy Elimination", value: "100%" },
        { label: "Lecture Hours Saved", value: "4,500+" }
      ],
      cta: "Read TapAxe Case Study"
    },
    {
      id: "cs-2",
      client: "Apex Academic Trust",
      industry: "EdTech & Assessments",
      category: "AI Question Studio",
      tag: "EdTech AI",
      title: "Generative AI Examination Studio for 42 Campuses",
      image: "assets/gallery/ai_hackathon.jpg",
      description: "Automating curriculum-mapped examination paper authoring, multi-format PDF generation, and automated difficulty balancing with ExamCraft Studio.",
      challenge: "Faculty spent hundreds of manual hours every term hand-crafting unique question papers, struggling with difficulty standardization and syllabus coverage.",
      solution: "Implemented ExamCraft's generative AI studio mapped directly to regional board curricula with automated Bloom's taxonomy balancing.",
      results: "Reduced question paper creation turnaround from 3 weeks to 90 seconds while achieving 100% syllabus alignment across 18 academic disciplines.",
      metrics: [
        { label: "Authoring Time", value: "< 90 Sec" },
        { label: "Syllabus Match", value: "100%" }
      ],
      cta: "Explore ExamCraft Case Study"
    },
    {
      id: "cs-3",
      client: "Nexis Capital Global",
      industry: "Enterprise FinTech",
      category: "Enterprise AI & RAG",
      tag: "FinTech RAG",
      title: "Autonomous Regulatory RAG & Contract Intelligence",
      image: "assets/gallery/keynote_summit.jpg",
      description: "Engineering a zero-leakage local vector search engine parsing 500,000+ regulatory financial documents with sub-second semantic retrieval.",
      challenge: "Risk teams took 4 business days to audit multi-jurisdiction compliance contracts across 6 international jurisdictions.",
      solution: "Engineered private VPC Pinecone + LangChain vector intelligence pipeline with multi-agent verification and citation telemetry.",
      results: "Cut compliance review cycles by 92% (from 4 days to 40 minutes) with 100% verifiable clause citation attribution.",
      metrics: [
        { label: "Turnaround Reduction", value: "92%" },
        { label: "Audit Accuracy", value: "99.9%" }
      ],
      cta: "View FinTech Case Study"
    },
    {
      id: "cs-4",
      client: "Global Logistics Network",
      industry: "Supply Chain & IoT",
      category: "Cloud IoT Platform",
      tag: "IoT & Cloud",
      title: "Real-Time Fleet & Cold-Chain Telemetry Engine",
      image: "assets/gallery/hq_opening.jpg",
      description: "Distributed IoT platform processing 25,000 events/second from connected transport nodes with sub-50ms anomaly alerting.",
      challenge: "Perishable goods cold-chain failures went undetected during long-haul transit due to delayed cellular batch uploads.",
      solution: "Built an edge MQTT mesh with automatic cellular failover and serverless anomaly detection models on AWS.",
      results: "Eliminated temperature breach cargo loss by 98.4% and saved $1.2M in annual insurance spoilage claims.",
      metrics: [
        { label: "Loss Reduction", value: "98.4%" },
        { label: "Events / Sec", value: "25k" }
      ],
      cta: "Discover IoT Platform"
    }
  ],

  // ─── 6. EXECUTIVE & ENGINEERING TEAM ─────────────────────────────
  team: [
    {
      id: "basawaraj-biradar",
      name: "Basawaraj Biradar",
      designation: "Founder & Chief Executive Officer",
      department: "Executive Leadership",
      photo: "assets/team/basawaraj_biradar.jpg",
      bio: "Visionary technology entrepreneur driving enterprise software innovation, AI SaaS adoption, and digital transformation for educational institutions and global enterprises.",
      skills: ["Product Vision", "AI Strategy", "Enterprise Architecture", "Team Leadership"],
      linkedin: "https://www.linkedin.com/in/basawaraj-biradar"
    },
    {
      id: "ananya-sharma",
      name: "Dr. Ananya Sharma",
      designation: "Chief Technology Officer & Head of AI",
      department: "AI Research & Systems",
      photo: "assets/team/ananya_sharma.jpg",
      bio: "Ph.D. in Computer Science specializing in Deep Learning, Multi-Modal Transformers, and Large-Scale Neural Information Retrieval for enterprise applications.",
      skills: ["Deep Learning", "LLM Fine-Tuning", "Vector Search", "RAG Systems"],
      linkedin: "https://www.linkedin.com/in/ananya-sharma-tech"
    },
    {
      id: "marcus-vance",
      name: "Marcus Vance",
      designation: "VP of Cloud Architecture & SRE",
      department: "Cloud Engineering",
      photo: "assets/team/marcus_vance.jpg",
      bio: "12+ years designing mission-critical Kubernetes clusters, distributed database shards, and zero-downtime multi-region cloud infrastructures.",
      skills: ["Kubernetes", "AWS / Azure", "Microservices", "DevOps & CI/CD"],
      linkedin: "https://www.linkedin.com/in/marcus-vance"
    },
    {
      id: "elena-chen",
      name: "Elena Chen",
      designation: "Head of Product & Design Systems",
      department: "Product & UI/UX",
      photo: "assets/team/elena_chen.jpg",
      bio: "Passionate human-computer interaction specialist crafting intuitive, accessible, and delightful enterprise interfaces and unified design systems.",
      skills: ["Design Systems", "Figma UI/UX", "User Research", "Interaction Design"],
      linkedin: "https://www.linkedin.com/in/elena-chen-design"
    },
    {
      id: "rohit-kulkarni",
      name: "Rohit Kulkarni",
      designation: "Lead IoT & Embedded Systems Engineer",
      department: "Hardware & Edge AI",
      photo: "assets/team/rohit_kulkarni.jpg",
      bio: "Specialist in edge hardware computing, RFID/NFC biometric integration, firmware security, and low-latency MQTT telemetry protocols.",
      skills: ["Edge Computing", "RFID / Biometrics", "Embedded C++", "MQTT Protocols"],
      linkedin: "https://www.linkedin.com/in/rohit-kulkarni-iot"
    }
  ],

  // ─── 7. COMPANY GALLERY & FEATURED MOMENTS ───────────────────────
  galleryFeatured: [
    {
      id: "feat-1",
      title: "Jagannath Tech Solutions Corporate Innovation Hub Launch",
      category: "events",
      categoryLabel: "Events & Launches",
      date: "May 2026",
      image: "assets/gallery/hq_opening.jpg",
      description: "Inaugural ribbon-cutting of our advanced engineering labs and AI research center in Vijayapura with industry dignitaries."
    },
    {
      id: "feat-2",
      title: "Annual Hackathon & AI Developer Sprint",
      category: "hackathons",
      categoryLabel: "Hackathons & Tech",
      date: "April 2026",
      image: "assets/gallery/ai_hackathon.jpg",
      description: "48-hour continuous code sprint bringing together 120+ top engineering minds to prototype autonomous multi-agent algorithms."
    },
    {
      id: "feat-3",
      title: "Global EdTech Keynote & Product Summit",
      category: "events",
      categoryLabel: "Events & Launches",
      date: "March 2026",
      image: "assets/gallery/keynote_summit.jpg",
      description: "Showcasing TapAxe and ExamCraft AI to 500+ university chancellors, academic deans, and education technology leaders."
    }
  ],

  gallery: [
    {
      id: "gal-1",
      title: "Jagannath Tech Solutions Corporate Innovation Hub Launch",
      category: "events",
      categoryLabel: "Events & Launches",
      date: "May 2026",
      image: "assets/gallery/hq_opening.jpg",
      description: "Official inaugural ribbon-cutting of our advanced engineering labs and AI research center in Vijayapura with industry dignitaries."
    },
    {
      id: "gal-2",
      title: "Annual Hackathon & AI Developer Sprint",
      category: "hackathons",
      categoryLabel: "Hackathons & Tech",
      date: "April 2026",
      image: "assets/gallery/ai_hackathon.jpg",
      description: "48-hour continuous code sprint bringing together 120+ top engineering minds to prototype autonomous multi-agent algorithms."
    },
    {
      id: "gal-3",
      title: "Global EdTech Keynote & Product Summit",
      category: "events",
      categoryLabel: "Events & Launches",
      date: "March 2026",
      image: "assets/gallery/keynote_summit.jpg",
      description: "Showcasing TapAxe and ExamCraft AI to 500+ university chancellors, academic deans, and education technology leaders."
    },
    {
      id: "gal-4",
      title: "Campus AI Workshop & Youth Mentorship",
      category: "campus",
      categoryLabel: "Campus & Culture",
      date: "February 2026",
      image: "assets/gallery/campus_seminar.jpg",
      description: "Hands-on technology seminar empowering student developers with practical knowledge in full-stack cloud engineering and generative AI."
    },
    {
      id: "gal-5",
      title: "State Excellence in Software Innovation Award",
      category: "milestones",
      categoryLabel: "Milestones & Awards",
      date: "January 2026",
      image: "assets/gallery/tech_award.jpg",
      description: "Jagannath Tech Solutions honored on the national stage for pioneering impactful academic automation and digital campus infrastructure."
    },
    {
      id: "gal-6",
      title: "Team Milestone Celebration & Product Release",
      category: "campus",
      categoryLabel: "Campus & Culture",
      date: "December 2025",
      image: "assets/gallery/team_celebration.jpg",
      description: "Celebrating 120,000+ daily active users on the TapAxe OS platform with our brilliant core engineering and design teams."
    }
  ],

  // ─── 8. CLIENT & PARTNER TESTIMONIALS ────────────────────────────
  testimonials: [
    {
      quote: "TapAxe completely transformed how our 40+ engineering colleges manage daily operations. The edge face recognition hardware and instant WhatsApp notifications have eliminated manual proxy marking and saved thousands of faculty hours.",
      author: "Dr. B. R. Patil",
      role: "Director of Academic Governance",
      company: "Karnataka Educational Consortium",
      avatar: "assets/team/basawaraj_biradar.jpg",
      rating: 5
    },
    {
      quote: "ExamCraft cut our semester question authoring turnaround from 3 weeks to under 90 seconds while maintaining 100% alignment with our regional curriculum standards. An indispensable tool for modern higher education.",
      author: "Prof. S. N. Deshmukh",
      role: "Dean of Examination & Curricula",
      company: "Apex Academic Trust",
      avatar: "assets/team/ananya_sharma.jpg",
      rating: 5
    },
    {
      quote: "Jagannath Tech Solutions engineered a secure, SOC-2 compliant private vector intelligence RAG engine that reduced our compliance review cycles by over 90%. Exceptional engineering rigor and proactive support.",
      author: "Marcus Vance",
      role: "Chief Technology Officer",
      company: "Nexis Capital Global",
      avatar: "assets/team/marcus_vance.jpg",
      rating: 5
    },
    {
      quote: "Their team delivered our multi-tenant cloud platform on time and on budget with zero downtime. From initial Figma UI design to Kubernetes microservices, Jagannath Tech Solutions represents world-class engineering execution.",
      author: "Rohit Kulkarni",
      role: "Head of Digital Operations",
      company: "Global Logistics Network",
      avatar: "assets/team/rohit_kulkarni.jpg",
      rating: 5
    }
  ],

  // ─── 9. SOCIAL CHANNELS & COMMUNITY ─────────────────────────────
  channels: [
    {
      name: "LinkedIn",
      handle: "@techjagannath",
      role: "Corporate & Hiring",
      url: "https://www.linkedin.com/company/techjagannath",
      color: "#0A66C2",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#0A66C2"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.63 1.63 0 1 0 0-3.26 1.63 1.63 0 0 0 0 3.26m1.4 9.74V9.93H5.06v8.57h2.8z"/></svg>`
    },
    {
      name: "GitHub",
      handle: "techjagannath",
      role: "Open Source Labs",
      url: "https://github.com/techjagannath",
      color: "#181717",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#181717"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>`
    },
    {
      name: "Twitter / X",
      handle: "@techjagannath",
      role: "Announcements & AI",
      url: "https://x.com/techjagannath",
      color: "#000000",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`
    },
    {
      name: "Instagram",
      handle: "@techjagannath",
      role: "Life & Culture",
      url: "https://instagram.com/techjagannath",
      color: "#E4405F",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
    },
    {
      name: "Facebook",
      handle: "TechJagannathOfficial",
      role: "Community Network",
      url: "https://facebook.com/techjagannath",
      color: "#1877F2",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
    },
    {
      name: "YouTube",
      handle: "@techjagannath",
      role: "Tech Demos & Talks",
      url: "https://youtube.com/@techjagannath",
      color: "#FF0000",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#FF0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
    },
    {
      name: "WhatsApp",
      handle: COMPANY_CONTACT.displayPhone,
      role: "Enterprise Sales",
      url: getWhatsAppUrl(),
      color: "#25D366",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.2 1.31-1.68 1.37-.47.06-.98.24-3.13-.65-2.28-.95-3.76-3.25-3.87-3.4-.11-.15-.93-1.24-.93-2.37 0-1.12.59-1.68.8-1.91.21-.24.46-.3.61-.3.15 0 .31 0 .44.01.14.01.32-.05.5.38.18.43.62 1.51.68 1.62.06.11.1.24.02.39-.08.15-.12.24-.24.38-.12.14-.25.31-.36.42-.12.12-.24.25-.1.49.14.24.63 1.04 1.35 1.68.93.83 1.71 1.09 1.95 1.21.24.12.38.1.52-.06.14-.17.59-.69.75-.93.16-.24.32-.2.54-.12.22.08 1.39.66 1.63.78.24.12.4.18.46.28.06.1.06.58-.18 1.26z"/></svg>`
    },
    {
      name: "Telegram",
      handle: "@techjagannath",
      role: "Developer Community",
      url: "https://t.me/techjagannath",
      color: "#229ED9",
      iconSvg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="#229ED9"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/></svg>`
    }
  ],

  // ─── 11. CAREERS & OPEN POSITIONS ────────────────────────────────
  careers: [
    {
      id: "c-1",
      title: "Senior AI / Machine Learning Engineer",
      department: "AI Research Lab",
      type: "Full-Time • Hybrid / Vijayapura",
      experience: "3-6 Years Experience",
      skills: ["PyTorch", "LLMs & RAG", "Python", "Vector Databases"],
      description: "Lead the development of custom generative AI models, vector retrieval pipelines, and multi-modal assessment algorithms."
    },
    {
      id: "c-2",
      title: "Lead Full-Stack Cloud Architect (React + Node)",
      department: "Cloud Engineering",
      type: "Full-Time • Hybrid / Vijayapura",
      experience: "4-8 Years Experience",
      skills: ["Next.js", "TypeScript", "Node.js / NestJS", "Kubernetes"],
      description: "Architect high-performance distributed microservices, multi-tenant database schemas, and modern responsive web applications."
    },
    {
      id: "c-3",
      title: "Senior Embedded Systems & IoT Engineer",
      department: "Hardware Engineering",
      type: "Full-Time • On-Site / Vijayapura",
      experience: "2-5 Years Experience",
      skills: ["Embedded C++", "RFID / Biometrics", "MQTT", "PCB Design"],
      description: "Design and maintain firmware for smart edge biometric terminals, hardware telemetry modules, and offline-sync engines."
    },
    {
      id: "c-4",
      title: "Product UI/UX & Interaction Designer",
      department: "Product Design",
      type: "Full-Time • Hybrid / Remote",
      experience: "2-5 Years Experience",
      skills: ["Figma Design Systems", "Prototyping", "User Research", "Micro-Animations"],
      description: "Craft enterprise software design systems, mobile app flows, and high-fidelity prototypes for flagship SaaS products."
    }
  ],

  // ─── 12. FREQUENTLY ASKED QUESTIONS ──────────────────────────────
  faqs: [
    {
      question: "What products does Jagannath Tech Solutions offer?",
      answer: "We develop flagship SaaS products including TapAxe (an intelligent campus attendance and telemetry OS) and ExamCraft (an AI examination paper generation studio), alongside custom enterprise AI and cloud solutions."
    },
    {
      question: "Can TapAxe integrate with our existing ERP and SMS gateways?",
      answer: "Yes. TapAxe provides REST APIs, webhooks, and pre-built connectors for major education ERPs, relational databases, and enterprise WhatsApp/SMS gateways."
    },
    {
      question: "How does ExamCraft ensure examination questions match our curriculum?",
      answer: "ExamCraft uses syllabus-mapped knowledge representations and Bloom's taxonomy balancing algorithms to generate question papers aligned with specified difficulty distributions and regional board guidelines."
    },
    {
      question: "Do you offer custom software development and AI engineering?",
      answer: "Yes. We engineer end-to-end bespoke solutions including custom LLM RAG pipelines, mobile apps, enterprise cloud SaaS platforms, and distributed microservices."
    },
    {
      question: "How does Jagannath Tech Solutions ensure data privacy and security?",
      answer: "We adhere strictly to DPDP, GDPR, and ISO-aligned protocols with 256-bit encryption in transit and at rest, multi-region cloud backups on AWS/Azure, role-based access control (RBAC), and private VPC deployments."
    },
    {
      question: "How can our organization schedule a live product demonstration?",
      answer: `You can click 'Book Consultation' on the navigation bar, email ${COMPANY_CONTACT.email}, or message us directly on WhatsApp at ${COMPANY_CONTACT.displayPhone}.`
    }
  ]
};

// Export globally for browser & Node.js environments
if (typeof window !== 'undefined') {
  window.COMPANY_CONTACT = COMPANY_CONTACT;
  window.getWhatsAppUrl = getWhatsAppUrl;
  window.getMailtoUrl = getMailtoUrl;
  window.getTelUrl = getTelUrl;
  window.JagannathTechData = TechJagannathData;
  window.TechJagannathData = TechJagannathData;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COMPANY_CONTACT,
    getWhatsAppUrl,
    getMailtoUrl,
    getTelUrl,
    TechJagannathData
  };
}
