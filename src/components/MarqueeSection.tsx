import { useRef, useEffect, useState } from "react";

const projects = [
  { name: "VBIT Nexus AI", img: "/vbit nexus ai img.png" },
  { name: "Carently IND", img: "/carently img.png" },
  { name: "Voyago AI Travel", img: "/voyago img.png" },
  { name: "Crop Care AI", img: "/crop care img.png" },
  { name: "AI Career OS", img: "/ai career os img.png" },
  { name: "MediScan", img: "/mediscan img.png" },
  { name: "VBIT NotesShare", img: "/vbit notesshare img.png" },
  { name: "Chatly", img: "/chatly img.png" },
  { name: "ChemCraft", img: "/chemcraft img.png" },
  { name: "Amul", img: "/amul img.png" },
  { name: "Blue Wing", img: "/blue wing img.png" },
  { name: "Knight Ming Chess", img: "/knight ming chess.png" },
];

const row1 = projects.slice(0, 6);
const row2 = projects.slice(6, 12);

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const val = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
        setOffset(val);
        ticking = false;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Project showcase marquee"
      className="bg-[var(--bg)] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div
        className="flex gap-3 mb-3"
        style={{ willChange: "transform", transform: `translateX(${offset - 200}px)` }}
      >
        {[...row1, ...row1].map((p, i) => (
          <div
            key={`r1-${i}`}
            className="w-[280px] sm:w-[420px] h-[180px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 border border-[var(--border)]"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>

      <div
        className="flex gap-3"
        style={{ willChange: "transform", transform: `translateX(${-(offset - 200)}px)` }}
      >
        {[...row2, ...row2].map((p, i) => (
          <div
            key={`r2-${i}`}
            className="w-[280px] sm:w-[420px] h-[180px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 border border-[var(--border)]"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
