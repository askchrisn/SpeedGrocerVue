import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../firebaseConfig';
import { LocalStorage } from 'quasar';
import UserInfo from '../models/userInfo';
import { getUserInfo } from '../userManagement';
import { adjustEmail } from 'src/utils/helpers';

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    auth: null as User | null,
    userInfo: null as UserInfo | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth,
    userDataLoaded: (state) => !!state.userInfo?.Email,
    userEmail: (state) => adjustEmail(state.auth?.email ?? ''),
    userName: (state) => state.userInfo?.Nickname ?? '',
  },
  actions: {
    async signIn(email: string, password: string): Promise<void> {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(result.user);
      } catch (error) {
        throw error;
      }
    },
    async signUp(email: string, password: string): Promise<void> {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        this.setUser(result.user);
      } catch (error) {
        throw error;
      }
    },
    async signOut(): Promise<void> {
      try {
        await signOut(auth);
        this.setUser(null);
      } catch (error) {
        throw error;
      }
    },
    setUser(user: User | null): void {
      if(user == null) {
        this.auth = null;
        this.userInfo = null;
        LocalStorage.remove('user');
      }
      else {
        this.auth = user;
        this.userInfo = getUserInfo(user?.email ?? '');
        LocalStorage.set('user', user);
      }
    },
  },
})
