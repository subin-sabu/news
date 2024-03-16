
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

//Firebase Configuration with API key
const firebaseConfig = {
  apiKey: "AIzaSyCn4jYx9xmrb75P2llwk5dHGoARqnKbrcA",
  authDomain: "reach-malayalam.firebaseapp.com",
  projectId: "reach-malayalam",
  storageBucket: "reach-malayalam.appspot.com",
  messagingSenderId: "901546088334",
  appId: "1:901546088334:web:8813e79189e8eceb8ff6df",
  measurementId: "G-S85RKXQLBE"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage();