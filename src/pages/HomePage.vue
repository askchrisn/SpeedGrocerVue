<template>
  <div class="q-pa-lg">
    <label>HomePage.vue</label>
    <label>{{ authStore.user?.uid }}</label>
    <q-btn to="/login" @click="logout()">Logout</q-btn>
    <q-input class="input" filled v-model="newListName" label="New list name" stack-label dense></q-input>
    <q-btn class="primary" @click="createNewList()">+</q-btn>
    <q-list bordered>
      <q-item v-for="groceryList in groceryLists" class="q-my-sm" clickable v-ripple to="/list">
        <q-item-section>
          <q-item-label>{{ groceryList.Name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption lines="1">{{ groceryList.Items.length }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import GroceryList from 'src/models/groceryList';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useUserStore } from 'src/stores/userStore';

const authStore = useAuthStore()
const userStore = useUserStore()
const groceryLists = ref<Array<GroceryList>>([])
const newListName = ref("")
attachEvent("GroceryLists", (snapshot) => {
  var updatedGroceryLists = []
  for (let key in snapshot) {
    var gl = GroceryList.fromObject(snapshot[key])
    if (gl.containsUser(userStore.user.Email)) {
      updatedGroceryLists.push(gl)
    }
  }

  groceryLists.value = updatedGroceryLists
});

function logout() {
  authStore.signOut()
  userStore.clearUser()
}

function createNewList() {
  var name = newListName.value.trim()
  if (name.length > 0) {
    var gl = new GroceryList();
    gl.Name = name;
    gl.Users = [ userStore.user.Email ]

    updateDb('/GroceryLists', gl);
    newListName.value = ""
  }
}

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
