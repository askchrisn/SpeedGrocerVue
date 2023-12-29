<template>
  <div class="main">
    <q-btn to="/login" @click="logout()">Logout</q-btn>
    <div class="input-container">
      <q-input class="input" filled v-model="newListName" label="New list name" stack-label dense></q-input>
      <q-btn class="primary" @click="createNewList()">+</q-btn>
    </div>
    <q-virtual-scroll
      class="dynamic-max-height"
      :items="groceryLists"
      separator
      v-slot="{ item, index }"
      >
        <q-item class="q-my-sm" clickable v-ripple to="/list">
          <q-item-section>
            <q-item-label>{{ item.Name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption lines="1">{{ item.Items.length }}</q-item-label>
          </q-item-section>
        </q-item>
    </q-virtual-scroll>
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
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 2rem;
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
.dynamic-max-height {
  flex: 1;
  overflow-y: auto; /* Add scroll bar if the content exceeds the max height */
}
</style>
