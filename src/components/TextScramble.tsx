import { useEffect, useState } from "react";

interface TextScrambleProps {
  texts: string[];
  className?: string;
  pauseDuration?: number;
  style?: React.CSSProperties;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:',.<>?/~`0123456789";

export default function TextScramble({
  texts,
  className = "",
  pauseDuration = 2500,
  style,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let frame = 0;
    let animationFrame: number;
    let timeout: ReturnType<typeof setTimeout>;

    const scramble = () => {
      const target = texts[currentIndex];
      const progress = Math.floor(frame / 20); // ~50ms per char at 60fps

      if (progress < target.length) {
        let result = "";
        for (let i = 0; i < target.length; i++) {
          if (i < progress) {
            result += target[i];
          } else {
            result += letters[Math.floor(Math.random() * letters.length)];
          }
        }
        setDisplayText(result);
        frame++;
        animationFrame = requestAnimationFrame(scramble);
      } else {
        setDisplayText(target);
        timeout = setTimeout(() => {
          currentIndex = (currentIndex + 1) % texts.length;
          frame = 0;
          animationFrame = requestAnimationFrame(scramble);
        }, pauseDuration);
      }
    };

    const startTimeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(scramble);
    }, 300);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
      clearTimeout(startTimeout);
    };
  }, [texts, pauseDuration]);

  if (!displayText) return null;

  return (
    <span className={className} style={style}>
      {displayText}
      <span className="inline-block w-[2px] h-[0.85em] bg-[var(--text-secondary)] ml-1 animate-pulse align-middle" />
    </span>
  );
}