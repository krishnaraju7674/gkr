import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiveProjectButton from "./LiveProjectButton";

function screenshotUrl(url: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=false&overlay.browser=false&width=800&height=600`;
}

const projects = [
  { num: "01", category: "University", name: "VBIT Nexus AI", img: "/vbit%20nexus%20ai%20img.png", live: "https://vbit-nexus-aia.vercel.app/", github: "https://github.com/krishnaraju7674/vbit-nexus-ai", desc: "A next-gen university AI ecosystem with specialized AI agents, student workflows, campus modules, and admin intelligence.", tags: ["Next.js", "AI Agents", "Vercel"] },
  { num: "02", category: "Client", name: "Carently IND", img: "/carently%20img.png", live: "https://carently-ind.vercel.app/", github: "https://github.com/krishnaraju7674/carently", desc: "Premium luxury car rental platform with concierge booking, fleet management, and admin operations dashboard.", tags: ["React", "Supabase", "Stripe"] },
  { num: "03", category: "Social", name: "Notes Share App", img: "/vbit%20notesshare%20img.png", live: "https://krishnaraju7674.github.io/vbit-notes/", github: "https://github.com/krishnaraju7674/vbit-notes", desc: "Student collaboration platform for sharing notes and resources with seamless group learning features.", tags: ["JavaScript", "Supabase", "Netlify"] },
  { num: "04", category: "Science", name: "ChemCraft Studio", img: "/chemcraft%20img.png", live: "https://chemcraft-nu.vercel.app/", github: "https://github.com/krishnaraju7674/chemcraft", desc: "3D molecular visualization tool for interactive chemistry exploration and structured learning.", tags: ["3D", "React", "Vercel"] },
  { num: "05", category: "AI", name: "Blue Wing AI", img: "/blue%20wing%20img.png", live: "https://blue-wing-ai.vercel.app/", github: "https://github.com/krishnaraju7674/blue-wing-ai", desc: "Sovereign agentic entity platform leveraging generative AI for autonomous task execution and decision-making.", tags: ["Next.js", "Python", "LLMs"] },
  { num: "06", category: "Game", name: "KnightMind Chess", img: "/knight%20ming%20chess.png", live: "https://expo.dev/accounts/ishowsmart/projects/knightmind-chess/builds/620b360f-401e-4574-86ff-c3bfb6c3d0e0", github: "https://github.com/krishnaraju7674/KnightMindChess", desc: "Professional-grade chess engine with AI analysis, move suggestions, and real-time multiplayer.", tags: ["TypeScript", "React", "Stockfish"] },
  { num: "07", category: "AI", name: "AI Career OS", img: "/ai%20career%20os%20img.png", live: "https://ai-career-os-puce.vercel.app/", github: "https://github.com/krishnaraju7674/ai-career-os", desc: "Placement command center with roadmap generators, job intelligence, and career management tools.", tags: ["React", "Tailwind", "Supabase"] },
  { num: "08", category: "AI", name: "Voyago AI Travel", img: "/voyago%20img.png", live: "https://voyago-ai-travel.vercel.app/", github: "https://github.com/krishnaraju7674/voyago-ai-travel", desc: "AI-powered travel planner that turns destination ideas into polished itineraries.", tags: ["AI", "Travel", "Vercel"] },
  { num: "09", category: "Social", name: "Chatly", img: "/chatly%20img.png", live: "https://chatly-i1q9.vercel.app/", github: "https://github.com/krishnaraju7674/chatly", desc: "Modern chat application with fast conversation flows, responsive layouts, and real-time messaging.", tags: ["Chat", "Realtime", "Vercel"] },
  { num: "10", category: "AI", name: "Crop Care AI", img: "/crop%20care%20img.png", live: "https://cropcare.gkrit.in", github: "https://github.com/krishnaraju7674/cropcare-ai", desc: "AI-powered farming companion — detect diseases, predict weather risks, get expert guidance in your language.", tags: ["AI", "Farming", "Next.js"] },
  { num: "11", category: "Brand", name: "Amul Kool", img: "/amul%20img.png", live: "https://amul.gkrit.in", github: "https://github.com/krishnaraju7674/amul-kool", desc: "Premium beverage brand experience site with immersive UI and product storytelling.", tags: ["Brand", "UI/UX", "Vercel"] },
  { num: "12", category: "Health", name: "MediScan X", img: "/mediscan%20img.png", live: "https://gkr7674-mediscan-x-omega.hf.space", github: "", desc: "High-fidelity medical diagnostic platform featuring quantum-clinical UI and AI-driven healthcare data visualization.", tags: ["Medical AI", "Gradio", "Python"] },
];

const allCategories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <div className="w-full h-full rounded-[20px] sm:rounded-[30px]" style={{ background: "linear-gradient(135deg, #1A1A1A, #2A2A2A)" }} />;
  return <img src={src} alt={alt} width={400} height={300} decoding="async" loading="lazy" onError={() => setFailed(true)} className="w-full h-full rounded-[20px] sm:rounded-[30px] object-cover" />;
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`);
  }, []);
  const handleLeave = useCallback(() => setTransform(""), []);
  return <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}
    style={{ transform, transition: "transform 0.15s ease-out" }}>{children}</motion.div>;
}

