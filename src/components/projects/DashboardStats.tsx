
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectStatus } from "@/types/project";
import { useProjects } from "@/context/ProjectContext";

export function DashboardStats() {
  const { projects, loading } = useProjects();
  
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status === "active").length;
  const lockedProjects = projects.filter(p => p.status === "locked").length;
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
      <StatCard 
        title="Total Projects" 
        value={loading ? "-" : totalProjects.toString()} 
        loading={loading}
      />
      <StatCard 
        title="Active Projects" 
        value={loading ? "-" : activeProjects.toString()} 
        type="active"
        loading={loading}
      />
      <StatCard 
        title="Locked Projects" 
        value={loading ? "-" : lockedProjects.toString()} 
        type="locked"
        loading={loading}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  type?: ProjectStatus;
  loading?: boolean;
}

function StatCard({ title, value, type, loading = false }: StatCardProps) {
  let bgClass = "bg-card";
  let textClass = "text-card-foreground";
  
  if (type === "active") {
    bgClass = "bg-green-50";
    textClass = "text-green-800";
  } else if (type === "locked") {
    bgClass = "bg-red-50";
    textClass = "text-red-800";
  }
  
  return (
    <Card className={`${bgClass} border shadow-sm`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${textClass}`}>
          {loading ? (
            <div className="h-8 w-12 bg-gray-200 animate-pulse rounded" />
          ) : (
            value
          )}
        </div>
      </CardContent>
    </Card>
  );
}
