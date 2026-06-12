import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hide = () => setLoading(false);
    const timer = setTimeout(hide, 1200);

    if (document.readyState === "complete") {
      return () => clearTimeout(timer);
    }

    window.addEventListener("load", hide, { once: true });
    return () => {
      window.removeEventListener("load", hide);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="flex gap-1.5 mb-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(123deg, #B600A8, #7621B0, #BE4C00)",
              animation: `loadBounce 0.6s ${i * 0.15}s infinite alternate`,
            }}
          />
        ))}
      </div>
      <p className="text-muted text-xs uppercase tracking-[0.3em] font-medium animate-pulse">Loading</p>

      <style>{`
        @keyframes loadBounce {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
