import Hero from "@/components/sections/Hero";
import { CalendarSection, ResultsSection } from "@/components/sections/CalendarResults";
import { AboutSection, VideosSection, ContactSection } from "@/components/sections/AboutMediaContact";

export default function Home() {
  return (
    <main>
      <Hero />
      <CalendarSection />
      <VideosSection />
      <AboutSection />
      <ResultsSection />
      <ContactSection />
    </main>
  );
}
