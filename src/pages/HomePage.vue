<template>
  <label>HomePage.vue</label>
  <label>{{ authStore.isAuthenticated }}</label>
  <q-btn class="primary" to="/login" @click="logout()">Logout</q-btn>
  <example-component/>
</template>

<script setup lang="ts">
  import ExampleComponent from 'src/components/ExampleComponent.vue';
  import { useAuthStore } from 'src/stores/authStore';

  const authStore = useAuthStore();

  function logout() {
    authStore.logout();
  }
</script>
