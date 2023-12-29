<template>
    <div class="main">
        <q-btn class="mb1" to="/users">Manage Users</q-btn>
        <h1>{{ groceryList.Name }}</h1>
        <div class="flex-row mb1">
            <q-input class="flex-grow" filled v-model="newItemName" label="Add item" stack-label dense @keydown.enter.prvent="createNewItem()"></q-input>
            <q-btn class="primary" @click="createNewItem()">+</q-btn>
        </div>
      
        <q-virtual-scroll
            class="flex-grow"
            :items="groceryList.Items"
            separator
            v-slot="{ item, index }"
            >
            <q-item class="q-my-sm" clickable v-ripple @click="tryDeleteItem(item.ItemName)">
                <q-item-section>
                    <q-item-label>{{ item.ItemName + (item.Quantity > 1 ? " x " + item.Quantity : "") }}</q-item-label>
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
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { useQuasar } from 'quasar'

const authStore = useAuthStore()
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
        const spaceIndex: number = itemName.indexOf(' ');

        var quantity = 1

        if (spaceIndex !== -1) {
            const quantityString: string = itemName.substring(0, spaceIndex);

            const remainingString: string = itemName.substring(spaceIndex + 1);
            if (!isNaN(Number(quantityString.trim()))) {
                quantity = parseInt(quantityString, 10);
                itemName = remainingString.trim();
            }
        }

        groceryList.value.addItem(new Item(itemName, authStore.userName, quantity))
        newItemName.value = ""
        saveGroceryList()
    }
}

function tryDeleteItem(itemName: string) {
    quasar.notify({color: 'blue', position: 'center', message: "Delete '" + itemName + "'", actions: [{label: 'Yes', color: 'white', handler: () => { deleteItem(itemName) }}, {label: 'No', color: 'white'}]})
}

function deleteItem(itemName: string) {
    groceryList.value.removeItem(itemName)
    saveGroceryList()
}

function saveGroceryList() {
    updateDb("GroceryLists/" + groceryListKeyStore.key, groceryList.value)
}

</script>
  
<style scoped>

.main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 2rem;
}

.q-btn {
    margin-left: 1rem;
}

h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
}

</style>
  