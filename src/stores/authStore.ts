import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    isLoggedIn: true
  }),
  getters: {
    // nothing yet
  },
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
  },
})
