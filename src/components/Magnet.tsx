import { useRef, useState, useCallback } from "react";

interface MagnetProps {
  children?: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      if (Math.abs(dx) > rect.width / 2 + padding || Math.abs(dy) > rect.height / 2 + padding) {
        setTransform("");
        return;
      }
      const tx = dx / strength;
      const ty = dy / strength;
      setTransform(`translate3d(${tx}px, ${ty}px, 0)`);
    },
    [padding, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setTransform("");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        willChange: "transform",
        transition: transform ? activeTransition : inactiveTransition,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
