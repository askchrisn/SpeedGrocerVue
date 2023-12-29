import { User, UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../firebaseConfig';
import { LocalStorage } from 'quasar';

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    userEmail: (state) => state.user?.email,
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
      this.user = user;
      LocalStorage.set('user', user);
    },
  },
})
