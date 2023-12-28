<template>
  <div class="main">
    <label>HomePage.vue</label>
    <label>{{ authStore.user?.uid }}</label>
    <q-btn class="primary" to="/login" @click="authStore.signOut()">Logout</q-btn>
    <q-list bordered>
        <q-item v-for="groceryList in groceryLists" class="q-my-sm" clickable v-ripple>
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
  import GroceryList from 'src/models/groceryList';
  import Item from 'src/models/item';
  import { isTemplateExpression } from 'typescript';

  const authStore = useAuthStore();
  const groceryLists = [ 
    new GroceryList('Home', [new Item('butter', 'Connor'), new Item('milk', 'Connor'), new Item('eggs', 'Chris')], ['conno1234@gmail.com']),
    new GroceryList('Work', [new Item('paper', 'Connor'), new Item('staples', 'Chris')], ['conno1234@gmail.com']),
    new GroceryList('Other', [new Item('butter', 'Chris')], ['conno1234@gmail.com']),
  ]
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