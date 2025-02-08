// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzkxpdUzJjYsKfi_vAXaX7EU60sJltKo0",
  authDomain: "comision74400.firebaseapp.com",
  projectId: "comision74400",
  storageBucket: "comision74400.firebasestorage.app",
  messagingSenderId: "417709963634",
  appId: "1:417709963634:web:9477d3e1e21b899a56c5eb",
  measurementId: "G-ENVCPXS428"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export{collection,addDoc};