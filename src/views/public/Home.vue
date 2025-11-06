<template>
  <main class="">
    <HeroSection  />
    <ProjectSlider />
    <AboutSection />
    <!-- <ProjectsFullSlider />
    <SkillsSlider />
    <ExperienceSection /> -->
    <ContactSection />

    
  </main>
</template>

<script setup lang="ts">
// Import sections here
import HeroSection from '@/components/sections/HeroSection.vue';
import ProjectSlider from '@/components/sliders/ProjectSlider.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
</script>