<template>
    <div class="test">
        <q-input class="input" filled v-model="email" label="Email" stack-label dense></q-input>
        <q-input class="input" filled v-model="name" label="Name" stack-label dense></q-input>
        <q-input class="input" filled v-model="password" label="Password" stack-label dense></q-input>
        <q-input class="input" filled v-model="passwordConfirmed" label="Confirm Password" stack-label dense></q-input>
      <q-btn color="primary">Create Account</q-btn>
    </div>
</template>
  
<script setup lang="ts">

import { ref } from 'vue'

const email = ref('')
const name = ref('')
const password = ref('')
const passwordConfirmed = ref('')

</script>
  
<style scoped>
    div {
        margin: 2rem;
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