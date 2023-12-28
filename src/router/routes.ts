import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import ZNotFoundPage from '../pages/ZNotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { }
  },
  { 
    path: '/:catchAll(.*)*', 
    component: ZNotFoundPage,
  },
];

export default routes;
