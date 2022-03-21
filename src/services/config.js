import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDgbQD8PunWdkbaZ8xSPDZhownNYKUY5oY",
  authDomain: "security-ce24b.firebaseapp.com",
  projectId: "security-ce24b",
  storageBucket: "security-ce24b.appspot.com",
  messagingSenderId: "873686134934",
  appId: "1:873686134934:web:ab0bdc5b4a069113c912b7",
  measurementId: "G-K8D83MW14S",
};

export const app = initializeApp(config);
export const firestore = getFirestore(app);
