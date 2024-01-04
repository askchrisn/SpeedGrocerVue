import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { boot } from 'quasar/wrappers'

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

export default boot(async ({app}) => {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    console.log('auth');
})