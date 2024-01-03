<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" @click="router.back()">Back</q-btn>
            <q-btn class="flex-grow ml1" @click="tryLeaveList()">Leave {{ groceryList.Name }}</q-btn>
        </div>
        <div class="flex-row mb1">
            <q-select
                label="Add user by email"
                filled
                v-model="newUserEmail"
                use-input
                input-debounce="0"
                @new-value="addUser"
                @update:model-value="addUser"
                :options="recommendedUsers"
                class="flex-grow mr1"
            />
            <q-btn color="primary" @click="addUser()">+</q-btn>
        </div>
      
        <h4>Who can see the list</h4>
        <q-virtual-scroll
            class="flex-grow"
            :items="usersOfList"
            separator
            v-slot="{ item, index }"
            >
            <q-item clickable v-ripple>
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
import { ref, computed } from 'vue';
import { updateDb, setDb } from 'src/firebaseConfig'
import { useAuthStore } from 'src/stores/authStore';
import { useGroceryListKeyStore } from 'src/stores/groceryListKeyStore';
import UserInfo from 'src/models/userInfo';
import { getUserInfo } from 'src/userManagement';
import { useRouter } from 'vue-router';
import { getAllPeopleOnList, getList, getAUsersLists } from 'src/groceryListsManagement';
import { usePopupStore } from 'src/stores/popupStore';

const router = useRouter();
const authStore = useAuthStore()
const groceryListKeyStore = useGroceryListKeyStore()
const newUserEmail = ref("")

const groceryList = getList(groceryListKeyStore.getKey())
var usersOfList = computed(() => getUsersOnListToDisplay())
var recommendedUsers = computed(() => getRecommendedsToDisplay())

var recommended = ref();
recommended.value = getRecommendedsToDisplay();

function getUsersOnListToDisplay() {
    var people = getAllPeopleOnList(groceryListKeyStore.getKey())
    return convertUserEmailsToUserInfos(people)
}

function getRecommendedsToDisplay() {
    var allMyLists = getAUsersLists(authStore.userEmail);

    let usersOfListEmails = usersOfList.value.flatMap((user) => user.Email)
    let history = allMyLists.flatMap(([, list]) => list.Users)
    
    let usersToRecommend: string[] = [];
    
    for(let email of history) {
        if(!usersOfListEmails.includes(email) && !usersToRecommend.includes(email) && authStore.userEmail !== email) {
            usersToRecommend.push(email);
        }
    }

    return usersToRecommend;
    // return convertUserEmailsToUserInfos(usersToRecommend);
}
  
function addUser(newValue?: string, done?: any) {

    var email = newValue != null ? newValue : newUserEmail.value.trim()
    console.log(email);
    console.log(newUserEmail.value.trim());

    if (email.length > 0) {
        var userInfo = getUserInfo(email)
        if (userInfo == null) {
            usePopupStore().displayPopup({color: 'red', position: 'center', message: "No user found with email '" + email + "'!"})
            return
        }

        groceryList.addUser(userInfo.Email)
        newUserEmail.value = ""
        saveGroceryList()
        newUserEmail.value = ""

        if(!!done) done(email);
    }

    newUserEmail.value = ""

}

function tryLeaveList() {
    usePopupStore().displayPopup({color: 'red', position: 'center', message: "Are you sure you want to leave the list '" + groceryList.Name  + "'?", actions: [{label: 'Yes', color: 'white', handler: () => { leaveList() }}, {label: 'No', color: 'white'}]})
}

function leaveList() {
    groceryList.removeUser(authStore.userEmail)
    if (groceryList.Users.length > 0) {
        saveGroceryList()
    }
    else {
        setDb("GroceryLists/" + groceryListKeyStore.getKey(), null)
    }

    groceryListKeyStore.clearKey()
    router.replace('/')
}

function saveGroceryList() {
    updateDb("GroceryLists/" + groceryListKeyStore.getKey(), groceryList)
}

function convertUserEmailsToUserInfos(users: string[]) {
    var usersWithInfo: UserInfo[] = [];

    for (var email of users) {
        var userInfo = getUserInfo(email) ?? new UserInfo("", email)
        usersWithInfo.push(userInfo)
    }

    return usersWithInfo;
}

</script>
  
<style scoped>
    .recommended {
        max-width: 15rem;
    }
    .q-item {
        margin: 0;
    }
    h4 {
        font-size: 1.2rem;
    }
</style>
