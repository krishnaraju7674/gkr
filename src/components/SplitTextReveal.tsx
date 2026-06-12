import { motion } from "framer-motion";

interface SplitTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: "h1" | "h2" | "h3" | "p";
}

export default function SplitTextReveal({
  text,
  className = "",
  style,
  as: Tag = "h2",
}: SplitTextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            delay: i * 0.07,
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}