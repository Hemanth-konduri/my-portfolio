import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutPreview />
      
      <Skills />
      <Projects />
    </main>
  );
}
