import { defineStore } from 'pinia';

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    isAuthenticated: true
  }),
  getters: {
    // nothing yet
  },
  actions: {
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
    },
    loginlogout() {
      this.isAuthenticated = !this.isAuthenticated;
    }
  },
})
