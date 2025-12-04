import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDGIywlZJ4bPn84s5FYNx6v27-tO3f3SWA",
    authDomain: "gen-lang-client-0255740881.firebaseapp.com",
    projectId: "gen-lang-client-0255740881",
    storageBucket: "gen-lang-client-0255740881.firebasestorage.app",
    messagingSenderId: "504416778150",
    appId: "1:504416778150:web:4ee874644b209c51d58167",
    measurementId: "G-PVNG7MKGF5"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { app, auth, db, storage };
