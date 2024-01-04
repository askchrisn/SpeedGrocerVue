<template>
  <div class="main">
    <!-- <div class="flex-row mb1">
      <q-input class="flex-grow" filled v-model="newListName" label="New list name" stack-label dense @keydown.enter.prvent="createNewList()"></q-input>
      <q-btn color="primary" class="ml1" @click="createNewList()">+</q-btn>
    </div>

    <q-virtual-scroll
      class="flex-grow"
      :items="myGroceryLists"
      separator
      v-slot="{ item, index }"
      >
        <q-item clickable v-ripple @click="groceryListKeyStore.setKey(item[0])" to="/list">
          <q-item-section>
            <q-item-label>{{ item[1].Name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption lines="1">{{ item[1].Items.length }}</q-item-label>
          </q-item-section>
        </q-item>
    </q-virtual-scroll> -->
    <label>Hello</label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import GroceryList from 'src/models/groceryList';
import { pushDb } from 'src/firebaseConfig'
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { getAUsersLists } from 'src/groceryListsManagement';

// auth.onAuthStateChanged((user) => {
//   console.log('STATE CHANGED');
//   console.log(auth);
// })

// const authStore = useAuthStore()
// const groceryListKeyStore = useGroceryListKeyStore()

// console.log('authstore user email ' + authStore.userEmail)

// const myGroceryLists = computed(() => getAUsersLists(authStore.userEmail));

// const newListName = ref("")

// function createNewList() {
//   var name = newListName.value.trim()
//   if (name.length > 0) {
//     var gl = new GroceryList();
//     gl.Name = name;
//     gl.Users = [ authStore.userEmail ]

//     pushDb('/GroceryLists', gl);
//     newListName.value = ""
//   }
// }

</script>

<style scoped>

</style>