import { defineStore } from 'pinia';
import User from '../models/user'

export const useUserStore = defineStore('user', 
{
  state: () => ({
    user: new User("","")
  }),
  getters: {
    exists(): boolean { return this.user.Email != "" },
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
        this.user = new User("test","")
    }
  },
})
