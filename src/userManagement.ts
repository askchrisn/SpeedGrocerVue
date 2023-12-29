import { useAuthStore } from "./stores/authStore";
import { useUserStore } from "./stores/userStore";
import { attachEvent } from "./firebaseConfig"
import User from "./models/user"

var userMap: {[email: string] : User} = {}

attachEvent("Users", (snapshot) => {
    userMap = snapshot
    console.log(userMap)
    updateUser()
  });

export function updateUser() {
    console.log("updateUser")
    const authStore = useAuthStore()
    const userStore = useUserStore()
    console.log(userStore.user)
    if (authStore.isAuthenticated && !userStore.exists) {
        console.log("user doesn't exist yet")
        var email = authStore.user?.email ?? ""
        console.log("Email: " + email)
        if (email in userMap) {
            console.log("user found!")
            userStore.setUser(userMap[email] as User)
        }
    }
}