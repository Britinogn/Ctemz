<template>
  <section  id="contact"  class="py-16 bg-gray-900 text-white">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-4xl md:text-5xl font-bold mb-4 bg-white  bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p class="text-gray-400 text-lg max-w-md mx-auto">
          Have a project in mind? Let's discuss how I can bring it to life. Drop a message below.
        </p>
      </div>

      <!-- Contact Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700/50 shadow-lg">
        <!-- Name -->
        <div>
          <label for="name" class="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
          <input
            id="name"
            v-model="formData.name"
            type="text"
            required
            class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Email -->
        <div>
          <label for="email" class="block text-sm font-semibold text-gray-300 mb-2">Email Address</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            required
            class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
            placeholder="your@email.com"
          />
        </div>

        <!-- Subject -->
        <div>
          <label for="subject" class="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
          <input
            id="subject"
            v-model="formData.subject"
            type="text"
            class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
            placeholder="Brief subject line"
          />
        </div>

        <!-- Message -->
        <div>
          <label for="message" class="block text-sm font-semibold text-gray-300 mb-2">Message</label>
          <textarea
            id="message"
            v-model="formData.message"
            required
            rows="5"
            class="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-vertical"
            placeholder="Tell me about your project..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <span v-if="loading" class="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></span>
          <span>{{ loading ? 'Sending...' : 'Send Message' }}</span>
        </button>
      </form>

      <!-- Success/Error Message -->
      <div v-if="status.message" :class="['mt-6 p-4 rounded-lg text-center', status.type === 'success' ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400']">
        {{ status.message }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ContactAPI from '@/api/contactAPI'; // Adjust path to your API

interface FormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface Status {
  message: string;
  type: 'success' | 'error';
}

const formData = ref<FormData>({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const loading = ref(false);
const status = ref<Status>({ message: '', type: 'success' });

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    status.value = { message: 'Please fill in all required fields.', type: 'error' };
    return;
  }

  loading.value = true;
  status.value.message = '';

  try {
    // Prepare data for API (adjust based on your backend expectations)
    const submitData = {
      name: formData.value.name,
      email: formData.value.email,
      subject: formData.value.subject || undefined,
      message: formData.value.message
    };

    await ContactAPI.createContact(submitData);
    status.value = { message: 'Message sent successfully! I\'ll get back to you soon.', type: 'success' };

    // Reset form
    formData.value = { name: '', email: '', subject: '', message: '' };
  } catch (error) {
    console.error('Submission error:', error);
    status.value = { message: 'Failed to send message. Please try again.', type: 'error' };
  } finally {
    loading.value = false;
  }
};
</script>