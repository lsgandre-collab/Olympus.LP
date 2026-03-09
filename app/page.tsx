import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { SectionProblem } from "@/components/section-problem";
import { SectionAgents } from "@/components/section-agents";
import { SectionOrchestrator } from "@/components/section-orchestrator";
import { SectionDashboard } from "@/components/section-dashboard";
import { SectionResults } from "@/components/section-results";
import { SectionHowItWorks } from "@/components/section-how-it-works";
import { SectionPackages } from "@/components/section-packages";
import { SectionFAQ } from "@/components/section-faq";
import { Waitlist } from "@/components/waitlist";
import { Footer } from "@/components/footer";
import { ScrollReveal } from "@/components/scroll-reveal";
import { GlobalDots } from "@/components/global-dots";

export default function HomePage() {
  return (
    <>
      <Nav />
      <GlobalDots />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <Hero />
        <ScrollReveal>
          <SectionProblem />
        </ScrollReveal>
        <ScrollReveal>
          <SectionAgents />
        </ScrollReveal>
        <ScrollReveal>
          <SectionOrchestrator />
        </ScrollReveal>
        <ScrollReveal>
          <SectionDashboard />
        </ScrollReveal>
        <ScrollReveal>
          <SectionResults />
        </ScrollReveal>
        <ScrollReveal>
          <SectionHowItWorks />
        </ScrollReveal>
        <ScrollReveal>
          <SectionPackages />
        </ScrollReveal>
        <ScrollReveal>
          <SectionFAQ />
        </ScrollReveal>
        <ScrollReveal>
          <Waitlist />
        </ScrollReveal>
        <Footer />
      </main>
    </>
  );
}
