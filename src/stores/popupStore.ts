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
    displayConfirmPopup(message: string, handler: void) {
      this.displayPopup({color: 'blue', position: 'center', message: message, actions: [{label: 'Yes', color: 'white', handler: () => { handler }}, {label: 'No', color: 'white'}]});
    },
    removePopup() {
        this.popup();
    }
  },
})
