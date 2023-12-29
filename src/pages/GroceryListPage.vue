<template>
    <div class="main">
        <div class="input-container">
            <q-input class="input" filled v-model="newItemName" label="Add item" stack-label dense @keydown.enter.prvent="createNewItem()"></q-input>
            <q-btn class="primary" @click="createNewItem()">+</q-btn>
        </div>
      
        <q-virtual-scroll
            class="dynamic-max-height"
            :items="groceryList.Items"
            separator
            v-slot="{ item, index }"
            >
            <q-item class="q-my-sm" clickable v-ripple @click="deleteItem(item.ItemName)">
                <q-item-section>
                    <q-item-label>{{ item.ItemName }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-item-label caption lines="1">{{ item.AdderName }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-virtual-scroll>
    </div>
  </template>
  
<script setup lang="ts">
import { ref } from 'vue';
import GroceryList from 'src/models/groceryList';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useUserStore } from 'src/stores/userStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { useQuasar } from 'quasar'

const userStore = useUserStore()
const quasar = useQuasar()
const groceryListKeyStore = useGroceryListKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const newItemName = ref("")

const listener = attachEvent("GroceryLists/" + groceryListKeyStore.key, (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
});
  
function createNewItem() {
    var itemName = newItemName.value.trim()
    if (itemName.length > 0) {
        groceryList.value.addItem(new Item(itemName, userStore.user.Nickname))
        newItemName.value = ""
        updateDb("GroceryLists/" + groceryListKeyStore.key, groceryList.value)
    }
}

function deleteItem(itemName: string) {
    quasar.notify({color: 'blue', position: 'center', message: "Delete '" + itemName + "'", actions: [{label: 'Yes', color: 'white', handler: () => { groceryList.value.removeItem(itemName) }}, {label: 'No', color: 'white'}]})
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
  