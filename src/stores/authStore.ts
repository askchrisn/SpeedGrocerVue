import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../boot/firebase';
import UserInfo from '../models/userInfo';
import { getUserInfo, saveUserInfo } from '../userManagement';
import { Dark } from 'quasar'

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    auth: null as User | null,
    userInfo: null as UserInfo | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.auth,
    userDataLoaded: (state) => !!state.userInfo?.Email,
    userEmail: (state) => state.auth?.email ?? '',
    userName: (state) => state.userInfo?.Nickname ?? '',
  },
  actions: {
    async getPreviouslyLoggedInUser(): Promise<User | null> {
      return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
          if (user) resolve(user);
          else resolve(null);
        }, reject);
      });
    },
    async signIn(email: string, password: string): Promise<void> {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(result.user);
      } catch (error) {
        throw error;
      }
    },
    async signUp(email: string, name: string, password: string): Promise<void> {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        saveUserInfo(new UserInfo(name, email))
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
      this.auth = user;
      this.userInfo = user === null ? null : getUserInfo(user.email ?? '');
      Dark.set(this.userInfo?.DarkMode ?? false);
    },
  },
})
