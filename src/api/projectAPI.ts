import api from './api';
import { Project } from '../types/script';

interface ProjectsResponse {
  message?: string;
  projects?: Project[];
  data?: Project[];
}

interface ProjectResponse {
  message?: string;
  project?: Project;
  data?: Project;
}

async function getAllProjects(): Promise<Project[]> {
  const response: ProjectsResponse = await api.get('/projects?page=1&limit=5');
  return (response.projects || response.data || []) as Project[];
}

async function getProjectById(id: string): Promise<Project> {
  const response: ProjectResponse = await api.get(`/projects/${id}`);
  return (response.project || response.data) as Project;
}

async function createProject(projectData: Partial<Project> | FormData): Promise<Project> {
  const response: ProjectResponse = await api.post('/projects', projectData , {
    headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
  return (response.project || response.data) as Project;
}

async function updateProject(id: string, projectData: Partial<Project> | FormData): Promise<Project> {
  const response: ProjectResponse = await api.put(`/projects/${id}`, projectData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
  });
  return (response.project || response.data) as Project;
}

async function deleteProject(id: string): Promise<void> {
  await api.delete(`/projects/${id}`);
}

const ProjectAPI = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};

export default ProjectAPI;