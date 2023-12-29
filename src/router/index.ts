/* This file was generated at the time of project creation. */

import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import routes from './routes';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';
import { LocalStorage } from 'quasar';
import { updateUser } from '../userManagement'

export default route(function () {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  let initialized = false;
  const wasPreviouslyLoggedIn = LocalStorage.getItem('user') as User | null;

  onAuthStateChanged(auth, (user) => {
    initialized = true;
    const authStore = useAuthStore();
    authStore.setUser(user);
    updateUser();
    if (authStore.isAuthenticated) {
      Router.push('/');
    }
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (!initialized && !!wasPreviouslyLoggedIn) {
      next();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login');
    } else {
      next();
    }
  });

  return Router;
});
