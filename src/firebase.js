// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnYT6lbtc_ucNgIqrjxXLSi6GyO3k8JcE",
    authDomain: "gul-plaza-relief.firebaseapp.com",
    projectId: "gul-plaza-relief",
    storageBucket: "gul-plaza-relief.firebasestorage.app",
    messagingSenderId: "153721617064",
    appId: "1:153721617064:web:b1fed75f7d3b0c2f61a09d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
