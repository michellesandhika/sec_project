import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MarketPlacePage from './components/MarketPlacePage';
import Authentication from './components/Authentication';
import Account from './components/Account';
import Checkout from './components/Checkout';
import Upload from './components/Upload';
import Header from './components/Header';

import './App.css';

function App() {
    return (
        <div className='app'>
            <BrowserRouter>
                <Header />

                <Routes>
                    <Route exact path='/upload' element={<Upload />} />
                    <Route exact path='/login' element={<Authentication />} />
                    <Route exact path='/account' element={<Account />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                    <Route path='/' element={<MarketPlacePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
