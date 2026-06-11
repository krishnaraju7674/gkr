import { useState, useRef, useEffect, useCallback } from "react";
import FadeIn from "./FadeIn";

const banner = [
  "╔══════════════════════════════════════════════════════════╗",
  "║   _  __           _                           __  __    ║",
  "║  | |/ /__ _ _ __ | |__  _ __ __ _ _ __ ___  |  \\/  |   ║",
  "║  | ' // _` | '_ \\| '_ \\| '__/ _` | '_ ` _ \\ | |\\/| |   ║",
  "║  | . \\ (_| | | | | |_) | | | (_| | | | | | || |  | |   ║",
  "║  |_|\\_\\__,_|_| |_|_.__/|_|  \\__,_|_| |_| |_||_|  |_|   ║",
  "║                                                          ║",
  "║  Welcome to Krishnam Raju's interactive terminal         ║",
  "║  Type 'help' to see available commands                   ║",
  "╚══════════════════════════════════════════════════════════╝",
].join("\n");

const commands: Record<string, { desc: string; run: () => string }> = {
  help: {
    desc: "Show this help message",
    run: () =>
      Object.entries(commands)
        .map(([cmd, v]) => `  ${cmd.padEnd(14)} ${v.desc}`)
        .join("\n"),
  },
  about: {
    desc: "About Krishnam Raju",
    run: () =>
      `Full-stack developer & AI product builder\n` +
      `B.Tech IT @ Vignana Bharathi Institute of Technology\n` +
      `Building AI-powered products with Next.js, Supabase & TypeScript\n` +
      `19+ projects  |  8+ certifications  |  2+ years building`,
  },
  projects: {
    desc: "List all projects",
    run: () =>
      [
        "01  VBIT Nexus AI       AI university ecosystem (500+ students)",
        "02  Carently IND        Luxury car rental marketplace (50+ fleet)",
        "03  Notes Share App     Secure notes platform (200+ resources)",
        "04  ChemCraft Studio    3D molecular visualizer (1000+ compounds)",
        "05  Blue Wing AI        Autonomous AI agent platform",
        "06  KnightMind Chess    Chess engine with Stockfish AI",
        "07  AI Career OS        Placement command center (1000+ students)",
        "08  Voyago AI Travel    AI travel planner (50+ destinations)",
        "09  Chatly              Realtime messaging (10k+ msgs/day)",
        "10  Crop Care AI        AI farming companion (85% accuracy)",
        "11  Amul Kool           Premium beverage brand experience",
        "12  MediScan X          Medical diagnostic platform",
      ].join("\n"),
  },
  skills: {
    desc: "View tech stack",
    run: () =>
      [
        "Frontend   Next.js / React  |  TypeScript  |  Tailwind  |  Framer Motion",
        "Backend    Supabase  |  Node.js  |  PostgreSQL  |  REST APIs",
        "AI/ML      Gemini API  |  LangChain  |  Prompt Engineering  |  RAG",
        "Cloud      Vercel  |  Supabase  |  Hugging Face  |  Netlify",
        "Other      Salesforce (LWC/Apex)  |  Git  |  Python  |  Three.js",
      ].join("\n"),
  },
  experience: {
    desc: "Work experience",
    run: () =>
      "Full Stack Dev Intern    NoviTech R&D              MAR 2026 — MAY 2026\n" +
      "Salesforce Trainee       Self-Paced               Ongoing\n" +
      "Gen AI Intern            Remote                   Recent\n" +
      "Cybersecurity Intern     Remote                   Recent",
  },
  education: {
    desc: "Education background",
    run: () =>
      "B.Tech IT    VBIT                       2023 — 2027    8.0 CGPA\n" +
      "XII          Sri Chaitanya              2021 — 2023    90%\n" +
      "X            ZP High School             2020 — 2021    100%",
  },
  contact: {
    desc: "Contact information",
    run: () =>
      "Email    gkr.7674@gmail.com\n" +
      "GitHub   https://github.com/krishnaraju7674\n" +
      "LinkedIn https://linkedin.com/in/krishnam-raju-g7674\n" +
      "Twitter  https://x.com/Gkr7674\n" +
      "Calendly https://calendly.com/gkr7674",
  },
  resume: {
    desc: "Download resume",
    run: () => "Resume: https://gkr.vercel.app/resume.pdf\nType 'open resume' to view in browser",
  },
  certs: {
    desc: "List certifications",
    run: () =>
      "1  Salesforce Developer (LWC, Apex, SOQL)\n" +
      "2  Generative AI & Prompt Engineering\n" +
      "3  Cybersecurity — OWASP Top 10\n" +
      "4  Full Stack Development — NoviTech R&D\n" +
      "5  Python Programming & Automation\n" +
      "6  React & TypeScript Advanced",
  },
  blog: {
    desc: "Read my blog",
    run: () => "Blog: https://gkr7674.hashnode.dev\nArticles planned on AI, Supabase vs MongoDB, building AI agents",
  },
  github: {
    desc: "GitHub profile",
    run: () => "https://github.com/krishnaraju7674",
  },
  linkedin: {
    desc: "LinkedIn profile",
    run: () => "https://linkedin.com/in/krishnam-raju-g7674",
  },
  whoami: {
    desc: "Display current user",
    run: () => "krishnamraju",
  },
  neofetch: {
    desc: "System info (nerd flex)",
    run: () =>
      "       .---.  os         Krishnam OS v2.0\n" +
      "      /     \\  host       Krishnam Raju\n" +
      "      \\ .-. /  kernel     Full Stack Dev 6.0\n" +
      "       \\   /   uptime     2+ years building\n" +
      "       /   \\   packages   19+ projects\n" +
      "      /     \\  shell      bash 5.2 (portfolio)\n" +
      "     /       \\ resolution 1920x1080 (recruiter mode)\n" +
      "    /         \\ de        Dark Theme Premium",
  },
  date: {
    desc: "Show current date/time",
    run: () => new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
  clear: {
    desc: "Clear terminal",
    run: () => "CLEAR",
  },
  sudo: {
    desc: "Try it ;)",
    run: () =>
      "Nice try. You don't have sudo access on Krishnam's portfolio.\n" +
      "But here's a secret: type 'krishnam' for a surprise.",
  },
  krishnam: {
    desc: "???",
    run: () =>
      "  ✦  You found the easter egg!  ✦\n\n" +
      "  Krishnam Raju\n" +
      "  Full Stack Developer & AI Builder\n" +
      "  Building the future, one commit at a time.\n\n" +
      "  \"The best way to predict the future is to build it.\"\n" +
      "  — Probably me, probably someone else.",
  },
};

export default function TerminalSection() {
  const [lines, setLines] = useState<string[]>([banner]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const process = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const parts = trimmed.split(/\s+/);
    const base = parts[0];

    if (!trimmed) return;

    setHistory((h) => [...h, trimmed]);

    let output = "";
    if (base === "clear") {
      setLines([]);
      return;
    }
    if (base === "open" && parts[1] === "resume") {
      window.open("/resume.pdf", "_blank");
      output = "Opening resume in new tab...";
    } else if (base in commands) {
      output = commands[base].run();
    } else {
      output = `command not found: ${trimmed}\nType 'help' for available commands`;
    }

    setLines((l) => [...l, `$ ${cmd}`, output]);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      process(input);
      setInput("");
      setHistIdx(-1);
    },
    [input, process]
  );

  const handleKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
        setHistIdx(idx);
        setInput(history[idx]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (histIdx === -1) return;
        const idx = histIdx + 1;
        if (idx >= history.length) {
          setHistIdx(-1);
          setInput("");
        } else {
          setHistIdx(idx);
          setInput(history[idx]);
        }
      }
    },
    [history, histIdx]
  );

  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            Interactive Terminal
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[#646973] text-xs sm:text-sm font-light text-center mb-8 max-w-md mx-auto">
            Try it — type <span className="text-[#BBCCD7] font-mono">help</span> to start
          </p>
        </FadeIn>
        <FadeIn delay={0.2} y={20}>
          <div
            className="rounded-2xl border border-[#1A1A1A] overflow-hidden"
            onClick={() => inputRef.current?.focus()}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1A1A1A] bg-[#0A0A0A]">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-[#646973] text-xs font-mono ml-2">krishnam@portfolio:~$</span>
            </div>
            <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed max-h-[400px] overflow-y-auto space-y-1 bg-[#080808]"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#1A1A1A transparent" }}>
              {lines.map((line, i) => {
                if (line.startsWith("$")) {
                  return (
                    <div key={i} className="flex">
                      <span className="text-green-400/70 shrink-0">krishnam@portfolio:~$ </span>
                      <span className="text-[#D7E2EA]">{line.slice(2)}</span>
                    </div>
                  );
                }
                if (line.startsWith("╔") || line.startsWith("║") || line.startsWith("╚")) {
                  return <pre key={i} className="text-[#B600A8] text-[10px] sm:text-xs leading-tight">{line}</pre>;
                }

                return <div key={i} className="text-[#D7E2EA] opacity-80 whitespace-pre-wrap">{line}</div>;
              })}
              <form onSubmit={handleSubmit} className="flex items-center mt-1">
                <span className="text-green-400/70 shrink-0">krishnam@portfolio:~$ </span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  className="flex-1 bg-transparent text-[#D7E2EA] outline-none border-none ml-0"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
              <div ref={endRef} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
