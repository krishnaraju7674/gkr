import { useState, useEffect, useCallback } from "react";
import { useTheme } from "./ThemeContext";
import { useLenis } from "./ScrollContext";
import { motion, AnimatePresence } from "framer-motion";
import Magnet from "./Magnet";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function GlassNav() {
  const { theme, toggle } = useTheme();
  const { lenis } = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 80); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el && lenis) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        lenis.scrollTo(top, { duration: 1.2 });
      } else if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    [lenis]
  );

  return (
    <>
      <nav
        className={`nav-glass ${scrolled ? "scrolled" : ""}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNav(e, "#hero")}
            className="text-[var(--text)] font-black text-lg tracking-tight select-none no-underline hover:opacity-80 transition-opacity"
          >
            KR<span className="opacity-50">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNav(e, item.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative text-sm font-medium uppercase tracking-wider transition-all duration-300 no-underline ${
                    isActive ? "text-[var(--text)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                      style={{ background: "linear-gradient(90deg, #B600A8, #7621B0, #BE4C00)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider text-white no-underline"
            >
              Resume ↗
            </a>
            <Magnet className="inline-block" padding={40} strength={4}>
              <button
                onClick={toggle}
                className="w-8 h-8 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-sm hover:bg-[var(--text)]/10 transition-all"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </Magnet>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Magnet className="inline-block" padding={40} strength={4}>
              <button
                onClick={toggle}
                className="w-8 h-8 rounded-full border border-[var(--text)]/20 flex items-center justify-center text-sm hover:bg-[var(--text)]/10 transition-all"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </Magnet>
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="w-8 h-8 rounded-full border border-[var(--text)]/20 flex items-center justify-center hover:bg-[var(--text)]/10 transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 left-4 right-4 z-[99] md:hidden rounded-2xl glass-strong p-4 flex flex-col gap-1"
            role="menu"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNav(e, item.href)}
                role="menuitem"
                className="block px-4 py-3 text-[var(--text)] font-medium uppercase tracking-wider text-sm hover:bg-[var(--text)]/5 rounded-xl transition-colors no-underline"
              >
                {item.label}
              </a>
            ))}
            <hr className="border-[var(--border)] my-2" />
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className="block px-4 py-3 text-[var(--text-secondary)] font-medium uppercase tracking-wider text-sm hover:bg-[var(--text)]/5 rounded-xl transition-colors no-underline"
            >
              Resume ↗
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}