import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  { label: "Resume", href: "/resume.pdf", icon: "📄", target: "_blank" },
  { label: "GitHub", href: "https://github.com/krishnaraju7674", icon: "GH", target: "_blank" },
  { label: "LinkedIn", href: "https://linkedin.com/in/krishnam-raju-g7674", icon: "in", target: "_blank" },
  { label: "Email", href: "mailto:gkr.7674@gmail.com", icon: "✉", target: undefined },
  { label: "Terminal", href: "#terminal", icon: ">_", target: undefined },
];

export default function SpeedDial() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col-reverse items-center gap-2">
      <AnimatePresence>
        {open &&
          items.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.target}
              rel={item.target ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.5 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground text-xs font-bold hover:border-foreground/30 hover:bg-foreground/5 transition-all bg-card/90 backdrop-blur-sm shrink-0"
              title={item.label}
            >
              {item.icon}
            </motion.a>
          ))}
      </AnimatePresence>

      <button
        onClick={() => setOpen((o) => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 active:scale-95 shrink-0"
        style={{
          background: "linear-gradient(123deg, #B600A8, #7621B0)",
          boxShadow: "0 4px 16px rgba(182, 0, 168, 0.3)",
        }}
        aria-label="Quick links"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-xl leading-none font-bold">
          +
        </motion.span>
      </button>
    </div>
  );
}
