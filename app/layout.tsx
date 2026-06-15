import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import OnboardingModal from "@/components/landing/OnboardingModal";
import Wrapper from "@/components/Wrapper";
import ScrollProgressIndicator from "@/components/landing/ScrollProgressIndicator";
import ChatSupport from "@/components/landing/ChatSupport";

export const metadata: Metadata = {
  title: "نوین دیجیتال | آژانس بازاریابی دیجیتال",
  description:
    "با استراتژی‌های هوشمند دیجیتال مارکتینگ، برند خود را به سطح بالاتری ببرید.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
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
          <Header />
          {children}
          <Footer />
          <OnboardingModal />
          <ScrollProgressIndicator />
          <ChatSupport />
        </Wrapper>
      </body>
    </html>
  );
}
