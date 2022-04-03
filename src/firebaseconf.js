import {initializeApp} from 'firebase/app'
import { getFirestore,  getDoc, getDocs, collection } from 'firebase/firestore'
import {getAuth, onAuthStateChanged,connectAuthEmulator, GoogleAuthProvider } from 'firebase/auth'

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDgbQD8PunWdkbaZ8xSPDZhownNYKUY5oY",
    authDomain: "security-ce24b.firebaseapp.com",
    projectId: "security-ce24b",
    storageBucket: "security-ce24b.appspot.com",
    messagingSenderId: "873686134934",
    appId: "1:873686134934:web:f9cc9f1840bcfd7ac912b7",
    measurementId: "G-6V47HZDW5X"

});

const auth = getAuth(firebaseApp);


const db = getFirestore(firebaseApp);


onAuthStateChanged( auth, user => {
    if (user != null){
        console.log("logged in");
    }
    else {console.log("No user")}


});

export default auth;

