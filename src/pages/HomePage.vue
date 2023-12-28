<template>
  <div class="main">
    <label>HomePage.vue</label>
  <label>{{ authStore.user?.uid }}</label>
    <q-btn class="primary" to="/login" @click="authStore.signOut()">Logout</q-btn>
    <q-list bordered>
        <q-item v-for="groceryList in groceryLists" :key="groceryList.id" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label>{{ groceryList.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption lines="1">{{ groceryList.items.length }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
  </div>
</template>

<script setup lang="ts">
  import ExampleComponent from 'src/components/ExampleComponent.vue';
  import { useAuthStore } from 'src/stores/authStore';

  const authStore = useAuthStore();
  const groceryLists = [ {
    id: 1,
    name: 'Home',
    items: ['butter', 'milk', 'eggs'],
    users: ['conno1234@gmail.com']
  }, {
    id: 2,
    name: 'Work',
    items: ['taco shell', 'meat'],
    users: ['conno1234@gmail.com']
  }, {
    id: 3,
    name: 'Other',
    items: ['butter', 'milk', 'eggs', 'blarg', 'something'],
    users: ['conno1234@gmail.com']
  }, {
    id: 4,
    name: 'My List',
    items: [],
    users: ['conno1234@gmail.com']
  } ]
</script>

<style scoped>
  .main {
    margin: 2rem;
  }
  .test {
    display: flex;
    flex-direction: column;
  }
  .q-btn {
    margin: 1rem;
  }
</style>