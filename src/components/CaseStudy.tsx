import { motion, AnimatePresence } from "framer-motion";

interface CaseStudyData {
  title: string;
  problem: string;
  solution: string;
  tech: string[];
  architecture: { layer: string; tech: string }[];
  challenges: string;
  results: string[];
  future: string[];
  image: string;
  live: string;
  github: string;
}

const caseStudies: Record<string, CaseStudyData> = {
  "VBIT Nexus AI": {
    title: "VBIT Nexus AI",
    problem: "University students lacked a centralized AI-powered platform for campus workflows, study resources, and administrative tasks. Existing systems were fragmented across multiple platforms.",
    solution: "Built a next-gen university AI ecosystem with 6 specialized AI agents handling admissions, academics, events, library, placements, and campus communication.",
    tech: ["Next.js 14", "Supabase", "Gemini API", "Tailwind CSS", "Vercel AI SDK", "PostgreSQL"],
    architecture: [
      { layer: "Frontend", tech: "Next.js 14 + Tailwind CSS" },
      { layer: "API Layer", tech: "Next.js API Routes + Vercel Edge" },
      { layer: "Database", tech: "Supabase PostgreSQL" },
      { layer: "Auth", tech: "Supabase Auth (OAuth + Magic Link)" },
      { layer: "AI Service", tech: "Gemini API + Custom Prompt Pipeline" },
    ],
    challenges: "Designing AI agents that understand context-specific university queries required extensive prompt engineering and domain-specific training data. Rate limiting on free-tier APIs was also a constraint.",
    results: [
      "500+ students onboarded in first month",
      "6 specialized AI agents handling different domains",
      "60% reduction in administrative query resolution time",
    ],
    future: ["Mobile app with React Native", "Offline mode with local AI inference", "Integration with university ERP system"],
    image: "/vbit%20nexus%20ai%20img.png",
    live: "https://vbit-nexus-aia.vercel.app/",
    github: "https://github.com/krishnaraju7674/vbit-nexus-ai",
  },
  "Carently IND": {
    title: "Carently IND",
    problem: "Luxury car rental businesses in India lacked a modern digital platform with real-time booking, fleet management, and secure payment processing.",
    solution: "Developed a premium car rental marketplace with concierge booking, fleet management dashboard, Stripe payments, and admin operations panel.",
    tech: ["React 19", "Supabase", "Stripe", "Tailwind CSS", "Framer Motion", "Vercel"],
    architecture: [
      { layer: "Frontend", tech: "React 19 + Framer Motion" },
      { layer: "API Layer", tech: "Supabase Edge Functions" },
      { layer: "Database", tech: "Supabase PostgreSQL" },
      { layer: "Payments", tech: "Stripe Checkout + Webhooks" },
      { layer: "Auth", tech: "Supabase Auth (Email + OAuth)" },
    ],
    challenges: "Implementing real-time booking availability across time slots while preventing double-booking required careful database constraint design and optimistic locking.",
    results: [
      "50+ fleet listings managed through dashboard",
      "Stripe payment processing with automated invoicing",
      "Concierge booking system with email notifications",
    ],
    future: ["Multi-city fleet management", "Real-time GPS tracking", "Customer loyalty program"],
    image: "/carently%20img.png",
    live: "https://carently-ind.vercel.app/",
    github: "https://github.com/krishnaraju7674/carently",
  },
  "Voyago AI Travel": {
    title: "Voyago AI Travel",
    problem: "Travel planning is time-consuming — users must research destinations, compare options, and manually build itineraries across multiple websites and apps.",
    solution: "Built an AI-powered travel planner that generates complete, personalized itineraries from natural language prompts using Gemini API integration.",
    tech: ["Next.js 14", "Gemini API", "Tailwind CSS", "Vercel", "Server Components", "Streaming"],
    architecture: [
      { layer: "Frontend", tech: "Next.js 14 (App Router + RSC)" },
      { layer: "API Layer", tech: "Next.js API Routes + Streaming" },
      { layer: "AI Service", tech: "Gemini API + Structured Prompt Templates" },
      { layer: "Deployment", tech: "Vercel Edge Network" },
    ],
    challenges: "Generating structured, reliable itineraries from free-form natural language required careful prompt engineering with temperature tuning and output validation.",
    results: [
      "50+ destinations supported with detailed itineraries",
      "Sub-3 second itinerary generation time",
      "Natural language input with multi-language support",
    ],
    future: ["Real-time pricing integration", "Booking API connections", "User trip history and sharing"],
    image: "/voyago%20img.png",
    live: "https://voyago-ai-travel.vercel.app/",
    github: "https://github.com/krishnaraju7674/voyago-ai-travel",
  },
};

export default function CaseStudy({ projectName, onClose }: { projectName: string; onClose: () => void }) {
  const data = caseStudies[projectName];
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-3xl rounded-3xl border border-[#1A1A1A] bg-[#0C0C0C] p-6 sm:p-8 md:p-10 my-8 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#D7E2EA] hover:border-[#D7E2EA]/30 transition-colors text-sm">
            ✕
          </button>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[#646973] text-xs uppercase tracking-wider font-medium">Case Study</span>
          </div>

          <h2 className="hero-heading font-black uppercase leading-none tracking-tight mb-6" style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)" }}>
            {data.title}
          </h2>

          <div className="rounded-2xl overflow-hidden mb-6 border border-[#1A1A1A]">
            <img src={data.image} alt={data.title} className="w-full aspect-video object-cover" />
          </div>

          <Section title="Problem">{data.problem}</Section>
          <Section title="Solution">{data.solution}</Section>

          <div className="mb-6">
            <h3 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {data.tech.map((t) => (
                <span key={t} className="text-[#D7E2EA] text-xs px-3 py-1.5 rounded-full border border-[#1A1A1A]">{t}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide mb-3">Architecture</h3>
            <div className="flex flex-col gap-1">
              {data.architecture.map((a, i) => (
                <div key={a.layer} className="flex items-center gap-3 p-2.5 rounded-xl border border-[#1A1A1A]">
                  <span className="text-[#646973] text-xs font-mono w-8 shrink-0">{i + 1}</span>
                  <span className="text-[#BBCCD7] text-xs uppercase tracking-wider font-medium w-24 shrink-0">{a.layer}</span>
                  <span className="text-[#D7E2EA] text-xs opacity-80">{a.tech}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-full h-[1px] bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]" />
              </div>
            </div>
          </div>

          <Section title="Challenges">{data.challenges}</Section>

          <div className="mb-6">
            <h3 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide mb-3">Results</h3>
            <ul className="flex flex-col gap-2">
              {data.results.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[#D7E2EA] text-xs sm:text-sm font-light">
                  <span className="text-[#BBCCD7] mt-0.5 shrink-0">▹</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide mb-3">Future Improvements</h3>
            <ul className="flex flex-col gap-2">
              {data.future.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[#D7E2EA] text-xs sm:text-sm font-light">
                  <span className="text-[#646973] mt-0.5 shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <a href={data.live} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-white transition-all duration-300"
              style={{
                background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid white", outlineOffset: "-3px",
              }}>
              Live Demo
            </a>
            <a href={data.github} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] text-xs font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-all">
              View Code
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide mb-2">{title}</h3>
      <p className="text-[#D7E2EA] text-xs sm:text-sm font-light leading-relaxed opacity-80">{children}</p>
    </div>
  );
}