function ProjectCard({ project, index, totalCards }: { project: (typeof projects)[0]; index: number; totalCards: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0", "end 1"] });
  const targetScale = 1 - (totalCards - 1 - index) * 0.02;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const handleClick = useCallback(() => {
    if (project.live) window.open(project.live, "_blank", "noopener,noreferrer");
  }, [project.live]);

  const imgSrc = project.img || screenshotUrl(project.live);

  return (
    <div ref={ref} className="sticky h-[80vh] flex items-start justify-center" style={{ top: "5rem", paddingTop: `${index * 20}px` }}>
      <TiltCard className="w-full max-w-5xl">
        <motion.div onClick={handleClick} style={{ scale, cursor: project.live ? "pointer" : "default" }}
          className="rounded-[30px] sm:rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-5 w-full hover:border-[#D7E2EA]/60 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
            <div className="flex-1 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-2">
                  <span className="font-black text-[#D7E2EA] leading-none" style={{ fontSize: "clamp(1.8rem, 5vw, 60px)" }}>{project.num}</span>
                  <div>
                    <p className="text-[#D7E2EA] font-medium uppercase tracking-wide text-[10px] sm:text-xs">{project.category}</p>
                    <h3 className="text-[#D7E2EA] font-medium uppercase" style={{ fontSize: "clamp(0.8rem, 1.6vw, 1.3rem)" }}>{project.name}</h3>
                  </div>
                </div>
                <p className="text-[#D7E2EA]/60 text-xs sm:text-sm font-light leading-relaxed mb-3">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((t) => (
                    <span key={t} className="text-[#BBCCD7] text-[9px] sm:text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#1A1A1A]">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 sm:gap-3 mt-2" onClick={(e) => e.stopPropagation()}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-1.5 sm:px-5 sm:py-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] text-[10px] sm:text-xs font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-all">Code</a>
                )}
                <LiveProjectButton href={project.live} className="px-4 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs" />
              </div>
            </div>
              <div className="sm:w-[280px] md:w-[340px] lg:w-[400px] shrink-0">
                <div className="aspect-[4/3]">
                  <ProjectImage src={imgSrc} alt={`${project.name} — ${project.desc}`} />
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8 sm:mb-10"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}>Project</h2>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
        {allCategories.map((cat) => (
          <button key={cat} onClick={() => setActiveFilter(cat)}
            className={`px-4 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-all duration-300 ${activeFilter === cat ? "text-white" : "text-[#646973] border border-[#1A1A1A] hover:border-[#D7E2EA]/30"}`}
            style={activeFilter === cat ? { background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)", boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25)" } : undefined}>
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        {filtered.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} totalCards={filtered.length} />
        ))}
      </div>
    </section>
  );
}
