
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddProjectDialog } from "@/components/projects/AddProjectDialog";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
        <p className="text-muted-foreground">Manage your Talyawy projects</p>
      </div>
      
      <AddProjectDialog>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          <span>New Project</span>
        </Button>
      </AddProjectDialog>
    </div>
  );
}
