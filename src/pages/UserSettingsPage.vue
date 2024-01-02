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
                <q-label>{{ userInfo.displayShoppingViewMode() }}</q-label>
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
import { UserInfo } from 'src/models/userInfo';
import { saveUserInfo } from 'src/userManagement';

const router = useRouter();
const authStore = useAuthStore()

const userInfo = ref(new UserInfo())
const smartSearchEnabled = ref(false)

const listener = attachEvent("Users/" + adjustEmail(authStore.userEmail), (snapshot) => {
    userInfo.value = UserInfo.fromObject(snapshot)
    smartSearchEnabled.value = userInfo.value.SmartSearchEnabled
});

watch(() => smartSearchEnabled.value, (newValue, oldValue) => {
    userInfo.value.SmartSearchEnabled = smartSearchEnabled.value
    saveUserInfo(userInfo.value)
});

function goBack() {

}

</script>
  
<style scoped>

</style>
  