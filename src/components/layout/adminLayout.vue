<template>
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <Sidebar :is-open="isSidebarOpen" :on-close="closeSidebar" />
    
    <div class="flex-1 flex flex-col overflow-hidden">
      <Topbar :on-menu-click="toggleSidebar" />
      
      <main class="flex-1 overflow-y-auto p-4 lg:p-8">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '../adminPanel/Sidebar.vue'
import Topbar from '../adminPanel/Topbar.vue'

const isSidebarOpen = ref(false)

const toggleSidebar = (): void => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const closeSidebar = (): void => {
  isSidebarOpen.value = false
}
</script>