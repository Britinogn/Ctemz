<template>
  <header class="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white border-b border-gray-700/50 shadow-sm">
    <div class="px-4 sm:px-6 lg:px-8 py-3 md:py-4">
      <div class="flex justify-between items-center gap-2 md:gap-4">
        <!-- Left Section -->
        <div class="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
          <!-- Mobile menu button -->
          <button
            @click="onMenuClick"
            class="lg:hidden p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors cursor-pointer shrink-0"
            aria-label="Toggle menu"
          >
            <Bars3Icon class="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <!-- Welcome Section -->
          <div class="flex-1 min-w-0">
            <h1
              class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-white truncate"
            >
              Welcome back, {{ user?.name?.split(' ')[0] || 'Admin' }}! 👋
            </h1>
            <p class="text-xs md:text-sm text-gray-400 hidden sm:block mt-0.5 truncate">
              Manage your portfolio content and analytics
            </p>
          </div>
        </div>

        <!-- Right Section -->
        <div class="flex items-center gap-1.5 sm:gap-2 md:gap-3 shrink-0">
          <!-- Search Button - Hidden on mobile -->
          <!-- <button
            class="hidden lg:flex items-center gap-2 px-3 py-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
          >
            <MagnifyingGlassIcon class="w-4 h-4" />
            <span>Search...</span>
            <kbd class="px-2 py-0.5 text-xs bg-gray-700 rounded border border-gray-500">⌘K</kbd>
          </button> -->

          <!-- Notifications -->
          <button
            class="relative p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <BellIcon class="w-4 h-4 md:w-5 md:h-5" />
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          <!-- Settings - Hidden on mobile -->
          <button
            class="hidden md:block p-2 text-gray-300 hover:bg-gray-700 rounded-xl transition-colors"
            aria-label="Settings"
          >
            <Cog6ToothIcon class="w-5 h-5" />
          </button>

          <!-- View Site -->
          <RouterLink
            to="/"
            class="flex items-center gap-1.5 px-2 sm:px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-blue-400 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
          >
            <GlobeAltIcon class="w-4 h-4" />
            <span class="hidden sm:inline">View Site</span>
          </RouterLink>

          <!-- Divider -->
          <div class="hidden md:block w-px h-8 bg-gray-600"></div>
          
          <!-- User Profile -->
          <div class="flex items-center gap-2 md:gap-3 cursor-pointer">
            <!-- User Info - Desktop -->
            <div class="text-right hidden lg:block">
              <p class="text-sm font-semibold text-white truncate max-w-[120px] xl:max-w-[150px]">
                {{ user?.name || 'Admin User' }}
              </p>
              <p class="text-xs text-gray-400 truncate max-w-[120px] xl:max-w-[150px]">
                {{ user?.email || 'admin@example.com' }}
              </p>
            </div>
            
            <!-- Avatar -->
            <template v-if="user?.profileImage">
              <img
                :src="user.profileImage"
                :alt="user.name"
                class="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-blue-400/20"
              />
            </template>
            <div
              v-else
              class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg"
            >
              {{ user?.name?.charAt(0).toUpperCase() || 'A' }}
            </div>
          </div>

          <!-- Logout Button -->
          <button
            @click="handleLogout"
            class="flex items-center cursor-pointer gap-1.5 px-2 sm:px-3 md:px-4 py-2 text-xs md:text-sm font-medium bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-sm hover:shadow-md"
          >
            <ArrowRightOnRectangleIcon class="w-4 h-4" />
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Bars3Icon, GlobeAltIcon, ArrowRightOnRectangleIcon, BellIcon, Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'
import { useAuth } from '../../hooks/useAuth' // Adjust path as needed for Vue composable

interface Props {
  onMenuClick: () => void
}

const { onMenuClick } = defineProps<Props>()

const router = useRouter()
const { logout, user } = useAuth()

const handleLogout = (): void => {
  logout()
  router.push('/login')
}
</script>