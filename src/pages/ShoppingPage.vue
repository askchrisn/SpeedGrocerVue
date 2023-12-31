<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
        </div>
        <div class="lists-container">
            <div class="half flex-column">
                <q-label class="text-horizontal-center">Aisle 1</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="groceryList.Items"
                    separator
                    v-slot="{ item, index }"
                    >
                    <q-item clickable v-ripple @click="tryDeleteItem(item.ItemName)">
                        <q-item-section>
                            <q-item-label>{{ item.ItemName + (item.Quantity > 1 ? " x " + item.Quantity : "") }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-item-label caption lines="1">{{ item.AdderName }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-virtual-scroll>
            </div>
            <div class="half flex-column">
                <q-label class="text-horizontal-center">Misc</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="groceryList.Items"
                    separator
                    v-slot="{ item, index }"
                    >
                    <q-item clickable v-ripple @click="tryDeleteItem(item.ItemName)">
                        <q-item-section>
                            <q-item-label>{{ item.ItemName + (item.Quantity > 1 ? " x " + item.Quantity : "") }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-item-label caption lines="1">{{ item.AdderName }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-virtual-scroll>
            </div>
        </div>
        <q-btn color="primary" class="mx1">Next Aisle</q-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GroceryList from 'src/models/groceryList';
import Store from 'src/models/store';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { Notify, useQuasar } from 'quasar'

const authStore = useAuthStore()
const quasar = useQuasar()
const router = useRouter();
const groceryListKeyStore = useGroceryListKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())

const listener = attachEvent("GroceryLists/" + groceryListKeyStore.key, (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
});

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

.half {
    height: 50%;
}
.lists-container {
    flex-grow: 1;
    overflow: auto
}

</style>
  