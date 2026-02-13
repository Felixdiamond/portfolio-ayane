export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I build scalable full stack solutions with a focus on user needs ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "Experienced in global team collaboration across time zones",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building an AI multi-model platform",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Let's collaborate on your next project",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "VideoTranslator: Open-Source Voice Dubber",
    des: "A GPU-accelerated pipeline for automatic video transcription, translation, and dubbing across 8+ languages using MeloTTS and FFmpeg.",
    img: "/video-translator.svg",
    iconLists: ["/py.svg", "/openai.svg", "/librosa.svg", "/hf.svg", "/ffmpeg.svg"],
    link: "github.com/Felixdiamond/videotranslator",
  },
  {
    id: 2,
    title: "nineBooks: Comprehensive E-Learning Platform",
    des: "A versatile e-learning platform offering e-books, video courses, and audiobooks for an immersive educational experience.",
    img: "/nine-books.svg",
    iconLists: ["/next.svg", "/tail.svg", "/sb.svg", "/paystack.svg", "/styledc.svg"],
    link: "nine-books.vercel.app",
  },
  {
    id: 3,
    title: "Free AI Gateway: Access AI models for free",
    des: "A self-hosted REST API that reverse-engineers web interfaces to provide structured, streaming access to chatGPT, gemini and grok without API keys.",
    img: "/free_ai_gateway.png",
    iconLists: ["/py.svg", "/fastapi.svg", "/chromium.svg", "/docker.svg"],
    link: "github.com/Felixdiamond/free-ai-gateway",
  },
  {
    id: 4,
    title: "Deepseek on Android: Edge AI Infrastructure",
    des: "A complete toolchain for running 1.5B-7B Large Language Models locally on Android devices via Termux, enabling true offline AI capabilities.",
    img: "/deep-on-android.webp",
    iconLists: ["/bash.svg", "/termux.svg", "/ollama.svg", "/linux.svg"],
    link: "github.com/Felixdiamond/deepseek-on-android",
  }
];

export const testimonials = [
  {
    quote:
      "He excels in crafting high-quality code that is easy to understand and maintain. He is a great team player and is always willing to help others.",
    name: "Omonike Blessing",
    title: "Business Owner - Elijah Graphics",
  },
  {
    quote:
      "Collaborating with Felix was an absolute pleasure. His professionalism, promptness, and dedication to delivering exceptional results were evident throughout our project. If you're seeking to elevate your website and elevate your brand, Felix is the ideal partner.",
    name: "Emmanuel Oye",
    title: "C.E.O - O.G Creations",
  },
  {
    quote:
      "After Felix optimized our website, our traffic increased by 50%. We can't thank them enough! I've never met a web developer who truly cares about their clients' success like Felix does.",
    name: "Ebisintei Dennis",
    title: "Founder - Lomosoft",
  },
];

export const workExperience = [
  {
    year: "2022 — 2023",
    role: "Full Stack Developer",
    company: "Lomosoft / ChainKoffee",
    description: "Architected modular microservices and REST APIs, boosting data throughput by 30%. Designed optimized SQL schemas for high-volume traffic.",
    tags: ["Node.js", "PostgreSQL", "React", "System Design"]
  },
  {
    year: "2023 — Present",
    role: "Freelance Systems Engineer",
    company: "Self-Employed",
    description: "Delivering high-performance backend systems and automation tools. Built GPU-accelerated AI pipelines and CLI utilities that reduced client workflows by 90%.",
    tags: ["Python", "FastAPI", "CI/CD", "Automation"]
  },
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/Felixdiamond",
  },
  {
    id: 2,
    img: "/twit.svg",
    link: "https://x.com/FelixDiamond06",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/felix-dawodu-ba2b08211"
  },
];