<template>
  <div>
    <!-- Mobile Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
      @click="onClose"
    />

    <!-- Sidebar -->
    <aside
      class="
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white 
        min-h-screen shadow-2xl 
        transform transition-transform duration-300 ease-in-out
      "
      :class="{ 'translate-x-0': isOpen, '-translate-x-full lg:translate-x-0': !isOpen }"
    >
      <!-- Header -->
      <div class="p-6 border-b border-gray-700/50">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Cog6ToothIcon class="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Admin Panel</h2>
              <p class="text-xs text-gray-400">Portfolio Manager</p>
            </div>
          </div>
          
          <!-- Close button for mobile -->
          <button
            v-if="!isDesktop"
            @click="onClose"
            class="cursor-pointer p-2 hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- User Profile Section -->
      <div class="p-6 border-b border-gray-700/50">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <UserCircleIcon class="w-8 h-8 text-white" />
          </div>
          <div>
            <p class="font-semibold text-white">{{ user?.name }}</p>
            <p class="text-xs text-gray-400">{{ user?.email }}</p>
          </div>
        </div>
      </div>
      
      <!-- Navigation -->
      <nav class="p-4 space-y-2">
        <RouterLink
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="onClose"
          :class="[
            'group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200',
            isActive(item.path)
              ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
              : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
          ]"
        >
          <component 
            :is="item.icon" 
            :class="[
              'w-5 h-5 transition-transform group-hover:scale-110',
              isActive(item.path) ? 'text-white' : 'text-gray-400'
            ]" 
          />
          <span>{{ item.name }}</span>
          
          <div v-if="isActive(item.path)" class="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
        </RouterLink>
      </nav>

      <!-- Footer -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700/50">
        <div class="bg-gray-700/50 rounded-xl p-4">
          <p class="text-xs text-gray-400 mb-2">Need help?</p>
          <button class="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium">
            View Documentation →
          </button>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { RocketLaunchIcon, DocumentTextIcon, EnvelopeIcon, ChartBarIcon, Cog6ToothIcon, UserCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useAuth } from '../../hooks/useAuth' // Adjust path as needed

interface NavItem {
  name: string
  path: string
  icon: any // Component type
}

interface Props {
  isOpen: boolean
  onClose: () => void
}

const { isOpen, onClose } = defineProps<Props>()

const route = useRoute()
const { user } = useAuth()

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
  { name: 'Projects', path: '/dashboard/projects', icon: RocketLaunchIcon },
  { name: 'Blogs', path: '/dashboard/blogs', icon: DocumentTextIcon },
  { name: 'Messages', path: '/dashboard/contact', icon: EnvelopeIcon },
]

const isActive = (path: string) => route.path === path

const isDesktop = ref(false)

const updateIsDesktop = () => {
  isDesktop.value = window.innerWidth >= 1024 // lg breakpoint
}

onMounted(() => {
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateIsDesktop)
})
</script>