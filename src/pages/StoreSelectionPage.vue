<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" to="/list">Back</q-btn>
        </div>
        <div class="flex-grow">
            <div class="flex-row p1">
                <q-select class="flex-grow" filled v-model="selectedStore" @update:modelValue="selectedStoreChanged" label="Store" :options="storeOptions" style="width: 250px" behavior="dialog"/>
                <InputBox class="mr1" v-model="addedStore" @onAdded="handleAddedStore" label="Add" title="Add a store"/>
            </div>
            <div v-if="locationOptions.length > 0 || addedStoreName" class="flex-row p1">
                <q-select class="flex-grow" filled v-model="selectedLocation" label="Location" :options="locationOptions" style="width: 250px" behavior="dialog"/>
                <InputBox v-model="addedLocation" @onAdded="handleAddedLocation" label="Add" title="Add a location"/>
            </div>
        </div>
        <q-btn color="primary" class="ml1" @click="useStore">Continue</q-btn>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import GroceryList from 'src/models/groceryList';
import Store from 'src/models/store';
import Item from 'src/models/item';
import { attachEvent, pushDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { useStoreKeyStore } from 'src/stores/storeKeyStore';
import { Notify, useQuasar } from 'quasar'
import InputBox from 'src/components/InputBox.vue'
import { capitalizeAndTrimAllWordsInString } from '../utils/helpers'
import { SpawnSyncOptionsWithStringEncoding } from 'child_process';

const authStore = useAuthStore()
const quasar = useQuasar()
const router = useRouter();
const groceryListKeyStore = useGroceryListKeyStore()
const storeKeyStore = useStoreKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())

const storeOptions = ref([])
const locationOptions = ref([])

const storeNameLocationMap = ref<{ [key: string]: string[] }>({})
const storesKeys = ref<Array<[string, Store]>>([])

const addedLocation = ref('')
const addedStore = ref('')

const selectedLocation = ref('')
const selectedStore = ref('')

const addedStoreName = ref(false)

const listener = attachEvent("Stores", (snapshot) => {
    var updatedStoreNameLocationMap: {[key: string]: string[]} = {}
    var updatedStores: Array<[string,Store]> = []

    for (let key in snapshot) {
        var store = Store.fromObject(snapshot[key])
        updatedStores.push([key,store])
        if (!(store.Name in updatedStoreNameLocationMap)) {
            updatedStoreNameLocationMap[store.Name] = []
        }

        if (updatedStoreNameLocationMap[store.Name].indexOf(store.Location) == -1) {
            updatedStoreNameLocationMap[store.Name].push(store.Location)
        }
    }

    storeNameLocationMap.value = updatedStoreNameLocationMap
    storeOptions.value = Object.keys(storeNameLocationMap.value)
    storesKeys.value = updatedStores
});

function selectedStoreChanged() {
    if (selectedStore.value in storeNameLocationMap.value) {
        locationOptions.value = storeNameLocationMap.value[selectedStore.value]
    }
    else {
        locationOptions.value = []
    }

    selectedLocation.value = ""
}

function useStore() {
    if (selectedStore.value.length == 0 || selectedLocation.value.length == 0) return

    var key = ""
    var store: Store = null

    for (var sKVP of storesKeys.value) {
        var s = sKVP[1]
        if (s.Name === selectedStore.value && s.Location == selectedLocation.value) {
            store = s
            key = sKVP[0]
            break
        }
    }

    if (store == null) {
        store = new Store()
        store.Name = selectedStore.value
        store.Location = selectedLocation.value
        store.generateAisles()

        pushDb("Stores", store)
        // TODO, set key with newly created store

        Notify.create({ type: 'positive', message: "Saved new store!" })
    }

    storeKeyStore.setKey(key)

    router.push('/shopping');
}

const handleAddedStore = () => {
    addedStore.value = capitalizeAndTrimAllWordsInString(addedStore.value);
    var isNew = addedStore.value.length > 0 && !storeOptions.value.includes(addedStore.value); 

    if(isNew) {
        addedStoreName.value = true
        Notify.create({ type: 'positive', message: "Added '" + addedStore.value + "' to stores" })
        storeOptions.value.push(addedStore.value);
        selectedStore.value = addedStore.value;
        addedStore.value  = '';
        locationOptions.value = []
    } 
};

const handleAddedLocation = () => {    
    addedLocation.value = capitalizeAndTrimAllWordsInString(addedLocation.value);
    var isNew = addedLocation.value.length > 0 && !locationOptions.value.includes(addedLocation.value); 

    if (isNew) {
        Notify.create({ type: 'positive', message: "Added '" + addedLocation.value + "' to stores" })
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
  