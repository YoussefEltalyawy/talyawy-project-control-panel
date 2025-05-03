
import { Project } from "@/types/project";
import { mockProjects } from "@/data/mockProjects";
import { ProjectStatusResponse } from "@/types/project";

// This would be a Next.js API route
// In a real app, you would use Supabase or another database
export async function checkProjectStatus(licenseKey: string): Promise<ProjectStatusResponse> {
  try {
    // In a real app, we would check the database for the license key
    const project = mockProjects.find(p => p.license_key === licenseKey);
    
    if (!project) {
      return {
        status: "error",
        message: "Project not found"
      };
    }
    
    if (project.status === "locked") {
      return {
        status: "locked",
        message: "Project is locked due to payment issue."
      };
    }
    
    return {
      status: "active"
    };
  } catch (error) {
    console.error("Error checking project status:", error);
    return {
      status: "error",
      message: "An unexpected error occurred"
    };
  }
}

// Add a function to handle GET parameters for API consumption
export async function getProjectStatus(url: string, licenseKey: string): Promise<ProjectStatusResponse> {
  try {
    // In a real app, this would make a fetch call to your API
    // const response = await fetch(`${url}/api/project-status?license=${licenseKey}`);
    // const data = await response.json();
    // return data;
    
    // For now, we'll directly use the checkProjectStatus function
    return await checkProjectStatus(licenseKey);
  } catch (error) {
    console.error("Error fetching project status:", error);
    return {
      status: "error",
      message: "An error occurred while checking project status"
    };
  }
}
