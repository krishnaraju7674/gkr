import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const kb: Record<string, string> = {
  "who is krishnam": "Krishnam Raju is a Full Stack Developer & AI Product Builder. He's currently pursuing B.Tech in IT at Vignana Bharathi Institute of Technology with 8.0 CGPA. He specializes in building AI-powered web platforms using Next.js, Supabase, TypeScript, and modern cloud technologies.",
  "what projects": "Krishnam has built 19+ projects including VBIT Nexus AI (AI university ecosystem serving 500+ students), Carently IND (car rental marketplace with Stripe), Voyago AI Travel (AI travel planner with Gemini), Crop Care AI (85% disease detection accuracy), and more. Type 'projects' in the terminal above for the full list.",
  "what skills": "Krishnam's tech stack: Frontend (Next.js, React, TypeScript, Tailwind), Backend (Supabase, Node.js, PostgreSQL), AI/ML (Gemini API, LangChain, Prompt Engineering), Cloud (Vercel, Supabase, Hugging Face), Salesforce (LWC, Apex, SOQL).",
  "what experience": "Full Stack Dev Intern at NoviTech R&D (2026), Salesforce Developer Trainee (ongoing), Generative AI Intern, and Cybersecurity Intern. He has 2+ years of building experience.",
  "contact": "Email: gkr.7674@gmail.com | GitHub: github.com/krishnaraju7674 | LinkedIn: linkedin.com/in/krishnam-raju-g7674 | Twitter: x.com/Gkr7674 | Calendly: calendly.com/gkr7674",
  "resume": "Krishnam's resume is available at the Resume button at the top of the page. It opens an interactive preview where you can view or download the PDF.",
  "case study": "Krishnam has detailed case studies for 3 top projects: VBIT Nexus AI, Carently IND, and Voyago AI Travel. Each covers Problem, Solution, Architecture, Challenges, Results, and Future Improvements. Click the 'Case Study' button on any of those project cards to read them.",
  "certifications": "Salesforce Developer (LWC, Apex, SOQL) | Generative AI & Prompt Engineering | Cybersecurity — OWASP Top 10 | Full Stack Development — NoviTech R&D | Python Programming & Automation | React & TypeScript Advanced",
  "education": "B.Tech IT at VBIT (2023-2027, 8.0 CGPA) | Higher Secondary at Sri Chaitanya (90%) | Secondary at ZP High School (100%)",
  "github": "github.com/krishnaraju7674 — 19+ repos, actively building. Check out the GitHub Activity section below for the contribution chart and live stats.",
  "blog": "Krishnam writes about AI, full-stack development, and building production products at gkr7674.hashnode.dev. Topics include building AI agents with Gemini, Supabase vs MongoDB, and more.",
  "hiring": "Krishnam is currently seeking Full Stack Developer and AI Engineering Internships (remote & on-site). He's also available for freelance projects. Check the hiring banner at the top!",
};

const quickReplies = [
  "Who is Krishnam?",
  "What projects has he built?",
  "What are his skills?",
  "How to contact him?",
];

function getAnswer(input: string): string {
  const lower = input.toLowerCase().trim();
  for (const [key, value] of Object.entries(kb)) {
    const keywords = key.split(" ");
    if (keywords.every((k) => lower.includes(k))) return value;
  }
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey")) {
    return "Hey there! I'm Krishnam's AI assistant. Ask me anything about his skills, projects, experience, or how to reach him!";
  }
  if (lower.includes("thank")) {
    return "You're welcome! Feel free to ask anything else. Krishnam is always happy to connect!";
  }
  return "I don't have that information yet. Try asking about: who he is, projects, skills, experience, contact, resume, case studies, certifications, education, GitHub, blog, or hiring!";
}

export default function AIChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Hi! I'm Krishnam's AI assistant. Ask me anything about his work!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [open]);

  const handleSend = useCallback(
    (text: string) => {
      if (!text.trim()) return;
      setMessages((m) => [...m, { from: "user", text: text.trim() }]);
      setTimeout(() => {
        setMessages((m) => [...m, { from: "bot", text: getAnswer(text.trim()) }]);
      }, 400 + Math.random() * 400);
    },
    []
  );

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-transform hover:scale-110 active:scale-95"
        style={{
          background: "linear-gradient(123deg, #B600A8, #7621B0)",
          boxShadow: "0 4px 20px rgba(182, 0, 168, 0.4)",
        }}
        aria-label="Open AI chat assistant"
        aria-expanded={open}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-24 right-6 z-40 w-[340px] sm:w-[380px] rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="AI chat assistant"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ background: "linear-gradient(123deg, #B600A8, #7621B0)" }}>
                AI
              </div>
              <div>
                <p className="text-foreground text-sm font-medium">Krishnam AI</p>
                <p className="text-muted text-[10px]">Ask me anything</p>
              </div>
            </div>

            <div
              className="h-[320px] overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: "thin", scrollbarColor: "var(--border) transparent" }}
              role="log"
              aria-live="polite"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "text-white"
                        : "text-foreground border border-border"
                    }`}
                    style={
                      msg.from === "user"
                        ? {
                            background: "linear-gradient(123deg, #B600A8, #7621B0)",
                          }
                        : {}
                    }
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickReplies.map((qr) => (
                  <button
                    key={qr}
                    onClick={() => handleSend(qr)}
                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full border border-border text-primary hover:border-foreground/30 transition-colors"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => { e.preventDefault(); handleSend(input); setInput(""); }}
              className="flex items-center gap-2 p-3 border-t border-border"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                autoComplete="off"
                aria-label="Ask the AI assistant"
                className="flex-1 bg-transparent text-foreground text-xs sm:text-sm outline-none placeholder-muted"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ background: "linear-gradient(123deg, #B600A8, #7621B0)" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
