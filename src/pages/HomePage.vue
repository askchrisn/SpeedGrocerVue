<template>
  <div class="main">
    <label>HomePage.vue</label>
    <label>{{ authStore.user?.uid }}</label>
    <q-btn to="/login" @click="authStore.signOut()">Logout</q-btn>
    <q-input class="input" filled v-model="newListName" label="New list name" stack-label dense></q-input>
    <q-btn class="primary" @click="createNewList()">+</q-btn>
    <q-list bordered>
      <q-item v-for="groceryList in groceryLists" class="q-my-sm" clickable v-ripple>
        <q-item-section>
          <q-item-label>{{ groceryList.Name }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label caption lines="1">{{ groceryList.Items.length }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn color="primary" @click="test()">Add To Database Test</q-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from 'src/stores/authStore';
import GroceryList from 'src/models/groceryList';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'

  const authStore = useAuthStore()
  const groceryLists = ref<Array<GroceryList>>([])
  const newListName = ref("")
  attachEvent("GroceryLists", (snapshot) => {
    var updatedGroceryLists = []
    for (let key in snapshot) {
      var gl = GroceryList.fromObject(snapshot[key])
      updatedGroceryLists.push(gl)
    }

  groceryLists.value = updatedGroceryLists
});

function test() {
  var gl = new GroceryList();
  gl.Name = "MyFirstList";

  updateDb('/GroceryLists', gl);
}

  function createNewList() {

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
