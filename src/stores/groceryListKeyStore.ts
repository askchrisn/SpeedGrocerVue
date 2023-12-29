import { defineStore } from 'pinia';
import User from '../models/user'

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
