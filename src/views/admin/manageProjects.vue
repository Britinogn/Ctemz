<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Projects Management</h1>
        <p class="text-gray-600 mt-2">Manage your portfolio projects</p>
      </div>
      <button 
        @click="openCreateModal" 
        class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:-translate-y-0.5"
      >
        <PlusIcon />
        <span>Add Project</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center gap-4 p-16 text-gray-500">
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p>Loading projects...</p>
    </div>

    <!-- Projects Grid -->
    <div v-else-if="projects.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project._id" 
        class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        <!-- Image -->
        <div class="relative w-full h-48 overflow-hidden bg-gray-100">
            <img 
                :src="project.imageURL?.[0]?.url || 'https://via.placeholder.com/300x200?text=No+Image'" 
                :alt="project.title"
                class="w-full h-full object-cover"
            />
            <!-- Show count if multiple images -->
            <div v-if="project.imageURL && project.imageURL.length > 1" class="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                +{{ project.imageURL.length - 1 }} more
            </div>
        </div>

        <!-- Content -->
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ project.title }}</h3>
          <p class="text-sm text-blue-600 font-medium mb-2">{{ project.category || 'Uncategorized' }}</p>
          <p class="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">{{ project.description }}</p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="(tech, index) in project.techStack.slice(0, 3)" 
              :key="index"
              class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {{ tech }}
            </span>
            <span 
              v-if="project.techStack.length > 3"
              class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              +{{ project.techStack.length - 3 }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button 
              @click="openUpdateModal(project)" 
              class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              <EditIcon />
              Edit
            </button>
            <button 
              @click="confirmDelete(project)" 
              class="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-transparent text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
            >
              <TrashIcon />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 bg-gray-50 rounded-lg">
      <p class="text-gray-500 text-lg mb-4">No projects yet</p>
      <button 
        @click="openCreateModal"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Create Your First Project
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <ProjectsModal
      v-if="showModal"
      :project="selectedProject"
      @close="closeModal"
      @save="handleSave"
    />

    <!-- Delete Confirmation Modal -->
    <confirmModal
      v-if="showDeleteModal"
      title="Delete Project"
      :message="`Are you sure you want to delete '${projectToDelete?.title}'? This action cannot be undone.`"
      @confirm="handleDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProjectAPI from '@/api/projectAPI';
import { Project } from '@/types/script';
import ProjectsModal from '@/components/modals/projectsModal.vue';
import confirmModal from '@/components/modals/confirmModal.vue';
import { PlusIcon, TrashIcon, EditIcon } from 'lucide-vue-next';

// State
const projects = ref<Project[]>([]);
const isLoading = ref<boolean>(false);
const showModal = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const selectedProject = ref<Project | null>(null);
const projectToDelete = ref<Project | null>(null);

// Methods
async function fetchProjects() {
  isLoading.value = true;
  try {
    const data = await ProjectAPI.getAllProjects();
    projects.value = (data as any).projects ?? data;
  } catch (error: any) {
    console.error('Error fetching projects:', error);
  } finally {
    isLoading.value = false;
  }
}

function openCreateModal() {
  selectedProject.value = null;
  showModal.value = true;
}

function openUpdateModal(project: Project) {
  selectedProject.value = project;
  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
  selectedProject.value = null;
}

async function handleSave() {
  await fetchProjects();
  closeModal();
}

function confirmDelete(project: Project) {
  projectToDelete.value = project;
  showDeleteModal.value = true;
}

async function handleDelete() {
  const id = projectToDelete.value?._id;
  if (!id) {
    console.warn('No project selected to delete.');
    showDeleteModal.value = false;
    projectToDelete.value = null;
    return;
  }

  try {
    await ProjectAPI.deleteProject(id);
    projects.value = projects.value.filter((p) => p._id !== id);
    showDeleteModal.value = false;
    projectToDelete.value = null;
    selectedProject.value = null;
  } catch (error: any) {
    console.error('Error deleting project:', error);
  }
}

onMounted(() => {
  fetchProjects();
});
</script>