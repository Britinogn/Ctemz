<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const route = useRoute()
const mobileMenuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'GitHub', path: '/github' },
  { name: 'Blog', path: '/blogs' }
]

const isActive = (path: string) => route.path === path

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[--color-surface]/80 backdrop-blur-lg border-b border-[--color-border]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-center items-center h-16 sm:h-20">
        
        <!-- Desktop Navigation - Centered -->
        <div class="hidden md:flex items-center gap-8">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors duration-300 font-medium relative group"
            :class="{ '!text-[--color-primary]': isActive(link.path) }"
          >
            {{ link.name }}
            <span 
              class="absolute -bottom-1 left-0 w-0 h-0.5 bg-[--color-primary] transition-all duration-300 group-hover:w-full"
              :class="{ '!w-full': isActive(link.path) }"
            />
          </router-link>
          
          <!-- Contact Button -->
          <!-- <Button variant="primary" size="sm" @click="router.push('/contact')">
            Contact
          </Button> -->
        </div>

        <!-- Mobile Menu Button - Centered -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden p-2 text-[--color-text-secondary] hover:text-[--color-primary] transition-colors"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu - Centered -->
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
        class="md:hidden border-t border-[--color-border] bg-[--color-surface]"
      >
        <div class="px-4 py-6 space-y-4 flex flex-col items-center">
          <router-link
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            @click="closeMobileMenu"
            class="text-[--color-text-secondary] hover:text-[--color-primary] transition-colors duration-300 font-medium text-lg"
            :class="{ '!text-[--color-primary]': isActive(link.path) }"
          >
            {{ link.name }}
          </router-link>
          
          <Button 
            variant="primary" 
            size="md" 
            @click="router.push('/contact'); closeMobileMenu()"
            class="w-full max-w-xs"
          >
            Contact
          </Button>
        </div>
      </div>
    </transition>
  </nav>
</template>