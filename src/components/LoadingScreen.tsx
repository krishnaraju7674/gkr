import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        return !sessionStorage.getItem("loaded");
      }
    } catch (e) {
      // Ignore sessionStorage security block (e.g. strict private mode)
    }
    return true;
  });

  useEffect(() => {
    if (!loading) return;
    const hide = () => {
      setLoading(false);
      try {
        sessionStorage.setItem("loaded", "1");
      } catch (e) {
        // Ignore storage block
      }
    };
    const timer = setTimeout(hide, 1200);
    if (document.readyState === "complete") {
      return () => clearTimeout(timer);
    }
    window.addEventListener("load", hide, { once: true });
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timer);
    };
  }, [loading]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" style={{ background: "var(--bg, #0C0C0C)" }} role="status" aria-live="polite">
      <div className="loading-screen-card text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-xl font-black text-white shadow-lg">
          KR
        </div>
        <p className="mb-2 text-sm uppercase tracking-[0.28em] text-[var(--text-muted)]">Preparing your portfolio</p>
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full"
              style={{
                background: "linear-gradient(123deg, #B600A8, #7621B0, #BE4C00)",
                animation: `loadBounce 0.7s ${i * 0.14}s infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes loadBounce {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}