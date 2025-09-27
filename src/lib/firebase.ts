// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnW0iWx3-GDpKoEYdTdAnqyX1K03pFvEQ",
  authDomain: "studio-7010647984-33899.firebaseapp.com",
  projectId: "studio-7010647984-33899",
  storageBucket: "studio-7010647984-33899.appspot.com",
  messagingSenderId: "628711159764",
  appId: "1:628711159764:web:e02e848073d41df456c841"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
