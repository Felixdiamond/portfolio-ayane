export const projects = [
  {
    id: 6,
    title: "School Biometrics",
    subtitle: "Fingerprint + face, end to end",
    proc: "biometric.sys",
    stat: "driver → recognition → web",
    des: "An identity and attendance system for schools, built end to end: the driver interface for the Futronic fingerprint scanner, the fingerprint and face recognition pipelines, and the web dashboard staff actually use. In production; the repo stays private.",
    img: "",
    tech: ["Driver Interface", "Fingerprint", "Face Recognition", "Web UI"],
    link: "",
  },
  {
    id: 2,
    title: "VideoTranslator",
    subtitle: "Open-source video dubbing",
    proc: "dubber.pipeline",
    stat: "8 languages · one GPU",
    des: "Re-voices video in 8 languages: WhisperX word-level alignment, NLLB translation, Qwen3-TTS voice cloning — with Demucs splitting the track so the background music survives the dub. Models load in sequence to fit one GPU's VRAM.",
    img: "/video-translator.webp",
    tech: ["WhisperX", "NLLB-200", "Qwen3-TTS", "Demucs", "FFmpeg"],
    link: "github.com/Felixdiamond/videoTranslator",
  },
  {
    id: 3,
    title: "Free AI Gateway",
    subtitle: "API keys are optional",
    proc: "gateway.rev",
    stat: "3 providers · 0 API keys",
    des: "An OpenAI-compatible API that answers with ChatGPT, Gemini, or Grok by driving real browser sessions — no keys, no subscriptions. Tab pooling, per-session locks, and patient timeouts do the ugly work underneath.",
    img: "/free-ai-gateway.webp",
    tech: ["FastAPI", "zendriver", "Chromium", "Docker"],
    link: "github.com/Felixdiamond/free-ai-gateway",
  },
  {
    id: 4,
    title: "Chromaflow",
    subtitle: "Wallpaper-to-desktop theming",
    proc: "chromaflow.gtk",
    stat: "23 stars · GNOME shell",
    des: "Pulls a palette from your wallpaper and rebuilds the Marble GNOME theme around it, so the whole desktop follows the art. The most-starred thing I've shipped — Linux ricers are a demanding audience.",
    img: "",
    tech: ["Python", "PyQt5", "pywal", "GNOME"],
    link: "github.com/Felixdiamond/chromaflow",
  },
  {
    id: 5,
    title: "DeepSeek on Android",
    subtitle: "Edge inference, no excuses",
    proc: "llm.edge",
    stat: "1.5B params · 4GB-RAM phone",
    des: "A one-line installer that puts a local LLM on a budget phone: Termux, proot Debian, Ollama, Open WebUI. The 1.5B model runs on an Infinix with 4GB of RAM and a Unisoc chip that had other plans.",
    img: "/deep-on-android.webp",
    tech: ["Termux", "Ollama", "proot", "Bash"],
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

// Career history lives in components/TerminalLayer.tsx as the shell session.
// Social links live in components/Workbench.tsx.