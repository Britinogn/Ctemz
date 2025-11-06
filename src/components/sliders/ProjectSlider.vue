<template>
  <section
    id="projects-teaser"
    class="relative py-20 bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <!-- Heading -->
      <!-- <div class="flex justify-between items-center mb-10">
        <h2 class="text-3xl md:text-4xl font-bold">
          Glimpse of <span class="text-[var(--color-primary)]">My Projects</span>
        </h2>
        <router-link
          to="/projects"
          class="text-[var(--color-primary)] hover:underline font-medium"
        >
          View All →
        </router-link>
      </div> -->

      <!-- Loading State -->
      <div v-if="isLoading" class="text-center text-[var(--text-secondary)] py-20 animate-pulse">
        Loading projects...
      </div>

      <!-- Slider -->
      <Swiper
        v-else
        :modules="[Pagination, Autoplay]"
        :slides-per-view="1.3"
        :space-between="20"
        :loop="true"
        :speed="800"
        :grab-cursor="true"
        :breakpoints="{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3.2 }
        }"
        pagination
        :autoplay="{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true }"
        class="project-swiper"
      >
        <SwiperSlide
          v-for="project in projects"
          :key="project._id"
          class="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 cursor-grab active:cursor-grabbing group"
        >
          <div class="relative h-56 md:h-64 rounded-t-xl overflow-hidden">
            <img
              :src="project.imageURL?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image'"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Autoplay } from 'swiper/modules'
import ProjectAPI from '@/api/projectAPI'
import type { Project } from '@/types/script'

const projects = ref<Project[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    projects.value = await ProjectAPI.getAllProjects()
  } catch (err) {
    console.error('Error fetching projects:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.project-swiper {
  padding-bottom: 2.5rem;
}

.project-swiper :deep(.swiper-pagination-bullet) {
  background: var(--text-secondary);
  opacity: 0.4;
  transition: all 0.3s ease;
}

.project-swiper :deep(.swiper-pagination-bullet-active) {
  background: var(--color-primary);
  opacity: 1;
}

/* Subtle zoom effect */
.swiper-slide {
  transform: scale(0.95);
  transition: transform 400ms ease, box-shadow 400ms ease;
}

.swiper-slide-active {
  transform: scale(1);
  box-shadow: 0 0 20px -5px var(--color-primary);
}
</style>
