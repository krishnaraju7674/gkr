import { motion } from "framer-motion";

const links = [
  { label: "Resume", href: "/resume.pdf", target: "_blank" },
  { label: "LinkedIn", href: "https://linkedin.com/in/krishnam-raju-g7674", target: "_blank" },
  { label: "GitHub", href: "https://github.com/krishnaraju7674", target: "_blank" },
  { label: "Contact", href: "#contact", target: undefined },
];

export default function SeekingBanner() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pb-8 sm:pb-10 -mt-1">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl border border-[#1A1A1A] p-5 sm:p-6 md:p-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(182,0,168,0.08), rgba(118,33,176,0.05), rgba(190,76,0,0.05))",
        }}
      >
        <p className="text-[#BBCCD7] text-xs uppercase tracking-widest font-medium mb-3">Available For</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
          {["Full Stack Internships", "AI Engineering Internships", "Freelance Projects"].map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-[#D7E2EA] text-sm sm:text-base font-light">
              <span className="text-[#BBCCD7] text-xs">✓</span>
              {item}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target ? "noopener noreferrer" : undefined}
              className="px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-white transition-all duration-300"
              style={{
                background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
                boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
                outline: "2px solid white",
                outlineOffset: "-3px",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
