import { RouteRecordRaw } from 'vue-router';
import MainLayoutVue from 'src/MainLayout.vue';
import HomePage from 'src/pages/HomePage.vue';
import LoginPage from 'src/pages/LoginPage.vue';
import SignUpPage from 'src/pages/SignUpPage.vue';
import UsersPage from 'src/pages/UsersPage.vue';
import ItemHistoryPage from 'src/pages/ItemHistoryPage.vue';
import StoreSelectionPage from 'src/pages/StoreSelectionPage.vue';
import ShoppingPage from 'src/pages/ShoppingPage.vue';
import UserSettingsPage from 'src/pages/UserSettingsPage.vue';
import GroceryListPage from 'src/pages/GroceryListPage.vue';
import ZNotFoundPage from 'src/pages/ZNotFoundPage.vue';

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
      { path: '/settings', component: UserSettingsPage },
      { path: '/login', component: LoginPage, meta: {requiresAuth: false} },
      { path: '/signup', component: SignUpPage, meta: {requiresAuth: false} },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: ZNotFoundPage,
  },
];

export default routes;
