import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StripeForm from './StripeForm';
import '../styles/Checkout.css';

import { useStateContext } from '../services/StateContext';
import { getSubtotal } from '../services/StateReducer';

import axios from '../services/axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

function Checkout() {
    const lastStep = 1;
    const [ { cart }, dispatch ] = useStateContext();
    
    const [ menu, setMenu ] = useState(0);
    const [ secret, setSecret ] = useState('');

    useEffect(() => {
        const getsecret = async () => {
            if (menu !== 1)
                return;

            const response = await axios({ 
                method: 'POST', 
                url: `/payment?total=${getSubtotal(cart) * 100}`,
            });
            
            setSecret(response.data.secret);
            console.log('secret: ', response.data.secret);
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
        console.log('remove:', item);   

        dispatch({
            type: 'REMOVE_CART',
            item: item,
        });
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
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.Name}</TableCell>
                                <TableCell>${item.Price}</TableCell>
                                <TableCell style={{ width: '50px' }}>
                                    <IconButton onClick={() => removeItem(item)}><DeleteOutlinedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div>
                    <h4>Total: <span>${getSubtotal(cart)}</span></h4>
                </div>
            </div>}

            {menu === 1 && <div className='stripeform__container'>
                {secret && <Elements options={options} stripe={promise}>
                    <h2>Payment</h2>
                    <StripeForm secret={secret} />
                </Elements>}
            </div>}

            {menu < lastStep && cart.length > 0 && <Button onClick={() => setMenu(menu + 1)} variant='contained'>Next</Button>}
        </main>
    );
}

export default Checkout;