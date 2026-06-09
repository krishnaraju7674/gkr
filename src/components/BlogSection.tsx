import FadeIn from "./FadeIn";

const articles = [
  {
    title: "How I Built VBIT Nexus AI — A Multi-Agent University Platform",
    desc: "Architecting 6 specialized AI agents with Next.js, Supabase, and Gemini API to serve 500+ students. Lessons in prompt engineering, agent orchestration, and production deployment.",
    readTime: "8 min",
    url: "https://gkr7674.hashnode.dev/building-vbit-nexus-ai",
  },
  {
    title: "Supabase vs MongoDB: Choosing the Right Backend for Your AI App",
    desc: "A practical comparison based on building 12+ production projects. When to use relational vs document databases for AI-powered applications.",
    readTime: "6 min",
    url: "https://gkr7674.hashnode.dev/supabase-vs-mongodb",
  },
  {
    title: "Building AI Agents with Gemini: A Practical Guide",
    desc: "Hands-on guide to building production-ready AI agents using Gemini API, structured prompting, and tool integration. Real code examples from Voyago AI Travel.",
    readTime: "10 min",
    url: "https://gkr7674.hashnode.dev/building-ai-agents-gemini",
  },
];

export default function BlogSection() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            Blog
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[#646973] text-xs sm:text-sm font-light text-center mb-10 max-w-md mx-auto">
            Writing about AI, full-stack development, and building production products
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {articles.map((article, i) => (
            <FadeIn key={article.title} delay={0.1 + i * 0.1} y={20}>
              <a href={article.url} target="_blank" rel="noopener noreferrer"
                className="block p-5 rounded-2xl border border-[#1A1A1A] h-full flex flex-col hover:border-[#D7E2EA]/20 transition-colors group">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#646973] text-[10px] uppercase tracking-wider font-medium">{article.readTime}</span>
                </div>
                <h3 className="text-[#D7E2EA] font-semibold text-xs sm:text-sm leading-relaxed mb-2 group-hover:text-[#BBCCD7] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#646973] text-xs font-light leading-relaxed flex-1">{article.desc}</p>
                <span className="text-[#BBCCD7] text-[10px] uppercase tracking-wider mt-3 group-hover:opacity-100 opacity-60 transition-opacity">
                  Read More →
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
