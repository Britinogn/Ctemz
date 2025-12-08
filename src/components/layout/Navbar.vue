<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  // { name: 'About', path: '/about' },
  // { name: 'Projects', path: '/projects' },
  { name: 'GitHub', path: '/github' },
  //{ name: 'Blog', path: '/blogs' }
]

function isActive(path: string) {
  return route.path === path
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}

function navigateToBlog() {
  router.push('/blogs')
  closeMobileMenu()
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        
        <!-- Logo/Brand -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="relative w-10 h-10 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
            <span class="text-black font-bold text-lg">T</span>
            <!-- Glow Effect -->
          </div>
          <span class="text-white font-bold text-xl hidden sm:inline  transition-colors">
            Tino Ctemz
          </span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative text-gray-400 hover:text-white transition-colors duration-300 font-medium text-sm group"
            :class="{ '!text-blue-300': isActive(link.path) }"
          >
            {{ link.name }}
            <!-- Underline Effect -->
            <span 
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 transition-all duration-300 group-hover:w-full"
              :class="{ '!w-full': isActive(link.path) }"
            />
          </router-link>
          
          <!-- Contact Button -->
          <button
            @click="navigateToBlog"
            class="px-6 py-2.5 cursor-pointer bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
          >
            Blog
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 cursor-pointer text-gray-400 transition-colors relative"
          aria-label="Toggle menu"
        >
          <!-- Hamburger Icon -->
          <div class="w-6 h-5 flex flex-col justify-between">
            <span 
              class="w-full h-0.5 bg-current transform transition-all duration-300"
              :class="mobileMenuOpen ? 'rotate-45 translate-y-2' : ''"
            ></span>
            <span 
              class="w-full h-0.5 bg-current transition-all duration-300"
              :class="mobileMenuOpen ? 'opacity-0' : ''"
            ></span>
            <span 
              class="w-full h-0.5 bg-current transform transition-all duration-300"
              :class="mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <!-- Mobile Menu -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="mobileMenuOpen"
        class="absolute left-0 right-0 top-full md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-xl shadow-lg z-40"
      >
        <div class="px-4 py-6 space-y-4">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="closeMobileMenu"
            class="block text-gray-400 hover:text-orange-400 transition-colors duration-300 font-medium text-lg py-2 px-4 rounded-lg hover:bg-gray-900"
            :class="{ 'text-white!important bg-gray-900': isActive(link.path) }"
          >
            {{ link.name }}
          </router-link>

          <button
            @click="navigateToBlog"
            class="w-full px-6 cursor-pointer py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Blog
          </button>
        </div>
      </div>
    </transition>

  </nav>
</template>

<style scoped>
/* Additional animations if needed */
</style>