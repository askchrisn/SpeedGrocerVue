import { UserCredential, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from '../firebaseConfig';

export const useAuthStore = defineStore('AuthStore', 
{
  state: () => ({
    userCreds: null as UserCredential | null,
  }),
  getters: {
    user: (state) => state.userCreds?.user,
  },
  actions: {
    async signIn(email: string, password: string): Promise<void> {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.setUser(result);
      } catch (error) {
        console.error('Authentication error:', error);
        throw error;
      }
    },

    async signUp(email: string, password: string): Promise<void> {
      try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        this.setUser(result);
      } catch (error) {
        console.error('Sign-up error:', error);
        throw error;
      }
    },

    async signOut(): Promise<void> {
      try {
        await signOut(auth);
        this.setUser(null);
      } catch (error) {
        console.error('Sign out error:', error);
        throw error;
      }
    },

    setUser(user: UserCredential | null): void {
      this.userCreds = user;
    },
  },
})
