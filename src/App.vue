<!-- App.vue -->
<template>
  <AuthProvider>
    <Navbar v-if="!$route.meta.hideNavbar" />
    <RouterView  />
    <Footer v-if="!$route.meta.hideFooter" />
  </AuthProvider>
  
</template>

<script setup lang="ts">
  import AuthProvider from "./provider/authProvider.vue";
  import Navbar from "./components/layout/Navbar.vue";
  import Footer from "./components/layout/Footer.vue";

// import { onMounted } from 'vue'
// import { useLenis } from './plugins/lenis'

// onMounted(() => {
//   useLenis() // Only one instance
// })

</script>

<style>
/* html {
  scroll-behavior: smooth;
  scrollbar-color: orange;
  scroll-padding-top: 80px;
} */
</style>