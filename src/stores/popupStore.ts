import { defineStore } from 'pinia';
import { Notify,  QNotifyCreateOptions } from 'quasar';

export const usePopupStore = defineStore('popupStore', 
{
  state: () => ({
    popup: () => {},
  }),
  actions: {
    displayPopup(opts: string | QNotifyCreateOptions) {
        this.popup();
        this.popup = Notify.create(opts);
    },
    removePopup() {
        this.popup();
    }
  },
})
