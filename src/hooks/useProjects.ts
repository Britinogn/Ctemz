import { ref, onMounted } from "vue";
import type { Project } from "../types/script";
import ProjectAPI from "../api/projectAPI";

function useProjects(id?: string) {
    const projects = ref<Project[]>([]);
     const project = ref<Project | null>(null); // Separate ref for single project
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);

    async function fetchProjects() {
        try {
            loading.value = true;
            const data = await ProjectAPI.getAllProjects();
            projects.value = data;
            error.value = null;
        } catch (err) {
            console.error(err);
            error.value = "Failed to fetch projects";
        } finally {
            loading.value = false;
        }
    }

    async function fetchProjectById(id: string) {
        try {
            loading.value = true;
            const data = await ProjectAPI.getProjectById(id);
            project.value = data;
            error.value = null;
        } catch (err) {
            console.error(err);
            error.value = "Failed to fetch projects";
        } finally {
            loading.value = false;
        }
    }

    async function refetch() {
        if (id) {
            await fetchProjectById(id);
        } else {
            await fetchProjects();
        }
    }

    onMounted(() => {
        if (id) {
            fetchProjectById(id);
        } else {
            fetchProjects();
        }
    });

    return { projects,  project,  loading, error, refetch };
}

export default useProjects;