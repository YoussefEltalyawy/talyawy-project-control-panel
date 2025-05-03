
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectContext";
import { ProjectStatusBadge } from "./ProjectStatusBadge";
import { formatDistanceToNow } from "date-fns";
import { Copy, Lock, Unlock, Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { DeleteProjectDialog } from "./DeleteProjectDialog";
import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsTable() {
  const { projects, loading, toggleStatus } = useProjects();
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleCopyLicense = (licenseKey: string) => {
    navigator.clipboard.writeText(licenseKey);
    toast.success("License key copied to clipboard");
  };

  const handleToggleStatus = async (id: string) => {
    setProcessingId(id);
    try {
      await toggleStatus(id);
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) {
    return <TableSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-md border p-12 text-center">
        <h3 className="text-lg font-medium mb-2">No projects found</h3>
        <p className="text-muted-foreground mb-4">Get started by creating your first project.</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License Key</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id} className="fade-in">
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell className="font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[180px]">{project.license_key}</span>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-6 w-6" 
                    onClick={() => handleCopyLicense(project.license_key)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <ProjectStatusBadge status={project.status} />
              </TableCell>
              <TableCell>
                {formatDistanceToNow(new Date(project.created_at), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => handleToggleStatus(project.id)}
                  disabled={processingId === project.id}
                >
                  {project.status === "active" ? (
                    <>
                      <Lock className="h-3.5 w-3.5 mr-1" />
                      <span>Lock</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="h-3.5 w-3.5 mr-1" />
                      <span>Unlock</span>
                    </>
                  )}
                </Button>
                
                <DeleteProjectDialog project={project}>
                  <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                    <Trash className="h-3.5 w-3.5 mr-1" />
                    <span>Delete</span>
                  </Button>
                </DeleteProjectDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>License Key</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-[120px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[180px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[80px]" /></TableCell>
              <TableCell><Skeleton className="h-5 w-[100px]" /></TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
