<template>
    <div class="main">
        <div class="flex-row mb1">
            <q-btn color="primary" @click="router.back()">Back</q-btn>
        </div>
        <div class="flex-grow">
            <div class="flex-row my1 mr1 mu1">
                <q-label class="flex-grow">Email:</q-label>
                <q-label>{{ userInfo.Email }}</q-label>
            </div>
            <div class="flex-row mb1 mr1">
                <q-label class="flex-grow">Name:</q-label>
                <q-label>{{ userInfo.Nickname }}</q-label>
            </div>
            <div class="flex-row mb1 mr1">
                <q-label class="flex-grow">Shopping view mode:</q-label>
                <q-select class="flex-grow" filled v-model="shoppingViewMode" @update:modelValue="shoppingViewModeChanged" label="Shopping view mode" :options="Object.keys(ShoppingViewMode).filter((item) => {return isNaN(Number(item))})" style="width: 250px" behavior="dialog"/>
            </div>
            <div class="flex-row mb1">
                <q-label class="flex-grow">Smart search:</q-label>
                <q-toggle v-model="smartSearchEnabled"/>
            </div>
        </div>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/authStore';
import { attachEvent, updateDb } from 'src/firebaseConfig'
import { adjustEmail } from "src/utils/helpers"
import { ShoppingViewMode, UserInfo } from 'src/models/userInfo';
import { saveUserInfo } from 'src/userManagement';

const router = useRouter();
const authStore = useAuthStore()

const userInfo = ref(new UserInfo())
const shoppingViewMode = ref("")
const smartSearchEnabled = ref(false)

const enumValues: string[] = Object.keys(ShoppingViewMode)
  .filter(key => isNaN(Number(ShoppingViewMode[key])))
  .map(key => ShoppingViewMode[key]);

const listener = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    userInfo.value = UserInfo.fromObject(snapshot)
    smartSearchEnabled.value = userInfo.value.SmartSearchEnabled
    shoppingViewMode.value = userInfo.value.displayShoppingViewMode()
});

watch(() => smartSearchEnabled.value, (newValue, oldValue) => {
    userInfo.value.SmartSearchEnabled = smartSearchEnabled.value
    saveUserInfo(userInfo.value)
});

function shoppingViewModeChanged() {
    userInfo.value.ShoppingViewMode = ShoppingViewMode[shoppingViewMode.value]
    saveUserInfo(userInfo.value)
}

</script>
  
<style scoped>

</style>
  