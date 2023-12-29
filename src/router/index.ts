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
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/firebaseConfig';

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

  onAuthStateChanged(auth, (user) => {
    const authStore = useAuthStore();
    authStore.setUser(user);

    if(!authStore.isAuthenticated) {
      authStore.signOut();
      Router.push('/login');
    }
  });

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();

    // Upon initialization, get the user from firebase
    if(!authStore.isAuthenticated) {
      var currentUser = await authStore.getPreviouslyLoggedInUser();
      authStore.setUser(currentUser); 
    }

    const requiresAuth = to.meta.requiresAuth;
    const isAuthenticated = authStore.isAuthenticated;

    if (requiresAuth && !isAuthenticated) {
      next('/login');
    } else if(isAuthenticated && to.path === '/login') { 
      next('/');
    } else {
      next();
    }
  });

  return Router;
});
