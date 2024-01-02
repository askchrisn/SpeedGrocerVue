<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
            <div class="flex-column px1">
                <q-label class="store-name">{{ store.Name }}</q-label>
                <q-label class="store-location">{{ store.Location }}</q-label>
            </div>
        </div>
        <div class="lists-container">
            <div class="flex-column" :class="{ 'half': miscItems.length > 0 }" v-if="aisleItems.length > 0">
                <q-label class="text-horizontal-center">{{ currentAisle }}</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="aisleItems"
                    separator
                    v-slot="{ item, index }"
                    >
                    <q-item clickable v-ripple @click="deleteItem(item.ItemName)">
                        <q-item-section>
                            <q-item-label>{{ item.ItemName + (item.Quantity > 1 ? " x " + item.Quantity : "") }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-item-label caption lines="1">{{ item.AdderName }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-virtual-scroll>
            </div>
            <div class="flex-column" :class="{ 'half': aisleItems.length > 0 }" v-if="miscItems.length > 0">
                <q-label class="text-horizontal-center">Misc</q-label>
                <q-virtual-scroll
                    class="flex-grow"
                    :items="miscItems"
                    separator
                    v-slot="{ item, index }"
                    >
                    <q-item clickable v-ripple @click="tryDeleteItemAndRemeberLocation(item.ItemName)">
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
        <q-dialog v-model="showCard" persistent>
            <q-card style="min-width: 350px">
                <q-card-section>
                    <div class="text-h6">Where did you find '{{ removedItem }}'?</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-select class="flex-grow" filled v-model="selectedAisle" label="Aisle" :options="store.Aisles" style="width: 250px" behavior="dialog"/>
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" v-close-popup @click="rememberItem"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GroceryList from 'src/models/groceryList';
import Store from 'src/models/store';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { useStoreKeyStore } from 'src/stores/storeKeyStore';
import { usePopupStore } from 'src/stores/popupStore';

const router = useRouter();
const popupStore = usePopupStore()
const groceryListKeyStore = useGroceryListKeyStore()
const storeKeyStore = useStoreKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const store = ref<Store>(new Store())
const aisleItems = ref<Array<Item>>([])
const miscItems = ref<Array<Item>>([])
const currentAisle = ref("")
const selectedAisle = ref("")
const removedItem = ref("")
const showCard = ref(false);

const listener1 = attachEvent("GroceryLists/" + groceryListKeyStore.getKey(), (snapshot) => {
    var updatedGroceryList = GroceryList.fromObject(snapshot)
    if (router.currentRoute.value.path === "/shopping" && groceryList.value != null && groceryList.value.Name === updatedGroceryList.Name && groceryList.value.Items.length < updatedGroceryList.Items.length) {
        for (var item of updatedGroceryList.Items) {
            if (!groceryList.value.hasItem(item.ItemName)) {
                popupStore.displayPopup({ type: 'positive', message: item.AdderName + " added " + item.ItemName })
            }
        }
    }
    groceryList.value = updatedGroceryList
    updateLists()
    if (aisleItems.value.length == 0) {
        findNextAisle()
    }
});

const listener2 = attachEvent("Stores/" + storeKeyStore.getKey(), (snapshot) => {
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

function rememberItem() {
    if (removedItem.value !== "" && store.value.Aisles.indexOf(selectedAisle.value) != -1) {
        store.value.rememberItem(removedItem.value, selectedAisle.value)
        saveStore()
        popupStore.displayPopup({ type: 'positive', message: "Remembering item '" + removedItem.value + "' is in '" + selectedAisle.value + "'" })
    }
    else {
        popupStore.displayPopup({ type: 'negative', message: "Error encountered when remembering item '" + removedItem.value + "' in '" + selectedAisle.value + "'" })
    }

    deleteItem(removedItem.value)

    removedItem.value = ""
    selectedAisle.value = ""
}

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

function deleteItem(itemName: string) {
    groceryList.value.removeItem(itemName)
    saveGroceryList()
}

function tryDeleteItemAndRemeberLocation(itemName: string) {
    removedItem.value = itemName
    showCard.value = true
}

function saveStore() {
    updateDb("Stores/" + storeKeyStore.getKey(), store.value)
}

function saveGroceryList() {
    updateDb("GroceryLists/" + groceryListKeyStore.getKey(), groceryList.value)
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
.store-name {
    font-weight: bold;
}
.store-location {
    font-style: italic;
}

</style>
  