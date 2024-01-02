import { RouteRecordRaw } from 'vue-router';
import MainLayoutVue from 'src/MainLayout.vue';
import HomePage from '../pages/HomePage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignUpPage from 'src/pages/SignUpPage.vue';
import UsersPage from 'src/pages/UsersPage.vue';
import ItemHistoryPage from 'src/pages/ItemHistoryPage.vue';
import StoreSelectionPage from 'src/pages/StoreSelectionPage.vue';
import ShoppingPage from 'src/pages/ShoppingPage.vue';
import ZNotFoundPage from '../pages/ZNotFoundPage.vue';
import GroceryListPage from '../pages/GroceryListPage.vue';

const routes: RouteRecordRaw[] = [
  { 
    path: '/', 
    meta: { requiresAuth: true },
    component: MainLayoutVue,
    children: [
      { path: '', component: HomePage },
      { path: '/list', component: GroceryListPage },
      { path: '/users', component: UsersPage }, 
      { path: '/itemhistory', component: ItemHistoryPage }, 
      { path: '/storeselection', component: StoreSelectionPage }, 
      { path: '/shopping', component: ShoppingPage },
    ],
  },
  {
    path: '',
    meta: { requiresAuth: false },
    children: [
      { path: '/login', component: LoginPage, },
      { path: '/signup', component: SignUpPage, },
    ],
  },
  { 
    path: '/:catchAll(.*)*', 
    component: ZNotFoundPage, 
  },
];

export default routes;
