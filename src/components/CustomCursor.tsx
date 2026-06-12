import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;
    document.body.style.cursor = "none";

    let mx = -100, my = -100;
    let ringX = -100, ringY = -100;
    let isAnimating = false;
    let rafId: number;

    const ring = () => {
      const dx = mx - ringX;
      const dy = my - ringY;
      ringX += dx * 0.15;
      ringY += dy * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }

      if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
        isAnimating = false;
        return;
      }

      rafId = requestAnimationFrame(ring);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }

      if (!isAnimating) {
        isAnimating = true;
        rafId = requestAnimationFrame(ring);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[var(--text-secondary)] pointer-events-none z-[100] hidden md:block" style={{ transform: "translate3d(-100px, -100px, 0)" }} />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[var(--text-secondary)]/30 pointer-events-none z-[100] hidden md:block" style={{ transform: "translate3d(-100px, -100px, 0)" }} />
    </>
  );
}
