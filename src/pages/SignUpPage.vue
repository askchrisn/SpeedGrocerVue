<template>
    <div>
        <q-btn color="primary" to="login">Back</q-btn>
        <q-input class="input" filled v-model="email" label="Email" stack-label dense></q-input>
        <q-input class="input" filled v-model="name" label="Name" stack-label dense></q-input>
        <q-input class="input" filled v-model="password" label="Password" stack-label dense></q-input>
        <q-input class="input" filled v-model="passwordConfirmed" label="Confirm Password" stack-label dense></q-input>
        <q-btn color="primary" @click="createAccount">Create Account</q-btn>
    </div>
</template>
  
<script setup lang="ts">

import { Notify } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const email = ref('')
const name = ref('')
const password = ref('')
const passwordConfirmed = ref('')

const router = useRouter();
const authStore = useAuthStore();

async function createAccount() {
    try {
        await authStore.signUp(email.value, name.value, password.value);
        await authStore.signIn(email.value, password.value);
        router.push('/');
    } catch (error: any) {
        Notify.create({ type: 'negative', message: error.message })
    }
}

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