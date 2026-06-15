import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import AISkills from "@/components/sections/AISkills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Page sections */}
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Experience />
      <Certifications />
      <AISkills />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
