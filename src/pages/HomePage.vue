<template>
  <label>HomePage.vue</label>
  <label>{{ authStore.user?.uid }}</label>
  <q-btn class="primary" to="/login" @click="authStore.signOut()">Logout</q-btn>
  <example-component/>
</template>

<script setup lang="ts">
  import ExampleComponent from 'src/components/ExampleComponent.vue';
  import { useAuthStore } from 'src/stores/authStore';

  const authStore = useAuthStore();
</script>

<style scoped>
  div {
    margin: 6rem 2rem;
  }

  .test {
    display: flex;
    flex-direction: column;
  }
  .q-btn {
    margin: 1rem;
  }
</style>