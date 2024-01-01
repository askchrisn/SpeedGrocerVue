<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
        </div>
        <div class="lists-container">
            <div class="flex-column" :class="{ 'half': miscItems.length > 0 }">
                <q-label class="text-horizontal-center">{{ currentAisle }}</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="aisleItems"
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
            <div class="half flex-column" v-if="miscItems.length > 0">
                <q-label class="text-horizontal-center">Misc</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="miscItems"
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
        <q-btn color="primary" class="mx1" @click="findNextAisle(true)">Next Aisle</q-btn>
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
import { useStoreKeyStore } from 'src/stores/storeKeyStore';
import { Notify, useQuasar } from 'quasar'

const authStore = useAuthStore()
const quasar = useQuasar()
const router = useRouter();
const groceryListKeyStore = useGroceryListKeyStore()
const storeKeyStore = useStoreKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const store = ref<Store>(new Store())
const aisleItems = ref<Array<Item>>([])
const miscItems = ref<Array<Item>>([])
const currentAisle = ref("")

const listener1 = attachEvent("GroceryLists/" + groceryListKeyStore.key, (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
    updateLists()
});

const listener2 = attachEvent("Stores/" + storeKeyStore.key, (snapshot) => {
    store.value = Store.fromObject(snapshot)
    if (currentAisle.value === "" && store.value.Aisles.length > 0) {
        // Likely first time loading in
        currentAisle.value = store.value.Aisles[0]
        findNextAisle(false)
    }
    else {
        updateLists()
    }
});

function updateLists() {
    var tempAisleItems: Array<Item> = []
    var tempMiscItems: Array<Item> = []
    for (var item of groceryList.value.Items) {
        var itemAisle = store.value.getAisle(item)
        if (itemAisle == currentAisle.value) {
            tempAisleItems.push(item)
        }
        else if (itemAisle === "") {
            tempMiscItems.push(item)
        }
    }

    aisleItems.value = tempAisleItems
    miscItems.value = tempMiscItems
}

function findNextAisle(skipCurrent: bool = true) {
    var aisles: Array<string> = []
    
    for (var item of groceryList.value.Items) {
        var aisle = store.value.getAisle(item)
        if (aisle != "") {
            aisles.push(aisle)
        }
    }

    var startIndex = (store.value.Aisles.indexOf(currentAisle.value) + (skipCurrent ? 1 : 0)) % store.value.Aisles.length
    var index = startIndex
    var foundItems = false

    do {
        var aisle = store.value.Aisles[index]
        foundItems = aisles.indexOf(aisle) != -1
        index = (index + 1) % store.value.Aisles.length
    } while (!foundItems && index != startIndex)

    currentAisle.value = aisle
    updateLists()
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

.half {
    height: 50%;
}
.lists-container {
    flex-grow: 1;
    overflow: auto
}

</style>
  