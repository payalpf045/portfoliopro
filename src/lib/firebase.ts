// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyANaZPssbrVxQagn-gnzyOI0u9z9armMBE",
  authDomain: "portfolio-77323.firebaseapp.com",
  projectId: "portfolio-77323",
  storageBucket: "portfolio-77323.appspot.com",
  messagingSenderId: "998966221169",
  appId: "1:998966221169:web:9d9951afcac58878d0fed0"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);

export { app, storage };
