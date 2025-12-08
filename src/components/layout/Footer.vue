<template>
  <footer class="bg-black text-gray-400 border-t border-gray-800 py-10">
    <div class="max-w-7xl mx-auto px-6 sm:px-8">
      <div class="flex flex-col md:flex-row justify-between items-center gap-8">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div class="relative w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span class="text-black font-bold text-lg">T</span>
          </div>
          <h2 class="text-white font-bold text-xl">Tino Ctemz</h2>
        </div>

        <!-- Navigation Links -->
        <div class="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <router-link
            to="/"
            class="hover:text-orange-400 transition-colors duration-300"
          >
            Home
          </router-link>
          <router-link
            to="/github"
            class="hover:text-orange-400 transition-colors duration-300"
          >
            GitHub
          </router-link>
          <router-link
            to="/blogs"
            class="hover:text-orange-400 transition-colors duration-300"
          >
            Blog
          </router-link>
          <!-- <router-link
            to="/contact"
            class="hover:text-orange-400 transition-colors duration-300"
          >
            Contact
          </router-link> -->
        </div>

        <!-- Social Links -->
        <div class="flex items-center space-x-5 w-full md:w-auto flex-wrap justify-center">
          <a
            href="https://github.com/britinogn"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://twitter.com/britinogn"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            <i class="fab fa-twitter text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/britinogn/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            <i class="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="mailto:support@tinoctemz.com"
            class="text-gray-400 hover:text-orange-400 transition-colors duration-300"
          >
            <i class="fas fa-envelope text-xl"></i>
          </a>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
        © {{ new Date().getFullYear() }} Tino Ctemz. All rights reserved.
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// no script needed unless you want to auto-generate links dynamically
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css");
</style>
