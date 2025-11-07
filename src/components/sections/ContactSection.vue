<template>
  <section id="contact" class="py-20 bg-black text-white">
    <div class="max-w-3xl mx-auto px-6">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-extrabold mb-4 text-white">Contact</h1>
        <div class="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        <p class="text-gray-400 mt-4">
          Have a question or want to work together?<br />
          <span class="text-orange-400 font-semibold">Let's Make It Happen!</span>
        </p>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Name & Email -->
        <div class="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Full Name"
            
            class="w-full md:w-1/2 bg-gray-900 border border-gray-700 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-orange-500"
          />

          <input
            v-model="formData.email"
            type="email"
            placeholder="Email Address"
            
            class="w-full md:w-1/2 bg-gray-900 border border-gray-700 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>

        <!-- Subject -->
        <input
          v-model="formData.subject"
          type="text"
          placeholder="Subject"
          
          class="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-orange-500"
        />

        <!-- Message -->
        <textarea
          v-model="formData.message"
          placeholder="Your Message"
          
          rows="5"
          class="w-full bg-gray-900 border border-gray-700 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-orange-500 resize-y min-h-[100px] max-h-[180px]"
        ></textarea>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-50 md:w-1/2 mx-auto cursor-pointer block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <!-- Status Message -->
      <div
        v-if="status.message"
        :class="[
          'mt-6 text-center font-semibold py-3 rounded-lg',
          status.type === 'success'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-red-500/20 text-red-400 border border-red-500/30'
        ]"
      >
        {{ status.message }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContactAPI from '@/api/contactAPI'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface Status {
  message: string
  type: 'success' | 'error'
}

const formData = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const status = ref<Status>({ message: '', type: 'success' })

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.subject || !formData.value.message) {
    status.value = { message: 'Please fill in all required fields.', type: 'error' }
    return
  }

  loading.value = true
  status.value.message = ''

  try {
    await ContactAPI.createContact(formData.value)
    status.value = {
      message: "Message sent successfully! I'll get back to you soon.",
      type: 'success'
    }
    formData.value = { name: '', email: '', subject: '', message: '' }
  } catch (error) {
    console.error('Error submitting form:', error)
    status.value = {
      message: 'Failed to send message. Please try again later.',
      type: 'error'
    }
  } finally {
    loading.value = false
  }
}
</script>
