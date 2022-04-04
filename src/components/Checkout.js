import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StripeForm from './StripeForm';
import GoogleAuthentication from './GoogleAuthentication';

import { useStateContext } from '../services/StateContext';
import { getSubtotal } from '../services/StateReducer';
import '../styles/Checkout.css';

import axios from '../services/axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

function Checkout() {
    const lastStep = 1;
    const [ { cart, user }, dispatch ] = useStateContext();
    
    const [ menu, setMenu ] = useState(0);
    const [ secret, setSecret ] = useState('');
    const [ dialog, setDialog ] = useState(false);

    useEffect(() => {
        const getsecret = async () => {
            if (menu !== 1 || getSubtotal(cart) === 0)
                return;

            const response = await axios({ 
                method: 'POST', 
                url: `/payment?total=${getSubtotal(cart) * 100}`,
            });
            
            setSecret(response.data.secret);
        };
        
        getsecret();
    }, [menu, cart]);

    useEffect(() => {
        if (user) {
            setDialog(false);
            dispatch({
                type: 'FILTER_CART',
                user: user,
            });
        }
    }, [user, dispatch]);

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
                    <GoogleAuthentication size='medium' />
                </DialogActions>
            </Dialog>
        </main>
    );
}

export default Checkout;