import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: [number, number, number];
  blur: number;
  opacity: number;
}

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Performance: reduce orbs on mobile
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isMobile && prefersReducedMotion) return;
    const orbCount = isMobile ? 2 : 3;

    const orbs: Orb[] = [];
    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const colors: [number, number, number][] = [
      [182, 0, 168],
      [118, 33, 176],
      [190, 76, 0],
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initOrbs();
    };

    const initOrbs = () => {
      orbs.length = 0;
      for (let i = 0; i < orbCount; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 200 + Math.random() * 300,
          speedX: (Math.random() - 0.5) * 0.15,
          speedY: (Math.random() - 0.5) * 0.15,
          color: colors[i % colors.length],
          blur: 80 + Math.random() * 60,
          opacity: 0.06 + Math.random() * 0.06,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const orb of orbs) {
        orb.x += orb.speedX;
        orb.y += orb.speedY;

        // Gentle mouse repulsion
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          orb.speedX -= dx / dist * 0.001;
          orb.speedY -= dy / dist * 0.001;
        }

        // Speed damping
        orb.speedX *= 0.999;
        orb.speedY *= 0.999;

        // Wrap around edges
        if (orb.x < -orb.size) orb.x = canvas.width + orb.size;
        if (orb.x > canvas.width + orb.size) orb.x = -orb.size;
        if (orb.y < -orb.size) orb.y = canvas.height + orb.size;
        if (orb.y > canvas.height + orb.size) orb.y = -orb.size;

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.size);
        grad.addColorStop(0, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${orb.opacity})`);
        grad.addColorStop(0.5, `rgba(${orb.color[0]}, ${orb.color[1]}, ${orb.color[2]}, ${orb.opacity * 0.4})`);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        mouseX = touch.clientX;
        mouseY = touch.clientY;
      }
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[2]"
      style={{ opacity: 0.8, willChange: "transform" }}
    />
  );
}