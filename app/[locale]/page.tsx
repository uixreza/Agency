import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/landing/HeroSection";
import StatsSection from "@/components/landing/StatsSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PortfolioSection from "@/components/landing/PortfolioSection";
import AboutSection from "@/components/landing/AboutSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import CTASection from "@/components/landing/CTASection";
import ContactSection from "@/components/landing/ContactSection";
import Terminal from "@/components/landing/Terminal";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as (typeof routing.locales)[number]);

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