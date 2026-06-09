import HeroSection from "./components/HeroSection";
import MarqueeSection from "./components/MarqueeSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
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
        <MarqueeSection />
        <AboutSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
        <ProjectsSection />
        <ContactSection />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
