<template>
    <div class="main">
        <h1>{{ groceryList.Name }}</h1>
      
        <q-virtual-scroll
            class="flex-grow"
            :items="items"
            separator
            v-slot="{ item, index }"
            >
            <q-item :class="{ 'highlighted-item': groceryList.hasItem(item) }" clickable v-ripple @click="clickedItem(item)">
                <q-item-section>
                    <q-item-label>{{ item }}</q-item-label>
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
import { adjustEmail } from 'src/utils/helpers';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import UserInfo from 'src/models/userInfo';

const authStore = useAuthStore()
const groceryListKeyStore = useGroceryListKeyStore()
const groceryList = ref<GroceryList>(new GroceryList())
const items = ref<Array<string>>([])
const userInfo = ref(new UserInfo())

const listener1 = attachEvent("GroceryLists/" + groceryListKeyStore.getKey(), (snapshot) => {
    groceryList.value = GroceryList.fromObject(snapshot)
    items.value = groceryList.value.getItemHistoryByFrequency()
});

const listener2 = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    userInfo.value = UserInfo.fromObject(snapshot)
});

function clickedItem(itemName: string) {
    if (groceryList.value.hasItem(itemName)) {
        groceryList.value.removeItem(itemName, true)
    }
    else {
        if (userInfo.value.AutoCapitalize) {
            itemName = itemName.replace(/\b\w/g, (match) => match.toUpperCase());
        }

        groceryList.value.addItem(new Item(itemName, authStore.userName))
    }
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
.highlighted-item {
    background-color: aquamarine;
}

</style>
  