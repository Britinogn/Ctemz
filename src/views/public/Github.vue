<template>
  <section class="min-h-screen bg-black text-white py-20 px-6 md:px-12">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Title -->
      <div class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4">
          GitHub Stats
        </h1>
        <div class="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center min-h-[60vh]">
        <div class="w-16 h-16 border-4 border-orange-200/50 border-t-orange-400 rounded-full animate-spin"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="min-h-[60vh] flex items-center justify-center p-4">
        <div class="bg-gray-900 border border-red-500/30 p-6 rounded-xl shadow-2xl max-w-md w-full text-center">
          <h3 class="text-lg font-semibold text-white mb-2">Something went wrong</h3>
          <p class="text-gray-400 mb-4">{{ error }}</p>
          <button
            @click="refetch"
            class="px-4 py-2 bg-orange-500 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300"
          >
            Refresh Stats
          </button>
        </div>
      </div>

      <!-- Stats Display -->
      <div v-else-if="stats" class="animate-slide-in-up">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          <!-- Left: Profile & Bio -->
          <div class="space-y-6">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
              <img
                :src="stats.avatarUrl"
                :alt="`${stats.username} avatar`"
                class="w-32 h-32 rounded-full border-4 border-orange-500/40 shadow-lg object-cover"
              />
              <div class="text-center md:text-left">
                <h2 class="text-3xl md:text-4xl font-extrabold text-orange-400 mb-2">
                  {{ stats.username }}
                </h2>
                <p v-if="stats.bio" class="text-gray-300 text-lg italic">{{ stats.bio }}</p>
                <div class="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span v-if="stats.location" class="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    📍 {{ stats.location }}
                  </span>
                  <span v-if="stats.company" class="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    💼 {{ stats.company }}
                  </span>
                  <a
                    v-if="stats.blog"
                    :href="stats.blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="px-3 py-1 bg-gray-800 text-orange-400 rounded-full text-sm hover:bg-gray-700 transition"
                  >
                    🌐 Blog
                  </a>
                </div>
              </div>
            </div>

            <!-- Followers/Following -->
            <div class="grid grid-cols-2 gap-4 p-6 bg-gray-900 rounded-2xl border border-white/10">
              <div class="text-center">
                <p class="text-3xl font-bold text-orange-400">{{ stats.followers }}</p>
                <p class="text-gray-400 text-sm uppercase tracking-wide">Followers</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-yellow-400">{{ stats.following }}</p>
                <p class="text-gray-400 text-sm uppercase tracking-wide">Following</p>
              </div>
            </div>

            <!-- Last Updated -->
            <div class="text-center md:text-left text-gray-500 text-sm">
              Last updated: {{ formatDate(stats.lastUpdated) }}
              <button
                @click="refetch"
                class="ml-4 px-3 py-2 bg-orange-500 text-black font-semibold rounded-full text-xs hover:bg-yellow-500 transition-all duration-300"
              >
                Refresh
              </button>
            </div>
          </div>

          <!-- Right: Repo & Language Stats -->
          <div class="space-y-6">
            <!-- Repo Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-900 rounded-2xl border border-white/10">
              <div class="text-center">
                <p class="text-3xl font-bold text-orange-400">{{ stats.totalRepos }}</p>
                <p class="text-gray-400 text-sm uppercase tracking-wide">Repos</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-yellow-400">{{ stats.totalStars }}</p>
                <p class="text-gray-400 text-sm uppercase tracking-wide">Stars</p>
              </div>
              <div class="text-center">
                <p class="text-3xl font-bold text-orange-300">{{ stats.totalForks }}</p>
                <p class="text-gray-400 text-sm uppercase tracking-wide">Forks</p>
              </div>
            </div>

            <!-- Languages -->
            <div v-if="stats.languages.length" class="p-4 bg-gray-900 rounded-xl border border-orange-500/20">
              <p class="text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wide">Languages Used</p>
              <marquee behavior="scroll" direction="left" scrollamount="4" class="flex gap-4">
                <span
                  v-for="lang in stats.languages"
                  :key="lang"
                  class="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-semibold whitespace-nowrap"
                >
                  {{ lang }}
                </span>
              </marquee>
            </div>

            <!-- GitHub Link -->
            <div class="text-center">
              <a
                :href="`https://github.com/${stats.username}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block px-6 py-3 bg-orange-500 hover:bg-yellow-500 text-black font-semibold rounded-lg transition duration-300"
              >
                View on GitHub
              </a>
            </div>
          </div>

        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="min-h-[60vh] flex items-center justify-center text-center">
        <div class="text-gray-400">
          <h3 class="text-2xl font-semibold mb-2">No stats available</h3>
          <p class="text-lg">Fetch some GitHub data to get started!</p>
          <button
            @click="refetch"
            class="mt-4 px-6 py-2 bg-orange-500 text-black font-bold rounded-full hover:bg-yellow-500 transition-all duration-300"
          >
            Load Stats
          </button>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import type { GithubStats } from '@/types/script'

const stats = ref<GithubStats | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

//const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://britinogn.onrender.com/api';


async function fetchStats(useCache = true) {
  const endpoint = useCache ? '/github/cached' : '/github'
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`${API_BASE_URL}${endpoint}`)
    stats.value = response.data.stats
  } catch (err: any) {
    console.error('Error fetching GitHub stats:', err)
    error.value = err.response?.data?.error || 'Failed to load GitHub stats'
  } finally {
    loading.value = false
  }
}

const refetch = () => fetchStats(false)

const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

onMounted(() => {
  fetchStats(true)
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
.animate-slide-in-up {
  animation: slideInUp 0.8s ease-out;
}
</style>
