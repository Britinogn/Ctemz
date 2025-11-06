<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-gray-50">
    <div class="w-full max-w-md mx-4 sm:mx-0 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-amber-500 mb-1">House of Peishy</h2>
        <p class="text-gray-500 text-sm mt-1">Admin Panel</p>
        <p class="text-gray-600 text-base">Sign in to your account</p>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <!-- Email Input -->
        <div class="flex flex-col">
          <label for="email" class="font-medium text-gray-700 mb-2 text-sm">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="px-4 py-3 border border-gray-300 rounded-lg text-base bg-white text-gray-900 transition-all focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 placeholder:text-gray-500"
            :class="{ 'border-red-500': errors.email }"
            required
          />
          <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
        </div>

        <!-- Password Input -->
        <div class="flex flex-col">
          <label for="password" class="font-medium text-gray-700 mb-2 text-sm">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="px-4 py-3 border border-gray-300 rounded-lg text-base bg-white text-gray-900 transition-all focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 placeholder:text-gray-500"
            :class="{ 'border-red-500': errors.password }"
            required
          />
          <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</span>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="bg-amber-500 text-white border-0 px-4 py-3 rounded-lg text-base font-medium cursor-pointer transition-all flex items-center justify-center gap-2 hover:bg-amber-600 disabled:opacity-70 disabled:cursor-not-allowed" :disabled="isLoading">
          <span v-if="isLoading" class="w-4 h-4 border-2 border-transparent border-t-white rounded-full animate-spin"></span>
          <span v-else>Sign In</span>
        </button>

        <!-- Forgot Password Link -->
        <!-- <div class="text-center">
          <router-link to="/forgot-password" class="text-gray-500 text-sm no-underline hover:text-amber-500 transition-colors">Forgot Password?</router-link>
        </div> -->
      </form>

      <!-- Error Alert -->
      <div v-if="error" class="bg-red-50 border border-red-500 text-red-500 p-3 rounded-lg text-sm mt-4 text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
//import type { AxiosResponse } from 'axios'
import api from '../../api/api'
import { setToken, setUser } from '../../api/auth'
import type { User } from '../../types/script' // Assuming User type is exported from auth/types

interface FormData {
  email: string
  password: string
}

interface ValidationErrors {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user?: {
    id: string | number
    name: string
    email: string
  }
  id?: string | number
  name?: string
  email?: string
}

const router = useRouter()

const form = reactive<FormData>({
  email: '',
  password: ''
})

const errors = reactive<ValidationErrors>({
  email: '',
  password: ''
})

const error = ref<string>('')
const isLoading = ref<boolean>(false)

const validateForm = (): boolean => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}


const handleSubmit = async (): Promise<void> => {
  if (!validateForm()) return
  
  error.value = ''
  isLoading.value = true

  try {
    const res = await api.post('/auth/login', form) as unknown as LoginResponse
    
    const token = res.token
    setToken(token)
    setUser({
      id: res.user?.id?.toString() || res.id?.toString() || '',
      name: res.user?.name || res.name || form.email,
      email: res.user?.email || res.email || form.email
    } as User)

    router.push('/dashboard')
  } catch (err: any) {
    error.value = err.message || 'Invalid credentials. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>