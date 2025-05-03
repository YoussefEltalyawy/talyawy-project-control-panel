
export type ProjectStatus = "active" | "locked";

export interface Project {
  id: string;
  name: string;
  license_key: string;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectStatusResponse {
  status: ProjectStatus | "error";
  message?: string;
}
