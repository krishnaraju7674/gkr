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

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const words = text.split(" ");

  return (
    <motion.p ref={ref} className={className} style={{ ...style, opacity }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, charIndex) => (
            <span key={charIndex}>{char}</span>
          ))}
          {wordIndex < words.length - 1 && <span>{" "}</span>}
        </span>
      ))}
    </motion.p>
  );
}
