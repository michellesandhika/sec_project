import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import Authentication from "./components/Authentication";
import Account from "./components/Account";
import Checkout from "./components/Checkout";
import Header from "./components/Header";

import "./App.css";

import axios from './services/axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


function App() {
    const [ secret, setSecret ] = useState('');

    useEffect(() => {
        const getsecret = async () => {
            await axios({ 
                method: 'POST', 
                url: '/setup',
            }).then(response => {
                setSecret(response.data.secret);
            });
        };

        getsecret();
    }, []);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret: secret,
        appearance,
    };
    
    return (
        <div className='app'>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route exact path='/login' element={<Authentication />} />
                    <Route exact path='/account' element={<Account />} />
                    <Route exact path='/checkout' element={secret && <Elements options={options} stripe={promise}><Checkout /></Elements>} />
                    <Route path='/' element={<Account />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
