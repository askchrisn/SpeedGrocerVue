<template>
    <div>
        <label>LoginPage.vue</label>
        <label>Logged In: {{ authStore.isAuthenticated }}</label>
        <input type="text" v-model="username" placeholder="Username" />
        <input type="text" v-model="password" placeholder="Password" />
        <q-btn class="primary" @click="authStore.loginlogout()">Login/Logout</q-btn>
        <q-btn color="primary" to="/">Go</q-btn>
    </div>   
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuthStore } from 'src/stores/authStore';
    const authStore = useAuthStore();

    const username = ref('');
    const password = ref('');
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        margin: 15rem;
    }
</style>
