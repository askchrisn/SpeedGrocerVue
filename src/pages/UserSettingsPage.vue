<template>
    <div class="main">
        <div class="flex-grow">
            <div class="flex-row my1 mr1 mu1">
                <label class="flex-grow">Email:</label>
                <label>{{ userInfo.Email }}</label>
            </div>
            <div class="flex-row mb1 mr1">
                <label class="flex-grow">Name:</label>
                <label>{{ userInfo.Nickname }}</label>
            </div>
            <div class="flex-row mb1 mr1">
                <label class="flex-grow">Shopping view mode:</label>
                <q-select class="flex-grow" filled v-model="shoppingViewMode" @update:modelValue="shoppingViewModeChanged" label="Shopping view mode" :options="Object.keys(ShoppingViewMode).filter((item) => {return isNaN(Number(item))})" style="width: 250px" behavior="dialog"/>
            </div>
            <div class="flex-row mb1">
                <label class="flex-grow">Smart search:</label>
                <q-toggle v-model="smartSearchEnabled"/>
            </div>
            <div class="flex-row mb1">
                <label class="flex-grow">Dark Mode:</label>
                <q-toggle v-model="darkMode"/>
            </div>
            <div class="flex-row mb1">
                <label class="flex-grow">Auto Capitalize:</label>
                <q-toggle v-model="autoCapitalize"/>
            </div>
        </div>
        <q-btn color="negative" to="/login" @click="authStore.signOut">Logout</q-btn>
    </div>
  </template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { adjustEmail } from "src/utils/helpers"
import { ShoppingViewMode } from 'src/models/userInfo';
import UserInfo from 'src/models/userInfo';
import { saveUserInfo } from 'src/userManagement';
import { Dark } from 'quasar';

const router = useRouter();
const authStore = useAuthStore()

const userInfo = ref(new UserInfo())
const shoppingViewMode = ref("")
const smartSearchEnabled = ref(false)
const darkMode = ref(false)
const autoCapitalize = ref(false)

const enumValues: string[] = Object.keys(ShoppingViewMode)
  .filter(key => isNaN(Number(ShoppingViewMode[key])))
  .map(key => ShoppingViewMode[key]);

const listener = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    userInfo.value = UserInfo.fromObject(snapshot)
    smartSearchEnabled.value = userInfo.value.SmartSearchEnabled
    shoppingViewMode.value = userInfo.value.displayShoppingViewMode()
    darkMode.value = userInfo.value.DarkMode
    autoCapitalize.value = userInfo.value.AutoCapitalize
});

watch([
    () => smartSearchEnabled.value,
    () => darkMode.value,
    () => autoCapitalize.value,
], () => {
    userInfo.value.SmartSearchEnabled = smartSearchEnabled.value
    userInfo.value.DarkMode = darkMode.value
    userInfo.value.AutoCapitalize = autoCapitalize.value
    saveUserInfo(userInfo.value)
})

function shoppingViewModeChanged() {
    userInfo.value.ShoppingViewMode = ShoppingViewMode[shoppingViewMode.value]
    saveUserInfo(userInfo.value)
}

</script>

<style scoped>

</style>
