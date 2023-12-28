import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { LocalStorage } from 'quasar'

const firebaseConfig = {
    apiKey: "AIzaSyA6UJqm3877FgHO2QwQavlZN03Z-pE42As",
    authDomain: "speedgrocer-a19ba.firebaseapp.com",
    databaseURL: "https://speedgrocer-a19ba-default-rtdb.firebaseio.com",
    projectId: "speedgrocer-a19ba",
    storageBucket: "speedgrocer-a19ba.appspot.com",
    messagingSenderId: "457190636099",
    appId: "1:457190636099:web:c96ac92b0dbaf95b7af2f6",
    measurementId: "G-392VKGXR7P"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//initialize firebase auth
const auth = getAuth()

export { app, auth }

onAuthStateChanged(auth, (user) => {
  if (user) {
   LocalStorage.set('user', user)
  } else {
   LocalStorage.remove('user')
  }
 });

const db = getDatabase(app);

export function attachEvent(key: string, handler: (a: any) => void) {
  var dbRef = ref(db, key);
  return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
          handler(snapshot.val());
      }
  });
}
