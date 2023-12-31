<template>
  <div class="main">
    <q-btn to="/login" @click="logout()" class="mb1">Logout</q-btn>

    <div class="flex-row mb1">
      <q-input class="flex-grow" filled v-model="newListName" label="New list name" stack-label dense @keydown.enter.prvent="createNewList()"></q-input>
      <q-btn color="primary" class="ml1" @click="createNewList()">+</q-btn>
    </div>

    <q-virtual-scroll
      class="flex-grow"
      :items="groceryLists"
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
    </q-virtual-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import GroceryList from 'src/models/groceryList';
import { attachEvent, pushDb } from 'src/firebaseConfig'
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';

const authStore = useAuthStore()
const groceryListKeyStore = useGroceryListKeyStore()

const groceryLists = ref<Array<[string, GroceryList]>>([])
const newListName = ref("")

const listener = attachEvent("GroceryLists", (snapshot) => {
  var updatedGroceryLists: Array<[string, GroceryList]> = []
  for (let key in snapshot) {
    var gl = GroceryList.fromObject(snapshot[key])
    if (gl.containsUser(authStore.userEmail)) {
      updatedGroceryLists.push([key, gl])
    }
  }

  groceryLists.value = updatedGroceryLists
});

function logout() {
  authStore.signOut()
}

function createNewList() {
  var name = newListName.value.trim()
  if (name.length > 0) {
    var gl = new GroceryList();
    gl.Name = name;
    gl.Users = [ authStore.userEmail ]

    pushDb('/GroceryLists', gl);
    newListName.value = ""
  }
}

</script>

<style scoped>

</style>
