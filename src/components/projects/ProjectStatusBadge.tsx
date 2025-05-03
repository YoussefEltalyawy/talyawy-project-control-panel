
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/types/project";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
}

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  return status === "active" ? (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border border-green-200">
      Active
    </Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border border-red-200">
      Locked
    </Badge>
  );
}
