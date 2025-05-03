
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Project, ProjectStatus } from "@/types/project";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/components/ui/sonner";
import { mockProjects } from "@/data/mockProjects";

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (name: string) => Promise<void>;
  toggleStatus: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load projects - this would eventually come from Supabase
    const loadProjects = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setProjects(mockProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const addProject = async (name: string) => {
    try {
      const newProject: Project = {
        id: uuidv4(),
        name,
        license_key: uuidv4(),
        status: "active",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // In a real app, we would save to Supabase here
      setProjects(prev => [newProject, ...prev]);
      toast.success("Project created successfully");
    } catch (error) {
      console.error("Error adding project:", error);
      toast.error("Failed to create project");
      throw error;
    }
  };

  const toggleStatus = async (id: string) => {
    try {
      setProjects(prev => 
        prev.map(project => {
          if (project.id === id) {
            const newStatus: ProjectStatus = project.status === "active" ? "locked" : "active";
            return {
              ...project,
              status: newStatus,
              updated_at: new Date().toISOString()
            };
          }
          return project;
        })
      );
      
      toast.success("Project status updated");
    } catch (error) {
      console.error("Error toggling project status:", error);
      toast.error("Failed to update project status");
      throw error;
    }
  };

  const deleteProject = async (id: string) => {
    try {
      setProjects(prev => prev.filter(project => project.id !== id));
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
      throw error;
    }
  };

  return (
    <ProjectContext.Provider value={{ 
      projects, 
      loading, 
      addProject,
      toggleStatus,
      deleteProject
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  
  return context;
}
