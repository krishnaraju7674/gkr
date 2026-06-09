import FadeIn from "./FadeIn";

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
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <h2
        className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
      >
        What I Do
      </h2>

      <div className="max-w-5xl mx-auto">
        {services.map((item, i) => (
          <FadeIn
            key={item.num}
            delay={i * 0.1}
            y={20}
          >
            <div className="flex items-start py-8 sm:py-10 md:py-12 border-b last:border-b-0"
              style={{ borderColor: "rgba(12, 12, 12, 0.15)" }}
            >
              <span
                className="font-black text-[#0C0C0C] shrink-0 mr-6 sm:mr-8 md:mr-10 leading-none"
                style={{ fontSize: "clamp(3rem, 10vw, 140px)" }}
              >
                {item.num}
              </span>
              <div className="flex flex-col justify-center">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]"
                  style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)", opacity: 0.6 }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
