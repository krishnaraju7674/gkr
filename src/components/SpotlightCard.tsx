import { useRef, useState, useCallback } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(182,0,168,0.08)",
  spotlightSize = 400,
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setPosition({ x: -500, y: -500 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight glow that follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />

      {/* Subtle border gradient that activates on hover */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 rounded-[inherit]"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(${spotlightSize * 0.8}px circle at ${position.x}px ${position.y}px, rgba(182,0,168,0.15) 0%, rgba(118,33,176,0.08) 40%, transparent 70%)`,
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />

      {/* Shine reflection effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 48%, rgba(255,255,255,0.03) 52%, transparent 57%)`,
          backgroundPosition: `${position.x * 0.5}px ${position.y * 0.5}px`,
          backgroundSize: '200% 200%',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {children}
    </div>
  );
}