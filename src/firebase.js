// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA20EtA7P2oTndb_BObBZTEdok0g68nWNg",
  authDomain: "to-do-list-app-34afb.firebaseapp.com",
  projectId: "to-do-list-app-34afb",
  storageBucket: "to-do-list-app-34afb.firebasestorage.app",
  messagingSenderId: "425552223545",
  appId: "1:425552223545:web:8d438f4dfb769da7311ce8",
  measurementId: "G-9BT5LLCDR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)