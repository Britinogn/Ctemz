<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useProjects from '@/hooks/useProjects'

const { projects, loading, error, refetch } = useProjects()
const router = useRouter()

const currentPage = ref(1)
const itemsPerPage = ref(window.innerWidth < 768 ? 1 : 2)

// Update layout on resize
onMounted(() => {
  window.addEventListener('resize', () => {
    itemsPerPage.value = window.innerWidth < 768 ? 1 : 2
  })
})

const totalPages = computed(() =>
  Math.ceil(projects.value.length / itemsPerPage.value)
)

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return projects.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<template>
  <section
    id="projects"
    class="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white py-20 px-6 md:px-12"
  >
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center space-y-3">
        <h1 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          My Projects
        </h1>
        <p class="text-gray-400 text-lg">A selection of my recent work</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-32">
        <div class="text-gray-400">Loading projects...</div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center text-red-400">
        <p>{{ error }}</p>
        <button
          @click="refetch"
          class="mt-3 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition"
        >
          Retry
        </button>
      </div>

      <!-- Projects -->
      <div v-else-if="projects.length">
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-300"
        >
          <div
            v-for="project in paginatedProjects"
            :key="project._id"
            class="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:scale-[1.01] transition-all duration-300"
          >
            <div class="relative">
              <img
                :src="project.imageURL?.[0]?.url || 'https://via.placeholder.com/400x250?text=No+Image'"
                alt="project image"
                class="w-full h-56 object-cover"
              />
            </div>
            <div class="p-6 space-y-4">
              <h3 class="text-2xl font-semibold text-white">
                {{ project.title }}
              </h3>
              <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {{ project.description }}
              </p>

              <button
                @click="router.push({ name: 'ProjectDetails', params: { id: project._id } })"
                class="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-semibold rounded-md hover:opacity-90 transition"
              >
                View Project
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-6 mt-12">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-md bg-white/10 text-gray-300 hover:bg-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>

          <span class="text-gray-400">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-md bg-white/10 text-gray-300 hover:bg-white/20 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      </div>

      <!-- Empty -->
      <div v-else class="text-center text-gray-400 py-20">
        No projects available yet.
      </div>
    </div>
  </section>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
