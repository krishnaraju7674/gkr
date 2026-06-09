import FadeIn from "./FadeIn";

const building = [
  {
    title: "AI Career OS",
    desc: "Placement command center with AI roadmap generation, job matching, skill gap analysis, and interview prep serving 1,000+ students.",
    tag: "Next.js + Gemini + Supabase",
  },
  {
    title: "Agentic Workflows",
    desc: "Building autonomous AI agents that execute complex multi-step tasks with LLM orchestration, memory, and tool calling capabilities.",
    tag: "Python + LangChain + GPT-4",
  },
  {
    title: "RAG Experiments",
    desc: "Researching retrieval-augmented generation pipelines for domain-specific Q&A, document analysis, and knowledge base integration.",
    tag: "Python + Pinecone + OpenAI",
  },
];

export default function BuildingNow() {
  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            What I&apos;m Building Now
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[#646973] text-xs sm:text-sm font-light text-center mb-10 max-w-md mx-auto">
            Actively building and experimenting with AI-powered products
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {building.map((item, i) => (
            <FadeIn key={item.title} delay={0.1 + i * 0.1} y={20}>
              <div className="p-5 rounded-2xl border border-[#1A1A1A] h-full flex flex-col">
                <h3 className="text-[#BBCCD7] font-semibold text-sm uppercase tracking-wide mb-2">{item.title}</h3>
                <p className="text-[#D7E2EA] text-xs sm:text-sm font-light leading-relaxed mb-3 flex-1">{item.desc}</p>
                <span className="text-[#646973] text-[10px] uppercase tracking-wider font-mono">{item.tag}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
