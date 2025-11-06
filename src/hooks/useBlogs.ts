


import { ref, onMounted } from "vue";
import type { Blog } from "../types/script";
import BlogAPI from "../api/blogAPI";

function useBlogs() {
    const blogs = ref<Blog[]>([]);
    const loading = ref<boolean>(true);
    const error = ref<string | null>(null);

    async function fetchBlogs() {
        try {
            loading.value = true;
            const data = await BlogAPI.getAllBlogs();
            blogs.value = data;
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

    return { blogs, loading, error, refetch };
}

export  default useBlogs