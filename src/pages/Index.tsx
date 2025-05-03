
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardStats } from "@/components/projects/DashboardStats";
import { ProjectsTable } from "@/components/projects/ProjectsTable";
import { ApiTester } from "@/components/api/ApiTester";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <DashboardLayout>
      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="bg-black/50">
          <TabsTrigger value="projects" className="data-[state=active]:bg-talyawy-purple/20">Projects</TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-talyawy-purple/20">API & Implementation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-6">
          <DashboardStats />
          <ProjectsTable />
        </TabsContent>
        
        <TabsContent value="api">
          <ApiTester />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
