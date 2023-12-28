<template>
    <div>
        <label>LoginPage.vue</label>
        <input type="text" v-model="username" placeholder="Username" />
        <input type="text" v-model="password" placeholder="Password" />
        <q-btn class="primary" @click="login">Login</q-btn>
        <q-btn color="primary" to="/">Go</q-btn>
    </div>   
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const username = ref('');
    const password = ref('');

    function login() {
        console.log('hello');
    }

</script>
