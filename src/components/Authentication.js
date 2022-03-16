import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

import '../styles/Authentication.css';

function Authentication() {
    const [ menu, setMenu ] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (menu === 0)
            login();
        else
            signup();
    };

    const login = () => {
        console.log('login');
    };

    const signup = () => {
        console.log('signup');
    };

    return (
        <main className='authentication__container'>
            <h1>{menu === 0 ? 'Login' : 'Sign up'}</h1>

            <form className='authentication__form' onSubmit={handleSubmit}>
                <TextField label='Username' type='text' required />
                <TextField label='Password' type='password' required />
                {menu === 1 && <TextField label='Confirm Password' type='password' required />}
                <Button type='submit' variant='contained' disableRipple>{menu === 0 ? 'Login' : 'Sign up'}</Button>
            </form>

            {menu === 0 && <div className='authentication__question'>
                <h6>Not a member?<span onClick={() => setMenu(1)}>Sign up</span></h6>
            </div>}

            {menu === 1 && <div className='authentication__question'>
                <h6>Already have an account?<span onClick={() => setMenu(0)}>Log in</span></h6>
            </div>}
        </main>
    );
}

export default Authentication;