<script setup lang="ts">
    interface Props{
        variant?: 'primary' | 'secondary' | 'outline'
        size?: 'sm' |'md' | 'lg'
        disabled?:boolean
        loading?: boolean
    }

    const Props= withDefaults(defineProps<Props>(), {
        variant: 'primary',
        size: 'md'  ,
        disabled:false,
        loading: false,

        
    })

    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

    // bg-[--color-primary]

    const variantClasses  ={
        primary: 'bg-[--color-primary] text-white hover:bg-[#ff8533] active:scale-95',
        secondary: 'bg-[--color-surface] text-[--color-text-primary] border border-[--color-border] hover:border-[--color-primary]',
        outline: 'border-2 border-[--color-primary] text-[--color-primary] hover:bg-[--color-primary] hover:text-white'
    }

    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

</script>


<template>
    <button
        :class="[baseClasses, variantClasses[variant], sizeClasses[size]]"
        :disabled="disabled || loading"
    >
        <span v-if="loading" class="w-4 h-4 border-2 border-transparent border-t-current rounded-full animate-spin" />
        <slot />
    </button>
</template>