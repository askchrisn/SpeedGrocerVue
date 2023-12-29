<template>
    <div class="main">
        <q-btn @click="tryLeaveList()">Leave List</q-btn>
        <div class="input-container">
            <q-input class="input" filled v-model="newUserEmail" label="Add user by email" stack-label dense @keydown.enter.prvent="addUser()"></q-input>
            <q-btn class="primary" @click="addUser()">+</q-btn>
        </div>
      
        <q-virtual-scroll
            class="dynamic-max-height"
            :items="users"
            separator
            v-slot="{ item, index }"
            >
            <q-item class="q-my-sm" clickable v-ripple>
                <q-item-section>
                    <q-item-label>{{ item.Nickname }}</q-item-label>
                </q-item-section>

                <q-item-section side>
                    <q-item-label caption lines="1">{{ item.Email }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-virtual-scroll>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Item from 'src/models/item';
import { attachEvent, updateDb, setDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import { useQuasar } from 'quasar'
import GroceryList from 'src/models/groceryList';
import UserInfo from 'src/models/userInfo';
import { getUserInfo } from 'src/userManagement';
import { useRouter } from 'vue-router';

const router = useRouter();
const authStore = useAuthStore()
const quasar = useQuasar()
const groceryListKeyStore = useGroceryListKeyStore()
const newUserEmail = ref("")
const users = ref<Array<UserInfo>>([])
var groceryList = new GroceryList()

const listener = attachEvent("GroceryLists/" + groceryListKeyStore.key, (snapshot) => {
    groceryList = GroceryList.fromObject(snapshot)
    var tempUsers: Array<UserInfo> = []
    
    for (var email of groceryList.Users) {
        var userInfo = getUserInfo(email) ?? new UserInfo("", email)
        tempUsers.push(userInfo)
    }

    users.value = tempUsers
});
  
function addUser() {
    var email = newUserEmail.value.trim()
    if (email.length > 0) {
        var userInfo = getUserInfo(email)
        if (userInfo == null) {
            quasar.notify({color: 'red', position: 'center', message: "No user found with email '" + email + "'!"})
            return
        }

        groceryList.addUser(email)
        newUserEmail.value = ""
        saveGroceryList()
    }
}

function tryLeaveList() {
    quasar.notify({color: 'red', position: 'center', message: "Are you sure you want to leave the list '" + groceryList.Name + "'?", actions: [{label: 'Yes', color: 'white', handler: () => { leaveList() }}, {label: 'No', color: 'white'}]})
}

function leaveList() {
    groceryList.removeUser(authStore.userEmail)
    if (groceryList.Users.length > 0) {
        saveGroceryList()
    }
    else {
        setDb("GroceryLists/" + groceryListKeyStore.key, null)
    }

    groceryListKeyStore.clearKey()
    router.replace('/')
}

function saveGroceryList() {
    updateDb("GroceryLists/" + groceryListKeyStore.key, groceryList)
}

</script>
  
<style scoped>

.main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 2rem;
}
.input-container {
    display: flex;
    align-items: center;
}
.input {
    flex: 1; /* This makes the input take up the remaining space */
    margin-right: 8px; /* Adjust margin as needed */
}
.test {
    display: flex;
    flex-direction: column;
}
.q-btn {
    margin: 1rem;
}
.dynamic-max-height {
    flex: 1;
    overflow-y: auto; /* Add scroll bar if the content exceeds the max height */
}

</style>
  