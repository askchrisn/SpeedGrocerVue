<template>
    <div>
        <label>LoginPage.vue</label>
        <label>{{ authStore.isLoggedIn }}</label>
        <input type="text" v-model="username" placeholder="Username" />
        <input type="text" v-model="password" placeholder="Password" />
        <q-btn class="primary" @click="login">Login</q-btn>
        <q-btn color="primary" to="/">Go</q-btn>
    </div>   
</template>

<script setup lang="ts">
    import store from '../stores/index';
    import { ref } from 'vue';
    import { useAuthStore } from 'src/stores/authStore';

    const authStore = useAuthStore(store());
    const username = ref('');
    const password = ref('');

    function login() {
        authStore.login();
    }
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        margin: 15rem;
    }
</style>
