<template>
    <q-layout view="lHh Lpr lFf">

        <q-header elevated>
            <q-toolbar>
                <q-btn v-if="route.meta.hasBack" flat dense round icon="arrow_back_ios_new" aria-label="Menu" @click="router.back"/>
                <q-toolbar-title> Speed Grocer </q-toolbar-title>
                <q-btn v-if="useAuthStore().isAuthenticated" flat dense round icon="settings" aria-label="Menu" to="/settings"/>
            </q-toolbar>
        </q-header>

        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script setup lang="ts">
  import { useAuthStore } from 'src/stores/authStore';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();

</script>
