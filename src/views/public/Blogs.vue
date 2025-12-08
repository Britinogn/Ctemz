<template>
  <section class="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-6 md:px-12 overflow-hidden">
    <!-- Animated Background -->
    <!-- <div class="absolute inset-0 opacity-20">
      <div class="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse" style="animation-delay: 0.5s;"></div>
    </div> -->

    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Header -->
      <header class="text-center mb-16 animate-fade-in">
        <h1 class="text-5xl md:text-6xl font-extrabold bg-white bg-clip-text text-transparent mb-4">
          My Blog
        </h1>
        <div class="w-24 h-1 mb-2 bg-white/70 mx-auto mt-6 rounded-full"></div>

        <p class="text-gray-300 text-lg max-w-2xl mx-auto">
          Insights, tutorials, and thoughts on web development, design, and technology.
          Updated regularly with practical tips and deep dives.
        </p>
      </header>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-24">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-orange-300/40 border-t-orange-500 rounded-xl animate-spin"></div>
          
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-24">
        <div class="bg-gray-800/70 border border-red-500/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
          <div class="text-4xl mb-3 text-red-400">⚠️</div>
          <p class="text-gray-300 mb-6">{{ error }}</p>
          <button
            @click="refetch"
            class="px-6 py-3 bg-white text-black font-semibold rounded-full hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>

      <!-- Blogs Grid -->
      <div v-else class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 animate-slide-in-up">
        <article
          v-for="blog in blogs"
          :key="blog._id"
          class="group bg-gray-800/50 border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:border-orange-400/30 transition-all duration-500 transform hover:-translate-y-2"
        >
          <!-- Blog Image -->
          <div class="relative overflow-hidden">
            <img
              v-if="blog.imageURL"
              :src="blog.imageURL.url"
              :alt="blog.title"
              class="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <!-- Blog Details -->
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-sm text-gray-400">
                {{ new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
              </span>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-full"
                :class="blog.platform === 'Medium' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'"
              >
                {{ blog.platform }}
              </span>
            </div>

            <h2 class="text-xl font-bold mb-3 line-clamp-2 bg-white bg-clip-text text-transparent group-hover:from-orange-500 group-hover:to-yellow-600 transition-all duration-300">
              {{ blog.title }}
            </h2>

            <p class="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
              {{ blog.description }}
            </p>

            <!-- External Read More Link -->
            <a
              :href="blog.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-300 font-semibold transition-all"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div v-if="blogs.length > 0" class="flex justify-center mt-16">
        <nav class="flex items-center space-x-4">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span class="px-5 py-2 rounded-lg bg-white text-black font-bold shadow">
            Page {{ currentPage }}
          </span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 font-medium hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import BlogAPI from '@/api/blogAPI';
import type { Blog } from '@/types/script';

const blogs = ref<Blog[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const itemsPerPage = 6;

const totalPages = computed(() => Math.ceil(blogs.value.length / itemsPerPage));

const fetchBlogs = async () => {
  try {
    loading.value = true;
    error.value = null;
    const data = await BlogAPI.getAllBlogs();
    blogs.value = data;
  } catch (err) {
    console.error('Error fetching blogs:', err);
    error.value = 'Failed to load blogs. Please try again.';
  } finally {
    loading.value = false;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const refetch = () => {
  fetchBlogs();
  currentPage.value = 1;
};

onMounted(fetchBlogs);
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
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
