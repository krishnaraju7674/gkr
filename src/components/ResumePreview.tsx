import { motion, AnimatePresence } from "framer-motion";

export default function ResumePreview({ onClose }: { onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full max-w-2xl rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] p-4 sm:p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-[var(--text-secondary)] text-xs uppercase tracking-wider font-medium">Resume Preview</span>
            <div className="flex gap-2">
              <a href="/resume.pdf" download
                className="px-4 py-1.5 rounded-full border border-[var(--text)]/30 text-[var(--text)] text-[10px] uppercase tracking-wider hover:bg-[var(--text)]/10 transition-all">
                Download PDF
              </a>
              <button onClick={onClose} className="w-7 h-7 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--text)] text-xs hover:border-[var(--text)]/30 transition-colors">
                ✕
              </button>
            </div>
          </div>
          <div className="rounded-xl overflow-hidden border border-[var(--border)]">
            <iframe src="/resume.pdf#view=fitH" className="w-full h-[70vh] sm:h-[75vh]" title="Resume Preview" />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
