import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import StripeForm from './StripeForm';

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useStateContext } from '../services/StateContext';
import { getSubtotal } from '../services/StateReducer';
import '../styles/Checkout.css';

import axios from '../services/axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

function Checkout() {
    const lastStep = 1;
    const auth = getAuth();
    const [ { cart, user }, dispatch ] = useStateContext();
    
    const [ menu, setMenu ] = useState(0);
    const [ secret, setSecret ] = useState('');
    const [ dialog, setDialog ] = useState(false);

    useEffect(() => {
        const getsecret = async () => {
            if (menu !== 1)
                return;

            const response = await axios({ 
                method: 'POST', 
                url: `/stripe/payment?total=${getSubtotal(cart) * 100}`,
            });
            
            setSecret(response.data.secret);
        };
        
        getsecret();
    }, [menu, cart]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret: secret,
        appearance,
    };

    const removeItem = (item) => {
        dispatch({
            type: 'REMOVE_CART',
            item: item,
        });
    };

    const nextStep = (step) => {
        if (!user) {
            setDialog(true);
            return
        }

        setMenu(step);
    };

    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;   
    
            dispatch({
                type: 'SET_USER',
                user: auth.currentUser,
            });

            setDialog(false);
        } 
        catch (error) {
            const { code, message } = error;
            console.log(code, message);
        };
      };

    return (
        <main className='checkout__container'>
            {menu === 0 && <div className='checkout__review'>
                <div>
                    <h2>Review Orders</h2>
                </div>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Owner</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell style={{ width: '50px' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map(item => (
                            <TableRow key={item.Id}>
                                <TableCell>{item.Owner}</TableCell>
                                <TableCell>{item.Title}</TableCell>
                                <TableCell>${item.Price}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => removeItem(item)}><DeleteOutlinedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div>
                    <h3>Total: <span>${getSubtotal(cart)}</span></h3>
                </div>
            </div>}

            {menu === 1 && <div className='stripeform__container'>
                {secret && <Elements options={options} stripe={promise}>
                    <h2>Payment</h2>
                    <StripeForm secret={secret} />
                </Elements>}
            </div>}

            {menu < lastStep && cart.length > 0 && <Button onClick={() => nextStep(menu + 1)} variant='contained'>Next</Button>}

            <Dialog fullWidth={true} maxWidth='xs' open={dialog} onClose={() => setDialog(false)}>
                <DialogTitle id='alert-dialog-title'>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>Please sign up first before checking out.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)} variant='outlined'>Close</Button>
                    <Button onClick={() => googleLogin()} startIcon={<GoogleIcon />} variant='contained'>Sign up with Google</Button>
                </DialogActions>
            </Dialog>
        </main>
    );
}

export default Checkout;