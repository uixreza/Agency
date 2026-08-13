"use client";

import { useState, type ReactNode } from "react";
import PanelSidebar from "@/components/panel/PanelSidebar";
import PanelHeader from "@/components/panel/PanelHeader";
import Breadcrumb from "@/components/landing/Breadcrumb";

export default function PanelShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg">
      <PanelSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ps-64">
        <PanelHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl">
          <Breadcrumb withHomeIcon />
          {children}
        </main>
      </div>
    </div>
  );
}