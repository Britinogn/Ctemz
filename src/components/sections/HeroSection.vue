

<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-black text-white overflow-hidden px-8 md:px-16"
  >
    <!-- Animated Background Blobs -->
    <!-- <div class="absolute inset-0 overflow-hidden opacity-20">
      <div class="absolute top-20 left-20 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-[500px] h-[500px] bg-white/20  rounded-full blur-3xl animate-pulse-slow"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/20  rounded-full blur-3xl animate-pulse-slower"></div>
    </div> -->

    <!-- Gradient Overlay Removed -->
    <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>

    <!-- Left Content -->
    <div
      class="relative z-10 w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left animate-fade-in"
    >
      <!-- Small Badge -->
      <div class="flex justify-center md:justify-start">
        <span
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/20 border border-white/30 text-white rounded-full text-sm font-semibold backdrop-blur-sm"
        >
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
          </span>
          Available for Freelance
        </span>
      </div>

      <!-- Main Heading -->
      <h1 class="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
        Hi, I'm 
        <span class="text-white">
          Tino Ctemz
        </span>
        <span class="inline-block animate-wave"></span>
      </h1>

      <!-- Subheading -->
      <h2 class="text-xl md:text-2xl lg:text-4xl text-gray-300 font-bold animate-slide-in">
        <span class="text-white">Frontend Developer</span> & 
        <span class="text-white/85">Creative Technologist</span>
      </h2>

      <!-- Description -->
      <p class="max-w-xl text-lg text-gray-400 leading-relaxed">
        I build <span class="text-white font-semibold">interactive</span>, 
        <span class="text-white font-semibold">modern</span> web experiences that connect design and performance — clean code, smooth animations, and thoughtful UI.
      </p>

      <!-- CTA Buttons -->
      <div class="flex flex-wrap justify-center md:justify-start gap-4 mb-10 pt-6">
        <button @click="scrollToProjects" class="btn btn-primary">
          View My Work
        </button>

        <button @click="scrollToContact" class="btn btn-outline">
          Hire Me
        </button>
      </div>
    </div>

    <!-- Right Image -->
 
    <!-- Right Image -->
    <div
      class="relative z-10 w-full md:w-1/2 pt-10 flex justify-center items-center mb-10 md:mb-0 animate-fade-in-delay"
    >
      <div class="relative group ">
        <!-- Rotating Border Effect -->
        
        <!-- Image Container -->
        <div class="relative w-72  h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-orange-500/30 shadow-2xl">
          <img
            src="/src/assets/images/tinogn.jpg"
            alt="Tino Nova portrait"
            class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <!-- Floating Elements -->
        
      </div>
    </div>
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
