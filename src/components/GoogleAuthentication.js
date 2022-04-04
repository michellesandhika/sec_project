import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { checkDuplicateUsers, addUserToDatabase } from '../services/firestore';
import { useStateContext } from '../services/StateContext';

function GoogleAuthentication({ mode, setCredential }) {
    const auth = getAuth();
    const [ {}, dispatch ] = useStateContext();

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            if (mode === 'reauth')
                setCredential(credential);

            const user = auth.currentUser;
            const userExist = await checkDuplicateUsers(user.email);

            if (!userExist)
                await addUserToDatabase(user.email);

            dispatch({
                type: 'SET_USER',
                user: user,
            });
        } 
        catch (error) {
            const { code, message } = error;
            console.log(code, message);
        };
    };

    return (
        <Button onClick={() => googleLogin()} startIcon={<GoogleIcon />} variant='outlined' size='large'>Sign up with Google</Button>
    );
}

export default GoogleAuthentication;