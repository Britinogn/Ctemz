<!-- App.vue -->
<template>
  <AuthProvider>
    <Navbar />
    <RouterView  />
    <Footer />
  </AuthProvider>
</template>

<script setup lang="ts">
  import AuthProvider from "./provider/authProvider.vue";
  import Navbar from "./components/layout/Navbar.vue";
  import Footer from "./components/layout/Footer.vue";
</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>