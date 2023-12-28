<template>
    <label>LoginPage.vue</label>
    <div class="test">
        <q-input class="input" filled v-model="email" label="Email" stack-label dense></q-input>
        <q-input class="input" filled v-model="password" label="Password" stack-label dense></q-input>
        <q-btn color="primary">Login</q-btn>
        <q-btn color="primary" to="/signup">Sign Up</q-btn>
    </div>
</template>
  
<script setup lang="ts">

import { ref } from 'vue'

const email = ref('')
const password = ref('')

</script>
  
<style scoped>
    div {
        margin: 6rem 2rem;
    }

    .test {
        display: flex;
        flex-direction: column;
    }
    .input {
        margin-bottom: 2rem;
    }
    .q-btn {
        margin: 1rem;
    }
</style>