import HeroSection from "./components/HeroSection";
import SeekingBanner from "./components/SeekingBanner";
import TerminalSection from "./components/TerminalSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import BuildingNow from "./components/BuildingNow";
import BlogSection from "./components/BlogSection";
import GlowEffect from "./components/GlowEffect";
import AIChatAssistant from "./components/AIChatAssistant";
import SpeedDial from "./components/SpeedDial";
import Scroll3D from "./components/Scroll3D";
import VisitorCounter from "./components/VisitorCounter";
import GitHubSection from "./components/GitHubSection";
import ScrollProgress from "./components/ScrollProgress";
import BackToTop from "./components/BackToTop";
import LoadingScreen from "./components/LoadingScreen";
import MouseFollower from "./components/MouseFollower";
import CustomCursor from "./components/CustomCursor";
import { ThemeProvider } from "./components/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <div style={{ overflowX: "clip" }}>
        <LoadingScreen />
        <ScrollProgress />
        <CustomCursor />
        <MouseFollower />
        <GlowEffect />
        <HeroSection />
        <SeekingBanner />
        <TerminalSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <BuildingNow />
        <GitHubSection />
        <BlogSection />
        <section className="bg-background px-5 sm:px-8 md:px-10 py-16 sm:py-20 text-center">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-8"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)" }}>
            3D Experience
          </h2>
          <p className="text-muted text-xs sm:text-sm font-light text-center mb-8 max-w-md mx-auto">
            Scroll to rotate — a live 3D torus knot that responds to your scroll position
          </p>
          <Scroll3D />
        </section>
        <ContactSection />
        <SpeedDial />
        <BackToTop />
        <AIChatAssistant />
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden sm:block">
          <VisitorCounter />
        </div>
      </div>
    </ThemeProvider>
  );
}
