import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import "../globals.css";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import OnboardingModal from "@/components/landing/OnboardingModal";
import Wrapper from "@/components/Wrapper";
import ScrollProgressIndicator from "@/components/landing/ScrollProgressIndicator";
import ChatSupport from "@/components/landing/ChatSupport";
import SplashScreen from "@/components/SplashScreen";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale: locale as (typeof routing.locales)[number],
    namespace: "metadata",
  });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  setRequestLocale(locale as (typeof routing.locales)[number]);

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="scroll-smooth"
      suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground font-vazir">
        <Wrapper>
          <NextIntlClientProvider>
            <Header />
            {children}
            <Footer />
            <OnboardingModal />
            <ScrollProgressIndicator />
            <ChatSupport />
            <SplashScreen />
          </NextIntlClientProvider>
        </Wrapper>
      </body>
    </html>
  );
}
