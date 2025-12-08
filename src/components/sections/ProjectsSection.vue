<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useProjects from '@/hooks/useProjects'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const { projects, loading, error, refetch } = useProjects()
const router = useRouter()

onMounted(() => {
  const handleResize = () => {
    // Optional: Swiper handles responsive breakpoints automatically
  }
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <section
    id="projects"
    class="min-h-screen bg-black text-white py-20 px-6 md:px-12"
  >
    <div class="max-w-7xl mx-auto space-y-12">
      <!-- Header -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
          My Projects
        </h1>
        <div class="w-24 h-1 bg-white/70 mb-2 mx-auto rounded-full"></div>
        <p class="text-gray-400 text-lg">A selection of my recent work</p>
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

      <!-- Er ror State -->
      <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center p-4">
        <div class="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
          <ExclamationCircleIcon class="h-6 w-6 text-red-400 mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-white mb-2">Something went wrong</h3>
          <p class="text-gray-300 mb-4">{{ error }}</p>
          <button
            @click="refetch"
            class="px-4 py-2 bg-linear-to-r from-black/20 to-lack/50 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Projects Slider -->
      <div v-else-if="projects.length" class="relative">
        <Swiper
          :modules="[Pagination, Autoplay]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :speed="800"
          :grab-cursor="true"
          :breakpoints="{
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.5 }
          }"
          :pagination="{ clickable: true, dynamicBullets: true }"
          :autoplay="{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }"
          class="project-swiper"
        >
          <SwiperSlide
            v-for="project in projects"
            :key="project._id"
            class="relative"
          >
            <div
              class="order-1 md:order-0 md:block relative p-4 bg-white/5 rounded-xl ring-2 ring-white/20 shadow-xl cursor-pointer"
              @click="router.push({ name: 'ProjectDetails', params: { id: project._id } })"
            >
              <!-- Decorative Frame/Backdrop -->
              <!-- <div class="absolute inset-0 bg-linear-to-br from-transparent to-white/20 backdrop-blur-md rounded-xl -z-10 transform -rotate-2 scale-105"></div>
              <div class="absolute -top-6 -left-6 w-10 h-10 bg-[var(--color-primary)] rounded-full opacity-50 blur-sm"></div>
              <div class="absolute -bottom-6 -right-6 w-10 h-10 bg-purple-300 rounded-full opacity-50 blur-sm"></div>
              <div class="absolute top-4 right-4 w-6 h-6 bg-green-300 rounded-full opacity-40"></div> -->

              <!-- Project Image -->
              <div class="relative overflow-hidden bg-black/20">
                <img
                  :src="project.imageURL?.[0]?.url || 'https://via.placeholder.com/400x250?text=No+Image'"
                  :alt="project.title"
                  class="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <!-- Project Content -->
              <div class="p-6 space-y-4">
                <h3 class="text-2xl font-semibold text-white">
                  {{ project.title }}
                </h3>
                <p class="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {{ project.description }}
                </p>
                <button
                  @click="router.push({ name: 'ProjectDetails', params: { id: project._id } })"
                  class="btn btn-primary"
                >
                  View Project
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <!-- Empty State -->
      <div v-else class="min-h-[60vh] flex items-center justify-center text-center text-gray-400">
        <div class="space-y-4">
          <div class="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold">No projects yet</h3>
          <p class="text-lg">Check back soon for some exciting work!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-swiper {
  padding-bottom: 3rem;
}

.project-swiper .swiper-pagination-bullet {
  background: #ffffff;
  opacity: 0.5;
}

.project-swiper .swiper-pagination-bullet-active {
  opacity: 1;
  background: orange;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>