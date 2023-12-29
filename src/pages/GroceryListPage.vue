<template>
    <div class="q-pa-lg">
      <div class="input-container">
        <q-input class="input" filled v-model="newItemName" label="Add item" stack-label dense></q-input>
        <q-btn class="primary" @click="createNewItem()">+</q-btn>
      </div>
      <q-list bordered>
        <q-item v-for="item in groceryList.Items" class="q-my-sm" clickable v-ripple>
          <q-item-section>
            <q-item-label>{{ item.ItemName }}</q-item-label>
          </q-item-section>
  
          <q-item-section side>
            <q-item-label caption lines="1">{{ item.AdderName }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import GroceryList from 'src/models/groceryList';
  import Item from 'src/models/item';
  import { attachEvent, updateDb } from 'src/firebaseConfig'
  import { useUserStore } from 'src/stores/userStore';
  
  const userStore = useUserStore()
  const groceryList = ref<GroceryList>(new GroceryList())
  const newItemName = ref("")
  const groceryListKey = "-NZSSKlqmX-Fn3VUaGpG"
  attachEvent("GroceryLists/" + groceryListKey, (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
  });
  
  function createNewItem() {
    console.log("hello!")
    var itemName = newItemName.value.trim()
    if (itemName.length > 0) {
      groceryList.value.addItem(new Item(itemName, userStore.user.Nickname))
      newItemName.value = ""
      // TODO save grocery list
    }
  }
  
  </script>
  
  <style scoped>
  .main {
    margin: 2rem;
  }
  .input-container {
    display: flex;
    align-items: center;
  }

  .input {
    flex: 1; /* This makes the input take up the remaining space */
    margin-right: 8px; /* Adjust margin as needed */
  }
  .test {
    display: flex;
    flex-direction: column;
  }
  
  .q-btn {
    margin: 1rem;
  }
  </style>
  