import FadeIn from "./FadeIn";

const articles = [
  {
    title: "How I Built VBIT Nexus AI — A Multi-Agent University Platform",
    desc: "Architecting 6 specialized AI agents with Next.js, Supabase, and Gemini API to serve 500+ students. Lessons in prompt engineering, agent orchestration, and production deployment.",
    url: "https://gkr7674.hashnode.dev/",
    published: false,
    emoji: "🤖",
    gradient: "from-[#B600A8]/20 to-[#7621B0]/20",
  },
  {
    title: "Supabase vs MongoDB: Choosing the Right Backend for Your AI App",
    desc: "A practical comparison based on building 12+ production projects. When to use relational vs document databases for AI-powered applications.",
    url: "https://gkr7674.hashnode.dev/",
    published: false,
    emoji: "🗄️",
    gradient: "from-[#3ECF8E]/20 to-[#339933]/20",
  },
  {
    title: "Building AI Agents with Gemini: A Practical Guide",
    desc: "Hands-on guide to building production-ready AI agents using Gemini API, structured prompting, and tool integration. Real code examples from Voyago AI Travel.",
    url: "https://gkr7674.hashnode.dev/",
    published: false,
    emoji: "✨",
    gradient: "from-[#FF6B35]/20 to-[#BE4C00]/20",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-[var(--bg)] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            Blog
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[var(--text-muted)] text-xs sm:text-sm font-light text-center mb-10 max-w-md mx-auto">
            Writing about AI, full-stack development, and building production products
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {articles.map((article, i) => (
            <FadeIn key={article.title} delay={0.1 + i * 0.1} y={20}>
              <a href={article.url} target="_blank" rel="noopener noreferrer"
                aria-label={`Read article: ${article.title}`}
                className="block p-5 rounded-2xl border border-[var(--border)] h-full flex flex-col hover:border-[var(--text-secondary)]/20 transition-colors group">
                {/* Thumbnail preview */}
                <div className={`w-full aspect-[16/9] rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${article.gradient}`}>
                  <span className="text-4xl" aria-hidden="true">{article.emoji}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[var(--text-muted)] text-[10px] uppercase tracking-wider font-medium">Coming Soon</span>
                </div>
                <h3 className="text-[var(--text)] font-semibold text-xs sm:text-sm leading-relaxed mb-2 group-hover:text-[var(--text-secondary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[var(--text-muted)] text-xs font-light leading-relaxed flex-1">{article.desc}</p>
                <span className="text-[var(--text-secondary)] text-[10px] uppercase tracking-wider mt-3 group-hover:opacity-100 opacity-60 transition-opacity">
                  Visit Blog →
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
