import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import AboutSection from "@/components/landing/AboutSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import Terminal from "@/components/landing/Terminal";

export default function Home() {
  return (
    <main className="font-vazir antialiased overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <Terminal />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
    </main>
  );
}
