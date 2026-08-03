import Hero from "@/components/sections/Hero";
import Tournaments from "@/components/sections/Tournaments";
import { CalendarSection, ResultsSection } from "@/components/sections/CalendarResults";
import AboutMediaContact from "@/components/sections/AboutMediaContact";

export default function Home() {
  return (
    <main>
      <Hero />
      <CalendarSection />
      <Tournaments />
      <ResultsSection />
      <AboutMediaContact />
    </main>
  );
}
