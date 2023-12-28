<template>
  <label>HomePage.vue</label>
  <label>{{ authStore.isLoggedIn }}</label>
  <q-btn class="primary" to="/login">Logout</q-btn>
  <example-component/>
</template>

<script setup lang="ts">
  import ExampleComponent from 'src/components/ExampleComponent.vue';
  import { useAuthStore } from 'src/stores/authStore';

  const authStore = useAuthStore();
</script>
