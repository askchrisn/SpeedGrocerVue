<template>
    <div>
        <label>Logged In: {{ authStore.isAuthenticated }}</label>
        <q-input class="input" filled v-model="email" label="Email" stack-label dense></q-input>
        <q-input class="input" v-model="password" filled :type="isPasswordHidden ? 'password' : 'text'" stack-label label="Password">
        <template v-slot:append>
          <q-icon
            :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordHidden = !isPasswordHidden"
          ></q-icon>
        </template>
      </q-input>
        <q-btn class="primary" @click="authStore.loginlogout()">Login/Logout</q-btn>
        <q-btn color="primary" to="/">Go</q-btn>

        <q-btn color="primary" to="/signup">Sign Up</q-btn>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useAuthStore } from 'src/stores/authStore';
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const isPasswordHidden = ref(true)
</script>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        margin: 2rem;
    }
    .input {
        margin-bottom: 2rem;
    }
    .q-btn {
        margin: 1rem;
    }
</style>
