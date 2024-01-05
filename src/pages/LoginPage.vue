<template>
    <div class="main">
      <div class="flex-column flex-grow h-center">
        <q-input class="q-mb-lg" filled v-model="email" label="Email" stack-label></q-input>
        <q-input v-model="password" filled :type="isPasswordHidden ? 'password' : 'text'" stack-label label="Password">
          <template v-slot:append>
            <q-icon
              :name="isPasswordHidden ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPasswordHidden = !isPasswordHidden"
            ></q-icon>
          </template>
        </q-input>
        <ToggleWithLabel class="mb1" label="Remember Password?" v-model="rememberPassword" />
        <q-btn class="q-mb-lg" color="primary" @click="login">Login</q-btn>
        <div class="flex-row h-center">
            <label>Don't have an account?</label>
            <q-btn class="q-ml-sm" outline to="/signup">Sign Up</q-btn>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from 'src/stores/authStore';
    import { LocalStorage, Notify } from 'quasar'
    import ToggleWithLabel from 'src/components/ToggleWithLabel.vue';

    const router = useRouter();
    const authStore = useAuthStore();

    const email = ref('');
    const password = ref('');
    const isPasswordHidden = ref(true)
    const rememberPassword = loadRememberSettings();

    async function login() {
        try {
            saveOrForgetPassword()
            await authStore.signIn(email.value, password.value)
            router.push('/');
        } catch (error: any) {
            Notify.create({ type: 'negative', message: error.message })
        }
    };

    function loadRememberSettings(): Ref<boolean> {
      var password = LocalStorage.getItem('rememberPassword')
      return ref(!!password)
    }

    function saveOrForgetPassword() {
      if (rememberPassword.value) {
          LocalStorage.set('rememberPassword', password.value)
      } else {
          LocalStorage.remove('rememberPassword')
      }
    }
    
</script>

<style scoped>
</style>
