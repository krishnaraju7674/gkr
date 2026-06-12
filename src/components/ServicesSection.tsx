import ScrollReveal from "./ScrollReveal";

const services = [
  {
    num: "01",
    name: "Full Stack Web Development",
    desc: "End-to-end web applications with React, Next.js, Node.js, and TypeScript — from database design to polished frontend interfaces.",
  },
  {
    num: "02",
    name: "AI & LLM Integration",
    desc: "Custom AI agents, RAG pipelines, prompt engineering, and LLM-powered features that make your product smarter and more intuitive.",
  },
  {
    num: "03",
    name: "UI / UX Engineering",
    desc: "Premium, responsive interfaces with smooth animations, glassmorphism, and pixel-perfect implementation using Tailwind CSS and Framer Motion.",
  },
  {
    num: "04",
    name: "Authentication & Security",
    desc: "Secure auth systems with Supabase, OAuth, JWT, and role-based access control — built with security best practices from day one.",
  },
  {
    num: "05",
    name: "Salesforce Development",
    desc: "Custom LWC components, Apex triggers, SOQL optimization, and CRM workflow automation for the Salesforce ecosystem.",
  },
];

export default function ServicesSection() {
  return (
    <section
      className="bg-[var(--section-alt-bg)] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2 className="section-title text-[var(--section-alt-text)] mb-16 sm:mb-20 md:mb-28">
        What I Do
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((item, i) => (
          <ScrollReveal key={item.num} delay={i * 100}>
            <div className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 mb-4 sm:mb-5 group hover:-translate-y-1">
              <div className="flex items-start gap-5 sm:gap-6 md:gap-8">
                <span
                  className="font-black text-[var(--section-alt-text)] shrink-0 leading-none gradient-text"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 100px)" }}
                >
                  {item.num}
                </span>
                <div className="flex flex-col justify-center">
                  <h3
                    className="font-medium uppercase text-[var(--section-alt-text)]"
                    style={{ fontSize: "clamp(0.95rem, 2vw, 1.8rem)" }}
                  >
                    {item.name}
                  </h3>
                  <p
                    className="font-light leading-relaxed max-w-2xl text-[var(--section-alt-text)]"
                    style={{ fontSize: "clamp(0.8rem, 1.5vw, 1.15rem)", opacity: 0.65 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
