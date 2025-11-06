<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden px-8 md:px-16"
  >
    <!-- Animated Background Blobs -->
    <div class="absolute inset-0 overflow-hidden opacity-20">
      <div class="absolute top-20 left-20 w-96 h-96 bg-orange-500 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl animate-pulse-slower"></div>
    </div>

    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>

    <!-- Left Content -->
    <div
      class="relative z-10 w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left animate-fade-in"
    >
      <!-- Small Badge -->
      <div class="flex justify-center md:justify-start">
        <span class="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 rounded-full text-sm font-semibold backdrop-blur-sm">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Available for Freelance
        </span>
      </div>

      <!-- Main Heading -->
      <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
        Hi, I'm 
        <span class="bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-500 bg-clip-text text-transparent animate-gradient">
          Tino Ctemz
        </span>
        <span class="inline-block animate-wave">👋</span>
      </h1>

      <!-- Subheading with Typing Effect Style -->
      <h2 class="text-xl md:text-2xl lg:text-4xl text-gray-300 font-bold animate-slide-in">
        <span class="text-orange-400">Frontend Developer</span> & 
        <span class="text-yellow-400">Creative Technologist</span>
      </h2>

      <!-- Description -->
      <p class="max-w-xl text-lg text-gray-400 leading-relaxed">
        I build <span class="text-orange-400 font-semibold">interactive</span>, 
        <span class="text-orange-400 font-semibold">modern</span> web experiences that connect design and performance — clean code, smooth animations, and thoughtful UI.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap justify-center md:justify-start gap-4 pt-6">
        <button
          @click="scrollToProjects"
          class="btn btn-primary"
        >
          <span class="relative z-10">View My Work</span>
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          @click="scrollToContact"
          class="btn btn-outline"
        >
          Hire Me
        </button>
      </div>

      <!-- Social Links -->
      <div class="flex justify-center md:justify-start gap-4 pt-4">
        <!-- <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </a>
        <a href="#" class="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-orange-500 rounded-full transition-all duration-300 hover:scale-110">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
        </a> -->
      </div>
    </div>

    <!-- Right Image -->
    <div
      class="relative z-10 w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0 animate-fade-in-delay"
    >
      <div class="relative group">
        <!-- Rotating Border Effect -->
        <div class="absolute -inset-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-spin-slow"></div>
        
        <!-- Image Container -->
        <div class="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-2xl">
          <img
            src="/src/assets/images/tinogn.jpg"
            alt="Tino Nova portrait"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute -top-4 -right-4 w-20 h-20 bg-orange-500 rounded-full opacity-60 blur-xl animate-float"></div>
        <div class="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-500 rounded-full opacity-60 blur-xl animate-float-delay"></div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <!-- <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div> -->
  </section>
</template>

<script setup lang="ts">
function scrollToProjects() {
  const section = document.getElementById("projects");
  section?.scrollIntoView({ behavior: "smooth" });
}

function scrollToContact() {
  const section = document.getElementById("contact");
  section?.scrollIntoView({ behavior: "smooth" });
}
</script>

<style scoped>
@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  10%, 30% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delay {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.3; }
}

@keyframes pulse-slower {
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.25; }
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-wave {
  animation: wave 2s ease-in-out infinite;
  display: inline-block;
  transform-origin: 70% 70%;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delay {
  animation: float-delay 4s ease-in-out infinite;
  animation-delay: 1s;
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 4s ease-in-out infinite;
}

.animate-pulse-slower {
  animation: pulse-slower 6s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1.2s ease-out both;
}

@keyframes fade-in-delay {
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-delay {
  animation: fade-in-delay 1.8s ease-out both;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 1.5s ease-out both;
}
</style>