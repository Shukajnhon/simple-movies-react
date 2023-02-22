// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {connectAuthEmulator, getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLjhW11tKw7g7J0EmFYiQR39IK5NABGqc",
  authDomain: "simple-movies-5f85b.firebaseapp.com",
  projectId: "simple-movies-5f85b",
  storageBucket: "simple-movies-5f85b.appspot.com",
  messagingSenderId: "481708059014",
  appId: "1:481708059014:web:7e5ac28865b2f7b966a407",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
