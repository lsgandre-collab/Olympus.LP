import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SectionProblem } from "@/components/section-problem";
import { SectionAgents } from "@/components/section-agents";
import { SectionResults } from "@/components/section-results";
import { SectionAtlas } from "@/components/section-atlas";
import { SectionHowItWorks } from "@/components/section-how-it-works";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <SectionProblem />
        <SectionAgents />
        <SectionResults />
        <SectionAtlas />
        <SectionHowItWorks />
        <Waitlist />
        <Footer />
      </main>
    </>
  );
}
