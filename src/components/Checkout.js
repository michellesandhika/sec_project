import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Button } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StripeForm from './StripeForm';
import '../styles/Checkout.css';

import axios from '../services/axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const promise = loadStripe(process.env.REACT_APP_PUBLIC_KEY);

function Checkout() {
    const lastStep = 1;
    const cart = [
        { id: '12', name: 'item name', price: 123.45 },
        { id: '34', name: 'item name', price: 123.45 },
        { id: '56', name: 'item name', price: 123.45 },
        { id: '78', name: 'item name', price: 123.45 },
        { id: '90', name: 'item name', price: 123.45 },
    ];
    
    const [ menu, setMenu ] = useState(0);
    const [ secret, setSecret ] = useState('');

    useEffect(() => {
        const getsecret = async () => {
            if (menu !== 1)
                return;

            const response = await axios({ 
                method: 'POST', 
                url: '/payment?total=500',  // TODO: change to get total from cart
            });
            
            setSecret(response.data.secret);
            console.log('secret: ', response.data.secret);
        };
        
        getsecret();
    }, [menu]);

    const appearance = {
        theme: 'stripe',
    };

    const options = {
        clientSecret: secret,
        appearance,
    };

    // TODO: remove item in redux
    const removeItem = (item) => {
        console.log('remove:', item);   
    };

    return (
        <main className='checkout__container'>
            {menu === 0 && <div className='checkout__review'>
                <h2>Review Orders</h2>
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
                                <TableCell>{item.name}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell style={{ width: '50px' }}>
                                    <IconButton onClick={() => removeItem(item)}><DeleteOutlinedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>}

            {menu === 1 && <div className='stripeform__container'>
                {secret && <Elements options={options} stripe={promise}>
                    <h2>Payment</h2>
                    <StripeForm secret={secret} />
                </Elements>}
            </div>}

            {menu < lastStep && <Button onClick={() => setMenu(menu + 1)} variant='contained'>Next</Button>}
        </main>
    );
}

export default Checkout;