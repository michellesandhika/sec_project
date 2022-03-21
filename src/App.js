import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Upload from './components/Upload';
import Account from './components/Account';
import Authentication from './components/Authentication';
import Checkout from './components/Checkout';
import ProductDescriptionPage from './components/ProductDescriptionPage'
import MarketPlacePage from './components/MarketPlacePage';

import { useStateContext } from './services/StateContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import './App.css';

function App() {
    const auth = getAuth();
    const [ { user }, dispatch ] = useStateContext();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) 
                dispatch({
                    type: 'SET_USER',
                    user: user
                });
            else 
                dispatch({
                    type: 'SET_USER',
                    user: null
                });
        });

        // eslint-disable-next-line
    }, []);

    return (
        <div className='app'>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route exact path='/upload' element={<Upload />} />
                    <Route exact path='/account' element={user ? <Account /> : <Authentication />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                    <Route path='/productdescription/:id' element={<ProductDescriptionPage/>} />
                    <Route exact path='/' element={<MarketPlacePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
