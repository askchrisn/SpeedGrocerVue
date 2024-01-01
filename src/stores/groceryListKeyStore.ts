import { defineStore } from 'pinia';

export const useGroceryListKeyStore = defineStore('groceryListKey', 
{
  state: () => ({
    key: ""
  }),
  actions: {
    getKey() {
      if(this.key === "") 
        this.key = localStorage.getItem("groceryListKey") ?? ""
      return this.key
    },
    setKey(key: string) {
      this.key = key
      localStorage.setItem("groceryListKey", key)
    },
    clearKey() {
        this.key = ""
        localStorage.removeItem("groceryListKey")
    }
  },
})
