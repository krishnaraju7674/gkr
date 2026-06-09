import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
}

export default function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/krishnaraju7674")
      .then((r) => r.json())
      .then((data) => {
        setStats({
          public_repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          total_stars: 0,
        });
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={20}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-3"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
            GitHub Activity
          </h2>
        </FadeIn>
        <FadeIn delay={0.1} y={20}>
          <p className="text-[#646973] text-xs sm:text-sm font-light text-center mb-10 max-w-md mx-auto">
            Active building and contributing to open source
          </p>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10">
          {stats ? (
            <>
              <StatBox value={stats.public_repos} label="Repositories" />
              <StatBox value={stats.followers} label="Followers" />
              <StatBox value={"500+"} label="Contributions" />
            </>
          ) : (
            <p className="text-[#646973] text-xs">Loading stats...</p>
          )}
        </div>
        <FadeIn delay={0.2} y={20} className="flex justify-center">
          <a href="https://github.com/krishnaraju7674" target="_blank" rel="noopener noreferrer">
            <img src="https://ghchart.rshah.org/krishnaraju7674" alt="GitHub Contribution Chart"
              className="rounded-xl border border-[#1A1A1A] max-w-full" loading="lazy" />
          </a>
        </FadeIn>
        <FadeIn delay={0.3} y={20} className="flex justify-center mt-6">
          <a href="https://github.com/krishnaraju7674" target="_blank" rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] text-xs font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-all">
            View All Repositories
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function StatBox({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="text-center p-5 rounded-2xl border border-[#1A1A1A] min-w-[100px]">
      <p className="text-[#BBCCD7] font-black text-xl sm:text-2xl">{value}</p>
      <p className="text-[#646973] text-xs uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}
