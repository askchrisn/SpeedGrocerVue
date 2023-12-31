import { defineStore } from 'pinia';

export const useExampleStore = defineStore('counter', 
{
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doubleCount2(state) {
      return state.count * 2
    },
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
