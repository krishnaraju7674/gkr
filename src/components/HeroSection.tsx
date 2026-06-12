import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FadeIn from "./FadeIn";
import ParticleBackground from "./ParticleBackground";
import { useTheme } from "./ThemeContext";
import { smoothScrollTo } from "./smoothScroll";
import ResumePreview from "./ResumePreview";

const roles = [
  "Full Stack Developer",
  "AI Builder",
  "React / Next.js Engineer",
  "Salesforce Dev",
];

function TypeWriter({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 30);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, index, texts]);

  return (
    <span>
      {texts[index].slice(0, charIndex)}
      <span className="inline-block w-[2px] h-[0.85em] bg-[var(--text-secondary)] ml-1 animate-pulse align-middle" />
    </span>
  );
}

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
  const { theme, toggle } = useTheme();
  const [showResume, setShowResume] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY);
  }, []);

  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const navItems = ["About", "Projects", "Education", "Contact"];

  return (
    <section id="main-content" className="relative h-screen flex flex-col overflow-hidden bg-[var(--bg)]" aria-label="Hero section">
      <ParticleBackground />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#B600A8]/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#7621B0]/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[20%] w-[20%] h-[20%] rounded-full bg-[#BE4C00]/8 blur-[100px]" />
      </div>

      <nav className="relative z-20 flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8" aria-label="Main navigation">
        <span className="text-[var(--text)] font-black text-lg sm:text-xl tracking-tight select-none">
          KR<span className="opacity-60">.</span>
        </span>
        <div className="flex items-center gap-5 sm:gap-8">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
              className="hidden sm:inline text-[var(--text)] font-medium uppercase tracking-wider text-sm hover:opacity-70 transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-[var(--text-secondary)] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          ))}
          <button
            onClick={toggle}
            className="w-8 h-8 rounded-full border border-[var(--text)]/30 flex items-center justify-center text-[var(--text)] text-sm hover:bg-[var(--text)]/10 transition-all duration-200"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="sm:hidden w-8 h-8 rounded-full border border-[var(--text)]/30 flex items-center justify-center text-[var(--text)] hover:bg-[var(--text)]/10 transition-all"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-6 right-6 z-30 sm:hidden rounded-2xl border border-[var(--border)] bg-[var(--bg)] shadow-xl p-4 flex flex-col gap-1"
            role="menu"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, `#${item.toLowerCase()}`)}
                role="menuitem"
                className="block px-4 py-3 text-[var(--text)] font-medium uppercase tracking-wider text-sm hover:bg-[var(--text)]/5 rounded-xl transition-colors"
              >
                {item}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="block px-4 py-3 text-[var(--text-secondary)] font-medium uppercase tracking-wider text-sm hover:bg-[var(--text)]/5 rounded-xl transition-colors"
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-14 max-w-5xl w-full">
          <FadeIn delay={0.1} y={30} className="shrink-0">
            <div className="relative">
              {imgError ? (
                <div className="w-[120px] sm:w-[150px] md:w-[180px] aspect-square rounded-full border-2 border-[var(--text)]/30 flex items-center justify-center bg-gradient-to-br from-[#18011F] via-[#B600A8]/20 to-[#7621B0]/20 backdrop-blur-sm">
                  <span className="text-[var(--text)] font-black text-4xl sm:text-5xl md:text-6xl select-none">KR</span>
                </div>
              ) : (
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
              <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-3"
                style={{ fontSize: "clamp(2.2rem, 8vw, 4.5rem)" }}>
                Krishnam Raju
              </h1>
            </FadeIn>

            <FadeIn delay={0.4} y={20}>
              <p className="text-[var(--text)] font-light text-base sm:text-lg leading-relaxed mb-4 max-w-[500px]">
                Building intelligent web experiences with{" "}
                <span className="font-semibold text-[var(--text-secondary)]">Full Stack Development</span> and{" "}
                <span className="font-semibold text-[var(--text-secondary)]">AI</span>.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div className="text-[var(--text-secondary)] font-medium text-sm sm:text-base mb-6 h-6">
                <TypeWriter texts={roles} />
              </div>
            </FadeIn>

            <FadeIn delay={0.6} y={20}>
              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start">
                <button
                  onClick={() => setShowResume(true)}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                    outline: "2px solid white",
                    outlineOffset: "-3px",
                  }}
                  aria-label="View resume"
                >
                  Resume
                </button>
                <a
                  href="https://github.com/krishnaraju7674"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit GitHub profile"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[var(--text)]/30 text-[var(--text)] text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[var(--text)]/10 hover:border-[var(--text)]/60 transition-all duration-300 backdrop-blur-sm"
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/krishnam-raju-g7674"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-[var(--text)]/30 text-[var(--text)] text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[var(--text)]/10 hover:border-[var(--text)]/60 transition-all duration-300 backdrop-blur-sm"
                >
                  LinkedIn
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider text-white transition-all duration-300"
                  style={{
                    background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                    boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                    outline: "2px solid white",
                    outlineOffset: "-3px",
                  }}
                >
                  Contact Me
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      <ScrollIndicator />
      {showResume && <ResumePreview onClose={() => setShowResume(false)} />}
    </section>
  );
}
