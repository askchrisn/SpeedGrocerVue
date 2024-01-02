import { defineStore } from 'pinia';

export const useStoreKeyStore = defineStore('storeKeyStore', 
{
  state: () => ({
    key: ""
  }),
  actions: {
    getKey() {
      if(this.key === "") 
        this.key = localStorage.getItem("storeKeyStore") ?? ""
      return this.key
    },
    setKey(key: string) {
      this.key = key
      localStorage.setItem("storeKeyStore", key)
    },
    clearKey() {
        this.key = ""
        localStorage.removeItem("storeKeyStore")
    }
  },
})
