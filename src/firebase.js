// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT3PkBes65VhztP-fQ9zwrGoa3WfZe58s",
  authDomain: "scaler-sde-intern.firebaseapp.com",
  projectId: "scaler-sde-intern",
  storageBucket: "scaler-sde-intern.appspot.com",
  messagingSenderId: "903671861562",
  appId: "1:903671861562:web:3c489092f6ff76f88ec003"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);