<template>
    <div>
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
        <q-btn color="primary" @click="login">Login</q-btn>
        <q-btn color="primary" to="/signup">Sign Up</q-btn>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from 'src/stores/authStore';
    
    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const isPasswordHidden = ref(true)

    async function login() {
        try {
            await authStore.signIn(email.value, password.value);
            router.push({name: 'home'});
        } catch (error) {
            console.error('Login error:', error);
        }
    };
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
