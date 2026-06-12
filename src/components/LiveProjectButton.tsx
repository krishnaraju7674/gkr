interface LiveProjectButtonProps {
  href?: string;
  className?: string;
}

export default function LiveProjectButton({ href, className }: LiveProjectButtonProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`rounded-full border-2 border-border font-medium uppercase tracking-widest text-foreground hover:bg-foreground/10 transition-colors duration-200 inline-flex items-center justify-center ${className}`}
    >
      Live
    </a>
  );
}
