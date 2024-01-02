<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/">Back</q-btn>
            <q-btn class="flex-grow ml1" to="/users">Manage Users</q-btn>
        </div>
        <h1>{{ groceryList.Name }}</h1>
        <div class="flex-row mb1">
            <q-input class="flex-grow" filled v-model="newItemName" label="Add item" stack-label dense @keydown.enter.prvent="createNewItem()"></q-input>
            <q-btn color="primary" class="ml1" @click="createNewItem()">+</q-btn>
        </div>

        <q-virtual-scroll
            class="flex-grow"
            :items="displayItems"
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

        <q-btn class="m1" to="/itemhistory">Item History</q-btn>
        <q-btn color="primary" class="mx1" to="/storeselection">Start Shopping</q-btn>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import GroceryList from 'src/models/groceryList';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { usePopupStore } from 'src/stores/popupStore';
import { adjustEmail } from 'src/utils/helpers';
import { UserInfo } from 'src/models/userInfo';

const authStore = useAuthStore()
const groceryListKeyStore = useGroceryListKeyStore()
const popupStore = usePopupStore()
const groceryList = ref<GroceryList>(new GroceryList())
const displayItems = ref<Array<Item>>([])
const newItemName = ref("")
const userInfo = ref(new UserInfo())
const searchEnabled = ref(true)

const listener1 = attachEvent("GroceryLists/" + groceryListKeyStore.getKey(), (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
    updateDisplayItems()
});

const listener2 = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    userInfo.value = UserInfo.fromObject(snapshot)
    searchEnabled.value = userInfo.value.SmartSearchEnabled
    updateDisplayItems()
});

watch(() => newItemName.value, (newValue, oldValue) => {
    updateDisplayItems()
});

function updateDisplayItems() {
    var searchValue = newItemName.value.toLowerCase()
    var tempItems = []
    for (var item of groceryList.value.Items) {
        if (!searchEnabled.value || item.ItemName.toLowerCase().indexOf(searchValue) != -1) {
            tempItems.push(item)
        }
    }

    displayItems.value = tempItems
}

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
    popupStore.displayPopup({color: 'blue', position: 'center', message: "Delete '" + itemName + "'", actions: [{label: 'Yes', color: 'white', handler: () => { deleteItem(itemName) }}, {label: 'No', color: 'white'}]});
}

function deleteItem(itemName: string) {
    groceryList.value.removeItem(itemName)
    saveGroceryList()
}

function saveGroceryList() {
    updateDb("GroceryLists/" + groceryListKeyStore.getKey(), groceryList.value)
}

</script>

<style scoped>

h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
}

</style>
