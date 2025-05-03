
import { Project } from "@/types/project";
import { v4 as uuidv4 } from "uuid";

export const mockProjects: Project[] = [
  {
    id: uuidv4(),
    name: "Ecommerce Platform",
    license_key: uuidv4(),
    status: "active",
    created_at: new Date(2023, 1, 15).toISOString(),
    updated_at: new Date(2023, 4, 22).toISOString(),
  },
  {
    id: uuidv4(),
    name: "Portfolio Website",
    license_key: uuidv4(),
    status: "active",
    created_at: new Date(2023, 3, 5).toISOString(),
    updated_at: new Date(2023, 3, 5).toISOString(),
  },
  {
    id: uuidv4(),
    name: "Client Dashboard",
    license_key: uuidv4(),
    status: "locked",
    created_at: new Date(2022, 11, 10).toISOString(),
    updated_at: new Date(2023, 5, 1).toISOString(),
  }
];
