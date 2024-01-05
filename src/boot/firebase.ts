import { Capacitor } from '@capacitor/core'
import { getApp, initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database';

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

export const app = initializeApp(firebaseConfig);
export const auth = initAuthentication();
export const db = getDatabase(app);
export const analytics = getAnalytics(app);

function initAuthentication() {
    if(Capacitor.isNativePlatform()) {
        return initializeAuth(getApp(), { persistence: indexedDBLocalPersistence });
    }
    else {
        return getAuth();
    }
}