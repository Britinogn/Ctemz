<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
      <h2 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h2>
      <p class="text-gray-600 mb-6">{{ message }}</p>
      
      <div class="flex gap-3">
        <button 
          @click="$emit('cancel')"
          class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button 
          @click="$emit('confirm')"
          class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  message: string;
}>();

defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>