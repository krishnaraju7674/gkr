import { lazy, Suspense } from "react";
import { ScrollProvider } from "./components/ScrollContext";
import HeroSection from "./components/HeroSection";
import SeekingBanner from "./components/SeekingBanner";
import TerminalSection from "./components/TerminalSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import ScrollProgress from "./components/ScrollProgress";
import GlassNav from "./components/GlassNav";
import BackToTop from "./components/BackToTop";
import { ThemeProvider } from "./components/ThemeContext";

// Lazy load heavy or decorative components
const FloatingOrbs = lazy(() => import("./components/FloatingOrbs"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const MarqueeSection = lazy(() => import("./components/MarqueeSection"));
const BuildingNow = lazy(() => import("./components/BuildingNow"));
const BlogSection = lazy(() => import("./components/BlogSection"));
const GlowEffect = lazy(() => import("./components/GlowEffect"));
const AIChatAssistant = lazy(() => import("./components/AIChatAssistant"));
const GitHubSection = lazy(() => import("./components/GitHubSection"));
const FooterSection = lazy(() => import("./components/FooterSection"));

function SectionFallback() {
  return <div className="py-8" aria-hidden="true" />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollProvider>
        <div style={{ overflowX: "clip" }}>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {/* Global background effects */}
          <Suspense fallback={null}>
            <FloatingOrbs />
          </Suspense>

          <ScrollProgress />
          <GlassNav />
          <Suspense fallback={null}>
            <CustomCursor />
            <GlowEffect />
          </Suspense>
          <main id="main-content" className="min-h-screen bg-[var(--bg)]">
            <HeroSection />
            <SeekingBanner />
            <TerminalSection />
          <Suspense fallback={<SectionFallback />}>
            <MarqueeSection />
          </Suspense>
          <AboutSection />
          <ServicesSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <Suspense fallback={<SectionFallback />}>
            <BuildingNow />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <GitHubSection />
          </Suspense>
          <Suspense fallback={<SectionFallback />}>
            <BlogSection />
          </Suspense>
          <ContactSection />
          <Suspense fallback={null}>
            <FooterSection />
          </Suspense>
          <BackToTop />
          <Suspense fallback={null}>
            <AIChatAssistant />
          </Suspense>
          </main>
        </div>
      </ScrollProvider>
    </ThemeProvider>
  );
}