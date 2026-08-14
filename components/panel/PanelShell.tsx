"use client";

import { useEffect, useState, type ReactNode } from "react";
import PanelSidebar from "@/components/panel/PanelSidebar";
import PanelHeader from "@/components/panel/PanelHeader";
import Breadcrumb from "@/components/landing/Breadcrumb";

const COLLAPSED_KEY = "freelance-panel-sidebar-collapsed";

export default function PanelShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(
        window.localStorage.getItem(COLLAPSED_KEY) === "1",
      );
    } catch {
      // storage unavailable — keep expanded
    }
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // storage unavailable — keep in memory
      }
      return next;
    });
  };

  return (
    <div
      className="min-h-screen bg-bg"
      style={{
        backgroundImage: `radial-gradient(color-mix(in srgb, var(--color-foreground) 14%, transparent) 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
      }}>
      <PanelSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />
      <div
        className={`relative transition-[padding] duration-300 ease-in-out ${
          collapsed ? "lg:ps-20" : "lg:ps-64"
        }`}>
        <PanelHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <Breadcrumb withHomeIcon />
          {children}
        </main>
      </div>
    </div>
  );
}