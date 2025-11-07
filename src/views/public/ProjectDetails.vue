<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref   } from 'vue';
import useProjects from '@/hooks/useProjects'; // Adjust path as needed
import { Project } from '@/types/script';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'; // Assuming Heroicons; install if needed

const router = useRouter();
const route = useRoute();
const projectId = route.params.id as string;

// Destructure INCLUDING 'project' – this exposes it to the template
const { project, projects, loading, error, refetch } = useProjects(projectId);

// List of all projects (fallback empty array to avoid "Cannot find name 'allProjects'" errors)
//const allProjects = ref<Project[]>([]);

// Image error handling
const imageErrors = ref<Record<string, boolean>>({});

const getProjectImage = (project: Project) => {
    const url = project.imageURL?.[0]?.url;
    return url && typeof url === 'string' ? url : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400&q=80';
};

const handleImageError = (event: Event, project: Project) => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
    if (project._id) imageErrors.value[project._id] = true;
};


const goBack = () => {
  router.back(); // Navigates to the previous history entry
};

const goForward = () => {
  if (!projects.value.length || !project.value?._id) return; // Early exit if no data

  const currentIndex = projects.value.findIndex(p => p._id === project.value!._id);
  if (currentIndex === -1) return; // Guard against no match (prevents invalid nextIndex)

  const nextIndex = (currentIndex + 1) % projects.value.length;
  
  // Type guard: Ensure nextIndex is valid before access
  if (nextIndex < 0 || nextIndex >= projects.value.length || !projects.value[nextIndex]) return;
  
  const nextProjectId = projects.value[nextIndex]._id; // Now type-safe

  router.push(`/project/${nextProjectId}`);
};

</script>



<template>
    <section class="relative min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    
        <!-- Animated Background -->
        <div class="absolute inset-0 opacity-20">
            <div class="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
            <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
        </div>

        <div class="relative z-10 max-w-7xl mx-auto">
    
            <!-- Section Title -->
            <div class="text-center mb-16 animate-fade-in">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-white bg-clip-text text-transparent mb-4">
                {{ project?.title || 'Project Details' }}
            </h1>
            <div class="w-24 h-1 bg-linear-to-r from-orange-500 to-yellow-500 mx-auto rounded-full"></div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-orange-200/50 border-t-orange-400 rounded-full animate-spin"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-8 h-8 bg-orange-500/20 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center p-4">
                <div class="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
                    <ExclamationCircleIcon class="h-6 w-6 text-red-400 mx-auto mb-4" />
                    <h3 class="text-lg font-semibold text-white mb-2">Something went wrong</h3>
                    <p class="text-gray-300 mb-4">{{ error }}</p>
                    <button
                        @click="refetch"
                        class="px-4 py-2 bg-linear-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
                    >
                        Retry
                    </button>
                </div>
            </div>

            <!-- Project Details -->
            <div v-else-if="project" class="animate-slide-in-up max-w-4xl mx-auto">
                <div class=" backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-xl p-8 space-y-8">
                    
                <!-- Main Image -->
                <div class="relative overflow-hidden bg-black/20 rounded-xl">
                    <img 
                    :src="getProjectImage(project)" 
                    :alt="project.title"
                    class="w-full h-96 object-cover"
                    loading="lazy"
                    @error="handleImageError($event, project)"
                    />
                    <!-- Fallback Overlay -->
                <div 
                v-if="imageErrors[project._id]"
                class="absolute inset-0 bg-linear-to-br from-gray-800 to-black flex items-center justify-center"
                >
                <div class="text-center text-gray-400">
                    <svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm">No Image Available</p>
                </div>
                </div>
                </div>

                <!-- Content -->
                <!-- Project Details Card -->
                <div class="shadow-lg">
                    <div class="space-y-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50  ">
                        <!-- Description -->
                        <div class="border-b pb-5 border-b-gray-400">
                            <h3 class="text-lg font-semibold text-white mb-2">Description</h3>
                            <p class="text-gray-300 leading-relaxed text-sm">
                                {{ project.description }}
                            </p>
                        </div>

                        <!-- Technologies -->
                        <div v-if="project.techStack && project.techStack.length > 0" 
                            class="border-b pb-5 border-b-gray-400"
                        >
                            <h3 class="text-lg font-semibold text-white mb-2">Technologies</h3>
                            <div class="flex flex-wrap gap-2">
                                <span
                                v-for="(tech, index) in project.techStack"
                                :key="index"
                                class="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30"
                                >
                                {{ tech }}
                                </span>
                            </div>
                        </div>

                        <div class="md:flex " >

                            <!-- Date -->
                            <div v-if="project.yearBuilt" class="text-center">
                                <h3 class="text-lg font-semibold text-white mb-2">Date</h3>
                                <p class="text-gray-400 text-sm">{{ project.yearBuilt }}</p>
                            </div>

                            <!-- Type -->
                            <div v-if="project.category">
                                <h3 class="text-lg font-semibold text-white mb-2">Type</h3>
                                <span class="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold border border-orange-500/30">
                                    {{ project.category }}
                                </span>
                            </div>

                            <!-- Client -->
                            <div v-if="project.title">
                                <h3 class="text-lg font-semibold text-white mb-2">Client</h3>
                                <p class="text-gray-400 text-sm">{{ project.title }}</p>
                            </div>

                        </div>

                    </div>

                    <!-- Actions -->
                    <div class="flex flex-wrap items-center gap-4 pt-6 justify-between">
                        
                        <!-- Previous Button -->
                        <button
                            @click="goBack"
                            class="px-4 py-3 cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white rounded-lg hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                            aria-label="Previous project"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            <span class="hidden sm:inline">Previous</span>
                        </button>

                        <!-- Links Container -->
                        <div class="flex items-center gap-3">
                            <!-- GitHub Icon -->
                            <a
                                v-if="project?.githubUrl"
                                :href="project.githubUrl"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 rounded-lg transition-all duration-300 group"
                                aria-label="View on GitHub"
                            >
                                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <!-- <span  class="p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg opacity-50">
                                <svg class="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </span> -->

                            <!-- Live URL Icon -->
                            <a
                                v-if="project?.liveURL"
                                :href="project.liveURL"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="p-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 rounded-lg transition-all duration-300 group"
                                aria-label="View live demo"
                            >
                                <svg class="w-6 h-6 text-gray-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                            <!-- <span  class="p-3 bg-gray-800/30 backdrop-blur-sm border border-gray-700/30 rounded-lg opacity-50">
                                <svg class="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </span> -->
                        </div>

                        <!-- Next Button -->
                        <button
                            @click="goForward"
                            :disabled="loading || !project"
                            class="px-4 py-3 cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white rounded-lg hover:bg-gray-700/50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                            aria-label="Next project"
                        >
                            <span class="hidden sm:inline">Next</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                    </div>

                </div>
                
            </div>
            </div>

            <!-- Not Found -->
            <div v-else class="min-h-[60vh] flex items-center justify-center text-center">
                <div class="text-gray-400">
                <h3 class="text-2xl font-semibold mb-2">Project not found</h3>
                <p class="text-lg mb-4">The requested project doesn't exist.</p>
                <button 
                    @click="$router.back()"
                    class="px-6 py-3 bg-linear-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-full hover:from-orange-600 hover:to-yellow-600"
                >
                    Go Back
                </button>
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
@keyframes slideInUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in { animation: fadeIn 1s ease-out; }
.animate-slide-in-up { animation: slideInUp 0.8s ease-out; }
</style>