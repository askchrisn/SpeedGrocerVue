import { defineStore } from 'pinia';

export const useGroceryListKeyStore = defineStore('groceryListKey', 
{
  state: () => ({
    key: ""
  }),
  actions: {
    setKey(key: string) {
      this.key = key
    }
  },
})
