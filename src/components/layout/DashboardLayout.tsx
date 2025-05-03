
import React from "react";
import { ProjectProvider } from "@/context/ProjectContext";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardNavBar } from "./DashboardNavBar";
import { DashboardHero } from "./DashboardHero";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <div className="min-h-screen bg-background text-foreground">
        <DashboardNavBar />
        <DashboardHero />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <DashboardHeader />
          <main>{children}</main>
        </div>
      </div>
    </ProjectProvider>
  );
}
