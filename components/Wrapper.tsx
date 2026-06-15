"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
export default function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div>
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
