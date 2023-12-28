<template>
  <label>HomePage.vue</label>
  <div class="test">
    <q-btn color="primary" to="/login">Login</q-btn>
  </div>
</template>

<script setup lang="ts">

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