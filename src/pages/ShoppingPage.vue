<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
            <div class="flex-column px1">
                <q-label class="store-name">{{ store.Name }}</q-label>
                <q-label class="store-location">{{ store.Location }}</q-label>
            </div>
        </div>
        <div class="lists-container" v-if="fullView">
            <q-virtual-scroll
                    class="flex-grow"
                    :items="fullViewItems"
                    separator
                    v-slot="{ item, index }"
                    >
                    <q-item clickable v-ripple @click="item.Aisle === '' ? tryDeleteItemAndRemeberLocation(item.ItemName) : deleteItem(item.ItemName)">
                        <q-item-section>
                            <q-item-label>{{ item.ItemName + (item.Quantity > 1 ? " x " + item.Quantity : "") }}</q-item-label>
                        </q-item-section>

                        <q-item-section side>
                            <q-item-label caption lines="1">{{ item.Aisle }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-virtual-scroll>
        </div>
        <div class="lists-container" v-if="!fullView">
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
        <q-btn color="primary" class="mx1" @click="findNextAisle(true)" v-if="!fullView">Next Aisle</q-btn>
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
import { adjustEmail } from 'src/utils/helpers';
import { useAuthStore } from 'src/stores/authStore';
import  UserInfo, { ShoppingViewMode } from 'src/models/userInfo';

const router = useRouter();
const authStore = useAuthStore()
const popupStore = usePopupStore()
const groceryListKeyStore = useGroceryListKeyStore()
const storeKeyStore = useStoreKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const store = ref<Store>(new Store())
const aisleItems = ref<Array<Item>>([])
const miscItems = ref<Array<Item>>([])
const fullViewItems = ref<Array<object>>([])
const currentAisle = ref("")
const selectedAisle = ref("")
const removedItem = ref("")
const showCard = ref(false);
const fullView = ref(true);

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

const listener3 = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    var userInfo = UserInfo.fromObject(snapshot)
    fullView.value = userInfo.ShoppingViewMode == ShoppingViewMode.Full
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
    var tempFullViewItems: Array<object> = []
    for (var item of groceryList.value.Items) {
        var itemAisle = store.value.getAisle(item)
        if (itemAisle == currentAisle.value) {
            tempAisleItems.push(item)
        }
        else if (itemAisle === "") {
            tempMiscItems.push(item)
        }

        var obj = { "ItemName": item.ItemName, "Quantity": item.Quantity, "Aisle": itemAisle }
        tempFullViewItems.push(obj)
    }

    // Custom sorting function
    function compareAisles(a: string, b: string) {
        const aislesOrder = store.value.Aisles;
        var aIndex = aislesOrder.indexOf(a) < 0 ? aislesOrder.length : aislesOrder.indexOf(a)
        var bIndex = aislesOrder.indexOf(b) < 0 ? aislesOrder.length : aislesOrder.indexOf(b)
        return aIndex - bIndex;
    }

    // Sort tempFullViewItems using the custom sorting function
    tempFullViewItems.sort((a, b) => compareAisles(a.Aisle, b.Aisle));

    aisleItems.value = tempAisleItems
    miscItems.value = tempMiscItems
    fullViewItems.value = tempFullViewItems
}

function findNextAisle(skipCurrent: boolean = true) {
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
  