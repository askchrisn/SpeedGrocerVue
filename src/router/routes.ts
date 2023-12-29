import { RouteRecordRaw } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from 'src/pages/SignUpPage.vue';
import UsersPage from 'src/pages/UsersPage.vue';
import ZNotFoundPage from '../pages/ZNotFoundPage.vue';
import GroceryListPage from '../pages/GroceryListPage.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    component: HomePage, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/login', 
    component: LoginPage, 
  },
  { 
    path: '/signup', 
    component: SignUpPage, 
  },
  { 
    path: '/list', 
    component: GroceryListPage, 
  },
  { 
    path: '/users', 
    component: UsersPage, 
  },
  { 
    path: '/:catchAll(.*)*', 
    component: ZNotFoundPage, 
  },
];

export default routes;
