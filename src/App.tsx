import HeroSection from "./components/HeroSection";
import SeekingBanner from "./components/SeekingBanner";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import BuildingNow from "./components/BuildingNow";
import BlogSection from "./components/BlogSection";
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
        <HeroSection />
        <SeekingBanner />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <BuildingNow />
        <GitHubSection />
        <BlogSection />
        <ContactSection />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
