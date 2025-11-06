<script setup lang="ts">
    interface Props{
        size?: 'sm' | 'md' | 'lg'
    }

    const Props = withDefaults(defineProps<Props>(), {
        size: 'md'
    })

    const sizeClasses = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4'
    }
</script>


<template>
    <div class="flex items-center justify-center ">
        <div
            :class="[
                'border-transparent border-t-[--color-primary] rounded-full animate-spin',
                sizeClasses[size]
            ]"
        >

        </div>
    </div>
</template>