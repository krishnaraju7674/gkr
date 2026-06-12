import FadeIn from "./FadeIn";

export default function BlogSection() {
  return (
    <section className="bg-[var(--bg)] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-3xl mx-auto text-center">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight mb-4"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            Blog
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm font-light mb-6 max-w-md mx-auto">
            Writing about AI, full-stack development, and building production products
          </p>
          <a
            href="https://gkr7674.hashnode.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium uppercase tracking-wider text-white text-xs transition-all duration-300"
            style={{
              background: "linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)",
              boxShadow: "0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset",
              outline: "2px solid white", outlineOffset: "-3px",
            }}
          >
            Read Articles on Hashnode →
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
