import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateContext } from '../services/StateContext';
import '../styles/Authentication.css';

function Authentication() {
  const auth = getAuth();
  const [ {}, dispatch ] = useStateContext();

  const GoogleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;   

        dispatch({
            type: 'SET_USER',
            user: auth.currentUser,
        });
    } 
    catch (error) {
        console.log(error.code, error.message);
    };
  };

  return (
    <main className='authentication__container'>
        <h1>Sign up</h1>
        <Button onClick={() => GoogleLogin()} startIcon={<GoogleIcon />} variant='outlined' size='large'>Sign up with Google</Button>
    </main>
  );
}

export default Authentication;
