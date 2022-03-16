import React from 'react';

import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import StripeForm from './StripeForm';

import '../styles/Checkout.css';

function Checkout() {
    const cart = [
        { id: '12', name: 'item name', price: 123.45 },
        { id: '34', name: 'item name', price: 123.45 },
        { id: '56', name: 'item name', price: 123.45 },
        { id: '78', name: 'item name', price: 123.45 },
        { id: '90', name: 'item name', price: 123.45 },
    ];

    const removeItem = (item) => {
        console.log('remove:', item)
    };  

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
                                    <IconButton onClick={() => removeItem(item)}><DeleteOutlinedIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <StripeForm total={5} />
        </main>
    );
}

export default Checkout;