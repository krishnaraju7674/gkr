import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0C0C0C]">
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
      <p className="text-[#646973] text-xs uppercase tracking-[0.3em] font-medium animate-pulse">Loading</p>

      <style>{`
        @keyframes loadBounce {
          0% { transform: translateY(0); opacity: 0.4; }
          100% { transform: translateY(-12px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
