import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import configData from "./config_firebase.json";
const config = {
  apiKey: configData.apiKey,
  authDomain: configData.authDomain,
  projectId: configData.projectId,
  storageBucket: configData.storageBucket,
  messagingSenderId: configData.messagingSenderId,
  appId: configData.appId,
  measurementId: configData.measurementId,
};

export const app = initializeApp(config);
export const firestore = getFirestore(app);
