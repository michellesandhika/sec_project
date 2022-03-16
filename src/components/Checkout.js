import React, { useState, useEffect } from 'react';

import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// import StripeTextField from './StripeTextField';

import '../styles/Checkout.css';

function Checkout() {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [ cart, setCart ] = useState([
        { id: '12', name: 'item name', price: 123.45 },
        { id: '34', name: 'item name', price: 123.45 },
        { id: '56', name: 'item name', price: 123.45 },
        { id: '78', name: 'item name', price: 123.45 },
        { id: '90', name: 'item name', price: 123.45 },
    ]);

    return (
        <main className='checkout__container'>
            <div className='checkout__review'>
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
                                    <IconButton><DeleteOutlinedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='checkout__payment'>
                <h2>Payment</h2>
                <form>
                    <PaymentElement />
                    <Button type='submit' variant='contained'>Confirm Purchase</Button>
                </form>

                {/* <div>
                    <TextField 
                        label='Card Number' 
                        InputLabelProps={{ shrink: true }} 
                        InputProps={{ 
                            inputComponent: StripeTextField, 
                            inputProps: { component: CardNumberElement } 
                        }} 
                        required 
                    />
                    <TextField 
                        label='EXP' 
                        InputLabelProps={{ shrink: true }} 
                        InputProps={{ 
                            inputComponent: StripeTextField, 
                            inputProps: { component: CardExpiryElement } 
                        }} 
                        required 
                    />
                    <TextField 
                        label='CVC' 
                        InputLabelProps={{ shrink: true }} 
                        InputProps={{ 
                            inputComponent: StripeTextField, 
                            inputProps: { component: CardCvcElement } 
                        }} 
                        required 
                    />
                </div> */}
            </div>
        </main>
    );
}

export default Checkout;