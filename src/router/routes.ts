import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import ZNotFoundPage from '../pages/ZNotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { }
  },
  { 
    path: '/login', 
    component: LoginPage, 
    meta: { }
  },
];

export default routes;
