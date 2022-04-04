import React from 'react';
import GoogleAuthentication from './GoogleAuthentication';
import '../styles/Authentication.css';

function Authentication() {
    return (
        <main className='authentication__container'>
            <h1>Sign up</h1>
            <GoogleAuthentication size='large' />
        </main>
    );
}

export default Authentication;
