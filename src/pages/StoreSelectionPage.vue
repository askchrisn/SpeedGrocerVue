<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
        </div>
        <div class="flex-grow">
            <div class="flex-row p1">
                <q-select class="flex-grow" filled v-model="selectedStore" @newValue="console.log('ayy')" label="Store" :options="storeOptions" style="width: 250px" behavior="dialog"/>
                <InputBox class="mr1" v-model="addedStore" @onAdded="handleAddedStore" label="Add" title="Add a store"/>
            </div>
            <div class="flex-row p1">
                <q-select class="flex-grow" filled v-model="selectedLocation" label="Location" :options="locationOptions" style="width: 250px" behavior="dialog"/>
                <InputBox v-model="addedLocation" @onAdded="handleAddedLocation" label="Add" title="Add a location"/>
            </div>
        </div>
        <q-btn color="primary" class="ml1">Continue</q-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GroceryList from 'src/models/groceryList';
import Store from 'src/models/store';
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

const storeOptions = ref([])
const locationOptions = ref([])

const storeNameLocationMap = ref<{ [key: string]: string[] }>({})

const addedLocation = ref('')
const addedStore = ref('')

const selectedLocation = ref('')
const selectedStore = ref('')

const listener = attachEvent("Stores", (snapshot) => {
    var updatedStoreNameLocationMap: {[key: string]: string[]} = {}
    for (let key in snapshot) {
        var store = Store.fromObject(snapshot[key])
        console.log(store)
        if (!(store.Name in updatedStoreNameLocationMap)) {
            updatedStoreNameLocationMap[store.Name] = []
        }

        if (updatedStoreNameLocationMap[store.Name].indexOf(store.Location) == -1) {
            updatedStoreNameLocationMap[store.Name].push(store.Location)
        }
    }

    storeNameLocationMap.value = updatedStoreNameLocationMap
    storeOptions.value = Object.keys(storeNameLocationMap.value)
});

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

</script>
  
<style scoped>

h1 {
    margin: 0;
    margin-bottom: 1rem;
    font-size: 2rem;
    font-weight: bolder;
}

</style>
  