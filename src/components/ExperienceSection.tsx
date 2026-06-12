import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const experiences = [
  {
    period: "MAR 2026 — MAY 2026", role: "Full Stack Developer Intern", company: "NoviTech R&D Private Limited",
    desc: "Completed a 30-Day MasterClass in Full Stack Development. Architected scalable web applications and mastered the end-to-end development lifecycle. Worked with React, Node.js, and cloud deployment.",
    tags: ["React", "Node.js", "Supabase", "Vercel"],
  },
  {
    period: "ONGOING", role: "Salesforce Developer Trainee", company: "Self-Paced / Project-Based",
    desc: "Building skills in Apex development, LWC components, and CRM workflows. Developing custom triggers, optimizing SOQL queries, and integrating Salesforce with external systems.",
    tags: ["Apex", "LWC", "SOQL", "Salesforce"],
  },
  {
    period: "RECENT", role: "Generative AI Intern", company: "Remote",
    desc: "Worked with LLMs, prompt engineering, and AI agent workflows to automate development use cases. Built RAG pipelines and integrated AI features into full-stack products.",
    tags: ["LLMs", "RAG", "Python", "AI Agents"],
  },
  {
    period: "RECENT", role: "Cybersecurity Intern", company: "Remote",
    desc: "Learned practical fundamentals of cyber threats and implemented security best practices for web applications. Focused on OWASP Top 10, authentication, and data protection.",
    tags: ["OWASP", "Auth", "Security", "Best Practices"],
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="bg-[var(--bg)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 scroll-mt-24">
      <FadeIn delay={0} y={30}>
        <h2 className="section-title text-[var(--text)] text-center mb-14 sm:mb-18 md:mb-20">
          Experience
        </h2>
      </FadeIn>

      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-[var(--border)]" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.period + exp.role}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "50px" }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative pl-10 sm:pl-12 pb-10 sm:pb-12 last:pb-0"
          >
            <div className="absolute left-[9px] sm:left-[13px] top-1.5 w-[14px] h-[14px] rounded-full border-2 border-[var(--text-secondary)] bg-[var(--bg)]" />
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium mb-1">{exp.period}</p>
            <h3 className="text-[var(--text)] font-semibold text-base sm:text-lg">{exp.role}</h3>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base mb-2">{exp.company}</p>
            <p className="text-[var(--text)] opacity-70 text-xs sm:text-sm font-light leading-relaxed mb-3">{exp.desc}</p>
            <div className="flex flex-wrap gap-2">
              {exp.tags.map((tag) => (
                <span key={tag} className="text-[var(--text-secondary)] text-[10px] sm:text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-[var(--border)]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
