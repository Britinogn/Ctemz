
<script setup lang="ts">
    //import { computed, onMounted } from 'vue';
    import { useRouter  } from 'vue-router';
    import useProjects from '@/hooks/useProjects';  // Fixed import path (assuming file is useProjects.ts)
    import { XIcon } from 'lucide-vue-next';
    
    // Use the composable hook directly
    const {projects , loading, error ,  refetch } = useProjects();

    // Uncomment/use router if needed
    const router = useRouter();

    // Optional: Manual refetch on mount (hook already handles initial fetch)
    // onMounted(() => {
    //     refetch();
    // });
</script>


<template>
    <section class="relative min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    
        <!-- Animated Background (reuse from About Me) -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
            <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto">
    
            <!-- Section Title (styled like About Me header) -->
            <div class="text-center mb-16 animate-fade-in">
                <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-linear-to-r text-[-var(--text-primary)] bg-clip-text  mb-4">
                    Projects
                </h1>
                <div class="w-24 h-1 bg-linear-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
            </div>


            <!-- Loading State (dark-themed) -->
            <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
                <div class="relative">
                <div class="w-16 h-16 border-4 border-orange-200/50 border-t-orange-400 rounded-full animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-8 h-8 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
                </div>
            </div>

            <!-- Error State (dark-themed) -->
            <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center p-4">
                <div class="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 p-6 rounded-xl shadow-2xl max-w-md w-full">
                <div class="flex items-start">
                    <ExclamationCircleIcon class="h-6 w-6 text-red-400 mr-3 shrink-0 flex-shrink-0" />
                    <div>
                    <h3 class="text-lg font-semibold text-white mb-1">Something went wrong</h3>
                    <p class="text-gray-300">{{ error }}</p>
                    </div>
                </div>
                <button
                    @click="refetch"
                    class="mt-4 px-4 py-2 bg-linear-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                >
                    Retry
                </button>
                </div>
            </div>

            <!-- Projects Grid -->
            <div v-else-if="projects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <article 
                    v-for="project in projects"
                    :key="project._id"
                    :aria-label="`Project: ${project.title}`"
                    class="group cursor-pointer"
                >
                    <div 
                        @click="router.push({ name: 'ProjectDetails', params: { id: project._id } })"
                        class="bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-orange-500/30 transition-all duration-500 hover:scale-105"
                    >
                        <!-- Project Image -->
                        <div class="relative overflow-hidden bg-black/20">
                        <img 
                            :src="project.imageURL?.[0]?.url || 'https://via.placeholder.com/400x200?text=No+Image'" 
                            :alt="project.title"
                            class="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                        />
                        <!-- Overlay for hover effect -->
                        <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>  

                        <!-- Project Content -->
                        <div class="p-6 space-y-4">
                        <!-- Title & Category -->
                        <div class="space-y-2">
                            <h3 class="text-xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                            {{ project.title }}
                            </h3>
                            <span class="inline-block px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                            {{ project.category }}
                            </span>
                        </div>

                        <!-- Description -->
                        <p class="text-gray-300 leading-relaxed line-clamp-3">
                            {{ project.description }}
                        </p>

                        <!-- View Button (inside card, but non-clickable to avoid double-trigger; styled as accent) -->
                        <button 
                            @click.stop="router.push({ name: 'ProjectDetails', params: { id: project._id } })"
                            class="btn btn-primary "
                        >
                            <span>View Project</span>
                        </button>
                        </div>
                    </div>
            </article>
            </div>

            <!-- Empty State -->
            <div v-else class="min-h-[60vh] flex items-center justify-center text-center">
                <div class="text-gray-400">
                <h3 class="text-2xl font-semibold mb-2">No projects yet</h3>
                <p class="text-lg">Check back soon for some exciting work!</p>
                </div>
            </div>

        </div>
    </section>
</template>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

/* Line clamp for description (3 lines) */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* .animate-fade-in {
    animation: fadeIn 1s ease-out;
} */
</style>


<!-- <style>


</style> -->