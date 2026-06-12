import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const education = [
  {
    period: "2023 — 2027",
    degree: "B.Tech, Information Technology",
    school: "Vignana Bharathi Institute of Technology",
    desc: "Focusing on core CS fundamentals, web technologies, and emerging AI trends. Maintaining 8.0 CGPA.",
  },
  {
    period: "2021 — 2023",
    degree: "Higher Secondary (12th)",
    school: "Sri Chaitanya Junior College",
    desc: "Secured 90% with a focus on Mathematics, Physics, and Chemistry.",
  },
  {
    period: "2020 — 2021",
    degree: "Secondary (10th)",
    school: "ZP High School",
    desc: "Achieved 100% in board examinations with distinction.",
  },
];

const certifications = [
  "Salesforce Developer (LWC, Apex, SOQL)",
  "Generative AI & Prompt Engineering",
  "Cybersecurity — OWASP Top 10",
  "Full Stack Development — NoviTech R&D",
  "Python Programming & Automation",
  "React & TypeScript Advanced",
];

export default function EducationSection() {
  return (
    <section id="education" className="bg-[var(--bg)] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28 scroll-mt-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-20">
        <FadeIn delay={0} y={30}>
          <h2 className="section-title text-[var(--text)] mb-8 sm:mb-10">
            Education
          </h2>
          <div className="flex flex-col gap-6 sm:gap-8">
            {education.map((item, i) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative pl-5 sm:pl-6 border-l-2 border-[var(--border)]"
              >
                <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-[var(--text-secondary)]" />
                <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider font-medium mb-1">{item.period}</p>
                <h3 className="text-[var(--text)] font-semibold text-sm sm:text-base">{item.degree}</h3>
                <p className="text-[var(--text-secondary)] text-xs sm:text-sm mb-1">{item.school}</p>
                <p className="text-[var(--text-muted)] text-xs sm:text-sm font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15} y={30}>
          <h2 className="section-title text-[var(--text)] mb-8 sm:mb-10">
            Certifications
          </h2>
          <div className="flex flex-col gap-3 sm:gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl border border-[var(--border)]"
              >
                <span className="text-[var(--text-secondary)] text-lg shrink-0">▹</span>
                <span className="text-[var(--text)] text-xs sm:text-sm font-light">{cert}</span>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
