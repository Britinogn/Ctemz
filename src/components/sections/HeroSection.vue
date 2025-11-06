<template>
  <section
    id="hero"
    class="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden px-8 md:px-16"
  >
    <!-- Orange Glow Background -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-[var(--color-primary)]/10 via-[var(--bg-primary)] to-[var(--bg-primary)] opacity-70 pointer-events-none"
    ></div>

    <!-- Left Content -->
    <div
      class="relative z-10 w-full md:w-1/2 flex flex-col justify-center space-y-6 text-center md:text-left animate-fade-in"
    >
      <h1 class="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight">
        Hi, I’m <span class="text-[var(--color-primary)]">Tino Nova</span>
      </h1>

      <h2 class="text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] font-semibold animate-slide-in">
        Frontend Developer & Creative Technologist
      </h2>

      <p class="max-w-lg text-center text-[var(--text-secondary)] leading-relaxed">
        I build interactive, modern web experiences that connect design and
        performance  clean code, smooth animations, and thoughtful UI.
      </p>

      <div class="flex justify-center md:justify-start gap-4 pt-4">
        <button
          @click="scrollToProjects"
          class="btn btn-primary "
        >
          View My Work
        </button>

        <button
          @click="scrollToContact"
          class="btn btn-outline"
        >
          Contact Me
        </button>
      </div>
    </div>

    <!-- Right Image -->
    <div
      class="relative z-10 w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0 animate-fade-in-delay"
    >
      <div
        class="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-[0_0_40px_-10px_var(--color-primary)]"
      >
        <img
          src="/src/assets/images/tinogn.jpg"
          alt="Tino Nova portrait"
          class="w-full h-full object-cover rounded-full transform hover:scale-105 transition-transform duration-500 animate-pulse"
        />
      </div>

      <!-- Glow effect -->
      <div
        class="absolute w-72 h-72 md:w-96 md:h-96 rounded-full bg-[var(--color-primary)] opacity-20 blur-3xl"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
const scrollToProjects = () => {
  const section = document.getElementById("projects");
  section?.scrollIntoView({ behavior: "smooth" });
};

const scrollToContact = () => {
  const section = document.getElementById("contact");
  section?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
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
