import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Firebase configuration of the web app
const firebaseConfig = {
  apiKey: "AIzaSyDmHWabkUSoWqod6_3Hy6p2WIWngDyKHGc",
  authDomain: "home-management-2941e.firebaseapp.com",
  projectId: "home-management-2941e",
  storageBucket: "home-management-2941e.appspot.com",
  messagingSenderId: "525712781359",
  appId: "1:525712781359:web:8d90a05cb8823d5425d6da"
};

// Initialize Firebase and export the auth and database services
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE = getFirestore(FIREBASE_APP);