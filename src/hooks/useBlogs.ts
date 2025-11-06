import { ref, onMounted } from "vue";
import type { Project } from "../types/script";
import ProjectAPI from "../api/projectAPI";

function useProjects() {
    const projects = ref<Project[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);

    async function fetchBlogs() {
        try {
            loading.value = true;
            const data = await ProjectAPI.getAllProjects();
            projects.value = data;
            error.value = null;
        } catch (err) {
            console.error(err);
            error.value = "Failed to fetch blogs";
        } finally {
            loading.value = false;
        }
    }

    async function refetch() {
        await fetchBlogs();
    }

    onMounted(() => {
        fetchBlogs();
    });

    return { projects, loading, error, refetch };
}

export  default useProjects;