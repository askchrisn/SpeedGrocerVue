import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";
import { attachEvent } from "./firebaseConfig"
import User from "./models/user"

var userMap: {[email: string] : User} = {}

attachEvent("Users", (snapshot) => {
    userMap = snapshot
    updateUser()
  });

export function updateUser() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    if (authStore.isAuthenticated && !userStore.exists) {
        var emailKey = adjustEmailKey(authStore.user?.email ?? "")
        if (emailKey in userMap) {
            userStore.setUserData(userMap[emailKey] as User)
        }
    }
}

function adjustEmailKey(email: string) {
    email = email.replace(/\./gi, "D")
    email = email.replace(/@/gi, "A")
    return email
}