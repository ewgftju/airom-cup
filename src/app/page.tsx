import Hero from "@/components/sections/Hero";
import { CalendarSection, ResultsSection } from "@/components/sections/CalendarResults";
import AboutMediaContact from "@/components/sections/AboutMediaContact";

export default function Home() {
  return (
    <main>
      <Hero />
      <CalendarSection />
      <ResultsSection />
      <AboutMediaContact />
    </main>
  );
}
