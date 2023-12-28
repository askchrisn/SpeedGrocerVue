import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from 'src/pages/SignUpPage.vue';
import ZNotFoundPage from '../pages/ZNotFoundPage.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    component: LoginPage, 
    meta: { }
  },
];

export default routes;
