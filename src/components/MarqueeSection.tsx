import { useRef, useEffect, useState } from "react";

const row1Images = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
  "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
  "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
  "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
  "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
];

const row2Images = [
  "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
  "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
  "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
  "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
  "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
  "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
  "https://motionsites.ai/assets/hero-celestia-preview-0yO3XO8.gif",
];

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
      className="bg-[var(--bg)] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div
        className="flex gap-3 mb-3"
        style={{ willChange: "transform", transform: `translateX(${offset - 200}px)` }}
      >
        {[...row1Images, ...row1Images].map((src, i) => (
          <img
            key={`r1-${i}`}
            src={src}
            alt=""
            aria-hidden="true"
            className="w-[280px] sm:w-[420px] h-[180px] sm:h-[270px] rounded-2xl object-cover shrink-0"
            loading="lazy"
          />
        ))}
      </div>

      <div
        className="flex gap-3"
        style={{ willChange: "transform", transform: `translateX(${-(offset - 200)}px)` }}
      >
        {[...row2Images, ...row2Images].map((src, i) => (
          <img
            key={`r2-${i}`}
            src={src}
            alt=""
            aria-hidden="true"
            className="w-[280px] sm:w-[420px] h-[180px] sm:h-[270px] rounded-2xl object-cover shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
