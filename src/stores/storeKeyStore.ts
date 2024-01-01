import { defineStore } from 'pinia';

export const useStoreKeyStore = defineStore('storeKeyStore', 
{
  state: () => ({
    key: ""
  }),
  actions: {
    setKey(key: string) {
      this.key = key
    },
    clearKey() {
        this.key = ""
    }
  },
})
