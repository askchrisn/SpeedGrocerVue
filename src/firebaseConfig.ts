import { FirebaseApp, initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push, update, child, get, Database } from 'firebase/database';
import { Auth, getAuth } from 'firebase/auth'
import GroceryList from "./models/groceryList";
import { db } from "./boot/firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyA6UJqm3877FgHO2QwQavlZN03Z-pE42As",
  authDomain: "speedgrocer-a19ba.firebaseapp.com",
  databaseURL: "https://speedgrocer-a19ba-default-rtdb.firebaseio.com",
  projectId: "speedgrocer-a19ba",
  storageBucket: "speedgrocer-a19ba.appspot.com",
  messagingSenderId: "457190636099",
  appId: "1:457190636099:web:c96ac92b0dbaf95b7af2f6",
  measurementId: "G-392VKGXR7P"
};

export function attachEvent(key: string, handler: (a: any) => void) {
  // var dbRef = ref(db, key);
  // return onValue(dbRef, (snapshot) => {
  //     if (snapshot.exists()) {
  //         handler(snapshot.val());
  //     }
  // });
}

export async function getDb(key: string) {
  // var dbRef = ref(db, key);
  // const snapshot = await get(dbRef);

  // if (snapshot.exists()) {
  //   return snapshot.val();
  // } else {
  //   return null;
  // }
}

export function pushDb(refUrl: string, obj: any) {
  const dbRef = push(ref(db, refUrl)); // reference to push to
  set(dbRef, obj);                     // push to database
}

export function updateDb(key: string, obj: any) {
  // var dbRef = ref(db, key);
  // update(dbRef, obj)
}

export function setDb(key: string, obj: any) {
  // var dbRef = ref(db, key);
  // set(dbRef, obj)
}