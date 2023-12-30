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

        <!-- TEST CODE -->
        <div class="flex-row p1">
            <q-select class="flex-grow" filled v-model="selectedStore" label="Store" :options="storeOptions" style="width: 250px" behavior="dialog"/>
            <InputBox v-model="addedStore" @onAdded="handleAddedStore" label="Add" title="Add a store"/>

            <q-select class="flex-grow" filled v-model="selectedLocation" label="Location" :options="locationOptions" style="width: 250px" behavior="dialog"/>
            <InputBox v-model="addedLocation" @onAdded="handleAddedLocation" label="Add" title="Add a location"/>
            
            <q-btn color="primary" class="ml1" @click="saveGroceryList()">Start Shopping</q-btn>
        </div>
        <!-- END TEST CODE -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GroceryList from 'src/models/groceryList';
import Item from 'src/models/item';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { Notify, useQuasar } from 'quasar'
import InputBox from 'src/components/InputBox.vue'
import { capitalizeAndTrimAllWordsInString } from '../utils/helpers'

const authStore = useAuthStore()
const quasar = useQuasar()
const groceryListKeyStore = useGroceryListKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const newItemName = ref("")


// START OF STORE/LOCATION CODE

const storeOptions = ref([
    'Target', 'Walmart', 'Market Basket', 'Stop & Shop', 'Whole Foods', 'Trader Joe\'s', 'BJ\'s', 'Costco', 'Amazon', 'Other'
])

const locationOptions = ref([
    'Danvers', 'Middleton', 'Woburn', 'Lowell'
])

let addedLocation = ref('')
let addedStore = ref('')

let selectedLocation = ref('')
let selectedStore = ref('')

const handleAddedStore = () => {
    addedStore.value = capitalizeAndTrimAllWordsInString(addedStore.value);
    var isNew = addedStore.value.length > 0 && !storeOptions.value.includes(addedStore.value); 

    if(isNew) {
        Notify.create({ type: 'positive', message: "Added '" + addedStore.value + "' to stores" })
        storeOptions.value.push(addedStore.value);
        selectedStore.value = addedStore.value;
        addedStore.value  = '';
    } 
};

const handleAddedLocation = () => {    
    addedLocation.value = capitalizeAndTrimAllWordsInString(addedLocation.value);
    var isNew = addedLocation.value.length > 0 && !locationOptions.value.includes(addedLocation.value); 

    if(isNew) {
        Notify.create({ type: 'positive', message: "Added '" + addedStore.value + "' to stores" })
        locationOptions.value.push(addedLocation.value);
        selectedLocation.value = addedLocation.value;
        addedLocation.value  = '';
    } 
};

// END OF STORE/LOCATION CODE

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

h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
}

</style>
  