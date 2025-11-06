<script setup lang="ts">
import { ref, provide, onMounted } from "vue";
import type { User } from "../types/script";
import AuthSymbol  from "../hooks/useAuth";
import {
  setToken as saveToken,
  setUser as saveUser,
  logout as clearAuth,
} from "../api/auth";

// ---- State ----
const user = ref<User | null>(null);
const token = ref<string | null>(null);
const loading = ref(true);

// ---- Lifecycle ----
onMounted(() => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (storedToken && storedUser) {
    token.value = storedToken;
    user.value = JSON.parse(storedUser);
  }

  loading.value = false;
});

// ---- Methods ----
function login(newToken: string, newUser: User) {
  saveToken(newToken);
  saveUser(newUser);
  token.value = newToken;
  user.value = newUser;
}

function logout() {
  clearAuth();
  token.value = null;
  user.value = null;
}

// ---- Provide context ----
provide(AuthSymbol, {
  get user() {
    return user.value;
  },
  get token() {
    return token.value;
  },
  login,
  logout,
  get isAuthenticated() {
    return !!token.value;
  },
  get loading() {
    return loading.value;
  },
});
</script>

<template>
  <!-- Acts like React’s {children} -->
  <slot />
</template>
