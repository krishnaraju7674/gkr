import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");
  const opacities = chars.map((_, i) => {
    const start = i / chars.length;
    const end = (i + 1) / chars.length;
    return useTransform(scrollYProgress, [start, end], [0.2, 1]);
  });

  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => (
        <motion.span key={i} style={{ opacity: opacities[i] }}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </p>
  );
}
