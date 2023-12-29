import { defineStore } from 'pinia';
import User from '../models/user'

export const useUserStore = defineStore('user', 
{
  state: () => ({
    user: new User("","")
  }),
  getters: {
    exists: (state) => !!state.user.Email,
  },
  actions: {
    setUserData(user: User) {
      this.user = user
    },
    clearUser() {
        this.user = new User("test","")
    }
  },
})
