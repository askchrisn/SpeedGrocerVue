import { attachEvent, setDb } from "./firebaseConfig"
import { adjustEmail } from "./utils/helpers"
import { useAuthStore } from "./stores/authStore";
import UserInfo from "./models/userInfo";

let allUsers: {[email: string] : UserInfo} = {}

const listener = attachEvent("Users", (snapshot) => {
    allUsers = snapshot

    const authStore = useAuthStore() 
    authStore.setUser(authStore.auth);
});

export function getUserInfo(email: string): UserInfo | null {
    var emailKey = adjustEmail(email);

    if (emailKey in allUsers) {
        return allUsers[emailKey] as UserInfo;
    }

    return null;
}

export function saveUserInfo(userInfo: UserInfo) {
    var emailKey = adjustEmail(userInfo.Email)
    setDb("Users/" + emailKey, userInfo)
}