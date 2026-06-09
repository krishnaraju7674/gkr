import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";
import AnimatedCounter from "./AnimatedCounter";

import { motion } from "framer-motion";

const skillLevelText = (level: number) => {
  if (level >= 90) return "Advanced";
  if (level >= 80) return "Proficient";
  return "Intermediate";
};

const skillsData = [
  { name: "Next.js / React.js", level: 98, dot: "#61DAFB" },
  { name: "TypeScript / Vite", level: 94, dot: "#3178C6" },
  { name: "Tailwind CSS / shadcn/ui", level: 92, dot: "#06B6D4" },
  { name: "Supabase / Auth Systems", level: 95, dot: "#3ECF8E" },
  { name: "Node.js / Python", level: 92, dot: "#339933" },
  { name: "REST APIs / Architecture", level: 90, dot: "#FF6C37" },
  { name: "LLMs / Prompt Engineering", level: 96, dot: "#FF6B35" },
  { name: "AI Product Integration", level: 90, dot: "#A855F7" },
  { name: "MySQL / MongoDB", level: 85, dot: "#47A248" },
  { name: "LWC / Apex", level: 80, dot: "#00A1E0" },
  { name: "DevOps / Vercel", level: 88, dot: "#000000" },
  { name: "IoT / Hardware", level: 75, dot: "#E44D26" },
];

const skillCategories = [
  { title: "Frontend", skills: skillsData.slice(0, 4) },
  { title: "Backend", skills: skillsData.slice(4, 8) },
  { title: "AI & Cloud", skills: skillsData.slice(8, 12) },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-[#0C0C0C]">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="w-[80px] sm:w-[120px] md:w-[160px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10">
        <img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="w-[110px] sm:w-[150px] md:w-[190px]"
        />
      </FadeIn>

      <div className="relative min-h-dvh flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-24 sm:py-28 md:py-32">
        <FadeIn delay={0} y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: "clamp(2.5rem, 10vw, 120px)" }}
          >
            Krishnam Raju
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} y={30} className="mt-8 sm:mt-10 md:mt-12 flex flex-col items-center gap-6 sm:gap-8 max-w-[650px]">
          <p
            className="text-[#D7E2EA] font-light text-center leading-relaxed"
            style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)" }}
          >
            Full-stack developer focused on building AI-powered products using{" "}
            <span className="font-semibold text-[#BBCCD7]">Next.js</span>,{" "}
            <span className="font-semibold text-[#BBCCD7]">Supabase</span>,{" "}
            <span className="font-semibold text-[#BBCCD7]">TypeScript</span>, and modern cloud technologies.{" "}
            Information Technology student at{" "}
            <span className="font-semibold text-[#BBCCD7]">Vignana Bharathi Institute of Technology</span>{" "}
            with a passion for shipping production-grade products.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
            {[
              { label: "Full Stack Intern", value: "NoviTech R&D", period: "2026" },
              { label: "Salesforce Dev", value: "Self-Paced", period: "Ongoing" },
              { label: "Gen AI Intern", value: "Remote", period: "Recent" },
              { label: "Cyber Intern", value: "Remote", period: "Recent" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center p-3 rounded-2xl border border-[#1A1A1A] bg-[#0C0C0C]/80"
              >
                <p className="text-[#BBCCD7] font-bold text-xs uppercase tracking-wider">{item.period}</p>
                <p className="text-[#D7E2EA] font-medium text-sm sm:text-base mt-1">{item.value}</p>
                <p className="text-[#646973] text-xs uppercase tracking-wide mt-0.5">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <AnimatedText
          text="I specialize in AI-assisted web platforms, secure authentication systems, and polished full-stack product workflows. From backend architecture to frontend interfaces, I bridge the gap between complex logic and intuitive experiences — building products that feel alive."
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] mt-8 sm:mt-10 md:mt-12"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.2rem)" }}
        />

        <FadeIn delay={0.2} y={30} className="w-full max-w-[500px] mt-8 sm:mt-10 md:mt-12">
          <div className="grid grid-cols-4 gap-3">
            {[
              { val: 10, suf: "+", label: "Projects" },
              { val: 5, suf: "+", label: "Clients" },
              { val: 8, suf: "+", label: "Certifications" },
              { val: 8.0, label: "CGPA" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-center p-3 sm:p-4 rounded-2xl border border-[#1A1A1A]"
              >
                <p className="hero-heading font-black leading-none" style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}>
                  <AnimatedCounter value={stat.val} />
                  {stat.suf && <span>{stat.suf}</span>}
                </p>
                <p className="text-[#646973] font-medium text-xs uppercase tracking-wider mt-0.5">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </div>

      <div className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-24 md:pb-32">
        <FadeIn delay={0.15} y={30} className="w-full max-w-[600px] mx-auto">
          <h3 className="text-[#BBCCD7] font-black uppercase text-center mb-8"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}>
            Achievements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: "🏆", title: "Academic Excellence", desc: "100% in 10th & 8.0 CGPA in B.Tech" },
              { icon: "🚀", title: "Product Creator", desc: "Built & deployed multiple products independently" },
              { icon: "💡", title: "Self-Learner", desc: "Mastered React, TypeScript & Salesforce" },
              { icon: "🛡️", title: "Security Focused", desc: "Hands-on with OWASP Top 10 & secure auth" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px" }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex items-start gap-3 p-4 rounded-2xl border border-[#1A1A1A]"
              >
                <span className="text-xl sm:text-2xl shrink-0">{item.icon}</span>
                <div>
                  <h4 className="text-[#BBCCD7] font-semibold text-xs uppercase tracking-wide">{item.title}</h4>
                  <p className="text-[#D7E2EA] font-light text-xs sm:text-sm mt-0.5 opacity-70">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        <div id="skills" className="w-full max-w-5xl mx-auto mt-16 sm:mt-20">
          <h3 className="text-[#BBCCD7] font-black uppercase text-center mb-8"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}>
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "50px", amount: 0 }}
                transition={{ delay: ci * 0.15, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h4 className="text-[#BBCCD7] font-black uppercase text-sm sm:text-base mb-5 tracking-wide">
                  {cat.title}
                </h4>
                <div className="flex flex-col gap-3 sm:gap-4">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="flex items-center gap-2 text-[#D7E2EA] font-medium text-xs uppercase tracking-wide">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: skill.dot }} />
                          <span>{skill.name}</span>
                        </span>
                        <span className="text-[#BBCCD7] font-bold text-xs">{skillLevelText(skill.level)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: `linear-gradient(90deg, ${skill.dot}, ${skill.dot}88)` }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, margin: "50px", amount: 0 }}
                          transition={{ delay: ci * 0.2 + 0.3, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div id="contact" className="mt-16 sm:mt-20">
          <ContactButton className="px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base" />
        </div>
      </div>
    </section>
  );
}
