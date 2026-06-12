import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SITE_ID = "gkr-portfolio";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const bumped = localStorage.getItem(`${SITE_ID}-bumped`);
    if (!bumped) {
      fetch("https://api.countapi.xyz/hit/krishnaraju7674/gkr-portfolio")
        .then((r) => r.json())
        .then((d) => { if (d.value) setCount(d.value); localStorage.setItem(`${SITE_ID}-bumped`, "1"); })
        .catch(() => {});
    } else {
      fetch("https://api.countapi.xyz/get/krishnaraju7674/gkr-portfolio")
        .then((r) => r.json())
        .then((d) => { if (d.value) setCount(d.value); })
        .catch(() => {});
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 text-muted text-[10px] sm:text-xs font-mono"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 animate-pulse" />
      {count !== null ? (
        <span>Viewed {count.toLocaleString()} times by recruiters worldwide</span>
      ) : (
        <span>Tracking visitors...</span>
      )}
    </motion.div>
  );
}
