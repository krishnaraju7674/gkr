import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const socials = [
  { label: "Twitter / X", handle: "@Gkr7674", href: "https://x.com/Gkr7674", icon: "𝕏" },
  { label: "LinkedIn", handle: "krishnam-raju-g7674", href: "https://linkedin.com/in/krishnam-raju-g7674", icon: "in" },
  { label: "GitHub", handle: "@krishnaraju7674", href: "https://github.com/krishnaraju7674", icon: "GH" },
  { label: "Email", handle: "gkr.7674@gmail.com", href: "mailto:gkr.7674@gmail.com", icon: "✉" },
];

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");

    fetch("https://api.web3forms.com/submit", { method: "POST", body: fd })
      .then((r) => {
        if (r.ok) {
          setStatus("success");
          form.reset();
          setTimeout(() => setStatus("idle"), 4000);
        } else {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 4000);
        }
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  }, []);

  return (
    <section id="contact" className="bg-[var(--bg)] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-24 md:pb-32 scroll-mt-24">
      <FadeIn delay={0} y={40}>
        <h2 className="section-title text-[var(--text)] text-center mb-6">
          Let's Connect
        </h2>
      </FadeIn>

      <FadeIn delay={0.1} y={30}>
        <p className="section-subtitle mx-auto mb-12 max-w-[500px]"
          style={{ fontSize: "clamp(0.85rem, 1.4vw, 1.05rem)" }}>
          Have a project in mind? I'm available for freelance, full-time, and collaborations.
        </p>
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <FadeIn delay={0.15} y={30} className="flex flex-col gap-4">
          {socials.map((s, i) => (
            <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              aria-label={`Visit ${s.label}`}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--text)]/30 transition-colors group">
              <span className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] font-bold text-sm group-hover:border-[var(--text)]/30 shrink-0">{s.icon}</span>
              <div>
                <p className="text-[var(--text-secondary)] font-medium text-xs uppercase tracking-wide">{s.label}</p>
                <p className="text-[var(--text)] text-sm">{s.handle}</p>
              </div>
            </motion.a>
          ))}
          <a href="https://calendly.com/gkr7674" target="_blank" rel="noopener noreferrer"
            aria-label="Book a call via Calendly"
            className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] hover:border-[var(--text)]/30 transition-colors group">
            <span className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] font-bold text-sm shrink-0">📅</span>
            <div>
              <p className="text-[var(--text-secondary)] font-medium text-xs uppercase tracking-wide">Book a Call</p>
              <p className="text-[var(--text)] text-sm">Schedule a 15-min call</p>
            </div>
          </a>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="hidden" name="access_key" value="fde2ce14-84c9-4e49-b9bd-86af8f075a27" />
            <input type="hidden" name="subject" value="Portfolio Contact" />
            <input type="text" name="name" placeholder="Your Name" required
              aria-label="Your name"
              className="w-full bg-transparent border border-[var(--border)] rounded-xl px-5 py-3.5 text-[var(--text)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text)]/30 transition-colors" />
            <input type="email" name="email" placeholder="Email Address" required
              aria-label="Email address"
              className="w-full bg-transparent border border-[var(--border)] rounded-xl px-5 py-3.5 text-[var(--text)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text)]/30 transition-colors" />
            <textarea name="message" rows={4} placeholder="Your Message" required
              aria-label="Your message"
              className="w-full bg-transparent border border-[var(--border)] rounded-xl px-5 py-3.5 text-[var(--text)] text-sm placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text)]/30 transition-colors resize-none" />
            <button type="submit" disabled={status === "sending"}
              className="w-full font-medium uppercase tracking-widest text-white rounded-full py-3.5 text-xs sm:text-sm transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)", boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset", outline: "2px solid white", outlineOffset: "-3px" }}>
              {status === "sending" ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round"/></svg>
                  Sending...
                </span>
              ) : status === "success" ? (
                "Sent ✓"
              ) : status === "error" ? (
                "Error — Try Again"
              ) : (
                "Send Message"
              )}
            </button>
            {status === "success" && (
              <p className="text-center text-sm text-green-500" role="status">Thanks! I'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400" role="alert">Something went wrong. Please try again or email me directly.</p>
            )}
          </form>
        </FadeIn>
      </div>
    </section>
  );
}
