import { useRef, useEffect } from "react";
import { useTheme } from "./ThemeContext";

const labels = ["React", "TypeScript", "Supabase", "Node.js", "AI/ML", "Salesforce"];
const values = [95, 92, 90, 85, 88, 70];

export default function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const progressRef = useRef(0);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 280;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const r = 100;
    const count = labels.length;

    const isLight = theme === "light";
    const gridColor = isLight ? "rgba(12, 12, 12, 0.15)" : "rgba(215, 226, 234, 0.15)";
    const axisColor = isLight ? "rgba(12, 12, 12, 0.1)" : "rgba(215, 226, 234, 0.08)";
    const textColor = isLight ? "#1A1A1A" : "#BBCCD7";
    const subTextColor = isLight ? "#777777" : "#646973";

    const draw = (progress: number) => {
      ctx.clearRect(0, 0, size, size);

      for (let ring = 1; ring <= 4; ring++) {
        const radius = (r / 4) * ring;
        ctx.beginPath();
        for (let i = 0; i <= count; i++) {
          const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = axisColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      for (let i = 0; i <= count; i++) {
        const idx = i % count;
        const val = (values[idx] / 100) * r * progress;
        const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
        const x = cx + val * Math.cos(angle);
        const y = cy + val * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(182,0,168,0.15)";
      ctx.fill();
      ctx.strokeStyle = "#B600A8";
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < count; i++) {
        const idx = i % count;
        const val = (values[idx] / 100) * r * progress;
        const angle = (Math.PI * 2 * idx) / count - Math.PI / 2;
        const x = cx + val * Math.cos(angle);
        const y = cy + val * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#B600A8";
        ctx.fill();
      }

      ctx.fillStyle = textColor;
      ctx.font = "10px Kanit, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count - Math.PI / 2;
        const lx = cx + (r + 22) * Math.cos(angle);
        const ly = cy + (r + 22) * Math.sin(angle);
        ctx.fillText(labels[i], lx, ly);
      }

      ctx.fillStyle = subTextColor;
      ctx.font = "9px Kanit, monospace";
      ctx.textAlign = "center";
      for (let ring = 1; ring <= 4; ring++) {
        const radius = (r / 4) * ring;
        const x = cx + radius * Math.cos(-Math.PI / 2);
        const y = cy + radius * Math.sin(-Math.PI / 2);
        ctx.fillText(`${ring * 25}`, x + 12, y);
      }
    };

    const animate = () => {
      progressRef.current = Math.min(1, progressRef.current + 0.02);
      draw(progressRef.current);
      if (progressRef.current < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          progressRef.current = 0;
          animRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(canvas);
    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="mx-auto"
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
