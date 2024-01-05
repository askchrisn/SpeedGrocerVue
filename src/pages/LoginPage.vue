<template>
    <div class="main">
      <div class="flex-column flex-grow h-center">
        <q-input class="q-mb-lg" filled v-model="email" label="Email" stack-label></q-input>
        <q-input class="q-mb-lg" v-model="password" filled :type="isPasswordHidden ? 'password' : 'text'" stack-label label="Password">
        <template v-slot:append>
          <q-icon
            :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPasswordHidden = !isPasswordHidden"
          ></q-icon>
        </template>
        </q-input>
        <q-btn class="q-mb-lg" color="primary" @click="login">Login</q-btn>
        <div class="flex-row h-center">
            <label>Don't have an account?</label>
            <q-btn class="q-ml-sm" outline to="/signup">Sign Up</q-btn>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from 'src/stores/authStore';
    import { Notify } from 'quasar'

    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const isPasswordHidden = ref(true)

    async function login() {
        try {
            await authStore.signIn(email.value, password.value);
            router.push('/');
        } catch (error: any) {
            Notify.create({ type: 'negative', message: error.message })
        }
    };
</script>

<style scoped>
</style>
