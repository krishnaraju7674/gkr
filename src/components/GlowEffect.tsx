import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeContext";

export default function GlowEffect() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      el.style.transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9999] ${
        theme === "dark" ? "mix-blend-screen" : "mix-blend-multiply opacity-50"
      }`}
      style={{
        background: theme === "dark"
          ? "radial-gradient(circle, rgba(182,0,168,0.12) 0%, rgba(118,33,176,0.06) 40%, transparent 70%)"
          : "radial-gradient(circle, rgba(182,0,168,0.08) 0%, rgba(118,33,176,0.04) 40%, transparent 70%)",
        transition: "transform 0.05s ease-out",
        willChange: "transform",
      }}
    />
  );
}
