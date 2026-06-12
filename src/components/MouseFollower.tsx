import { useEffect, useRef } from "react";

export default function MouseFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (ref.current) {
        ref.current.style.transform = `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-primary/30 pointer-events-none z-[99] hidden md:block"
      style={{ transform: "translate3d(-100px, -100px, 0)", transition: "transform 0.15s ease-out" }}
    />
  );
}
