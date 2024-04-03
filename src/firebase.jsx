// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBB20axOeHqb0ca7Kyu5qrpS8eAPUf6rXI",
  authDomain: "door20-79d6b.firebaseapp.com",
  projectId: "door20-79d6b",
  storageBucket: "door20-79d6b.appspot.com",
  messagingSenderId: "534930495887",
  appId: "1:534930495887:web:846d3bb3c4ff040470d3fa",
  measurementId: "G-5XEYM54TFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);