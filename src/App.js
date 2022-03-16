import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Authentication from './components/Authentication';
import Account from './components/Account';
import Checkout from './components/Checkout';
import Header from './components/Header';

import './App.css';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

function App() {
    const [ clientSecret, setClientSecret ] = useState('');   // get client secret
    const appearance = { theme: 'stripe' };
    
    return (
        <div className='app'>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route exact path='/login' element={<Authentication />} />
                    <Route exact path='/account' element={<Account />} />
                    <Route exact path='/checkout' element={<Elements options={{ clientSecret, appearance }} stripe={promise}><Checkout /></Elements>} />
                    <Route path='/' element={<Account />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
