import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import FadeIn from "./FadeIn";
import ParticleBackground from "./ParticleBackground";
import TextScramble from "./TextScramble";
import Magnet from "./Magnet";
import { useLenis } from "./ScrollContext";

const ResumePreview = lazy(() => import("./ResumePreview"));
const roles = [
  "Full Stack Developer",
  "AI Builder",
  "React / Next.js Engineer",
  "Salesforce Dev",
];

function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[var(--text-muted)]" aria-hidden="true">
      <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
      <div className="w-5 h-8 border-2 border-[var(--text-muted)] rounded-full flex justify-center pt-1.5">
        <div className="w-1 h-2 bg-[var(--text-secondary)] rounded-full animate-bounce" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [showResume, setShowResume] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { lenis } = useLenis();

  const preloadResume = useCallback(() => {
    void import("./ResumePreview");
  }, []);

  const handleNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el && lenis) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      lenis.scrollTo(top, { duration: 1.2 });
    } else if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [lenis]);

  return (
    <section id="hero" className="relative h-screen flex flex-col overflow-hidden bg-[var(--bg)] pt-16" aria-labelledby="hero-heading" aria-label="Hero section">
      <ParticleBackground />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B600A8]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#7621B0]/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-[#BE4C00]/8 blur-[100px]" />
      </div>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-14 max-w-5xl w-full">
          <FadeIn delay={0.1} y={30} className="shrink-0">
            <div className="relative tilt-container">
              {imgError ? (
                <div className="w-[120px] sm:w-[150px] md:w-[180px] aspect-square rounded-full border-2 border-[var(--text)]/30 flex items-center justify-center bg-gradient-to-br from-[#18011F] via-[#B600A8]/20 to-[#7621B0]/20 backdrop-blur-sm">
                  <span className="text-[var(--text)] font-black text-4xl sm:text-5xl md:text-6xl select-none">KR</span>
                </div>
              ) : (
                <Magnet padding={80} strength={8}>
                  <img
                    src="/profile.jpg"
                    alt="Krishnam Raju — Full Stack Developer & AI Builder"
                    width={180}
                    height={180}
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setImgError(true)}
                    className="w-[120px] sm:w-[150px] md:w-[180px] aspect-square rounded-full border-2 border-[var(--text)]/30 object-cover bg-[var(--bg)]"
                  />
                </Magnet>
              )}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#B600A8]/40 via-[#7621B0]/40 to-[#BE4C00]/40 blur-md -z-10 animate-pulse" />
            </div>
          </FadeIn>

          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-[580px]">
            <FadeIn delay={0.2} y={20}>
              <p className="text-[var(--text-muted)] uppercase tracking-[0.2em] text-xs sm:text-sm font-medium mb-2">
                Full Stack Developer & AI Builder
              </p>
            </FadeIn>

            <FadeIn delay={0.3} y={20}>
              <h1 id="hero-heading" className="hero-heading font-black uppercase leading-none tracking-tight mb-3"
                style={{ fontSize: "clamp(2.2rem, 8vw, 4.5rem)" }}>
                Krishnam Raju
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} y={20}>
              <p className="text-[var(--text)] font-light text-base sm:text-lg leading-relaxed mb-4 max-w-[520px]">
                I design <span className="gradient-text font-semibold">intelligent digital products</span> and<br className="hidden sm:block" />
                immersive experiences for <span className="gradient-text font-semibold">AI teams</span> and ambitious startups.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} y={20}>
              <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-[var(--text-muted)]/20 bg-[var(--bg-secondary)]/50 px-4 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-[var(--text-muted)] shadow-sm glass-card">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00]" />
                Open to internships and freelance
              </div>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div className="text-[var(--text-secondary)] font-medium text-sm sm:text-base mb-6 h-6">
                <TextScramble texts={roles} />
              </div>
            </FadeIn>

            <FadeIn delay={0.55} y={20}>
              <div className="grid w-full max-w-[520px] grid-cols-2 gap-3 text-[0.65rem] uppercase tracking-[0.26em] text-[var(--text-muted)] sm:grid-cols-3 mb-6">
                <span className="glass-card px-3 py-2">19+ live products</span>
                <span className="glass-card px-3 py-2">AI-first interfaces</span>
                <span className="glass-card px-3 py-2">Remote-ready partner</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.6} y={20}>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <Magnet padding={30} strength={5}>
                  <button
                    onClick={() => setShowResume(true)}
                    onMouseEnter={preloadResume}
                    className="btn-gradient px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider text-white ripple-btn"
                    aria-label="View resume"
                  >
                    Resume
                  </button>
                </Magnet>
                <Magnet padding={30} strength={5}>
                  <a
                    href="https://github.com/krishnaraju7674"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit GitHub profile"
                    className="btn-outline px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider ripple-btn"
                  >
                    GitHub
                  </a>
                </Magnet>
                <Magnet padding={30} strength={5}>
                  <a
                    href="https://linkedin.com/in/krishnam-raju-g7674"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit LinkedIn profile"
                    className="btn-outline px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider ripple-btn"
                  >
                    LinkedIn
                  </a>
                </Magnet>
                <Magnet padding={30} strength={5}>
                  <a
                    href="#contact"
                    onClick={(e) => handleNav(e, "#contact")}
                    className="btn-gradient px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider text-white ripple-btn"
                  >
                    Contact Me
                  </a>
                </Magnet>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <ScrollIndicator />
      {showResume && (
        <Suspense fallback={<div className="fixed inset-0 z-50 bg-black/80" />}>
          <ResumePreview onClose={() => setShowResume(false)} />
        </Suspense>
      )}
    </section>
  );
}