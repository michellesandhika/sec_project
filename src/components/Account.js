import React, { useState } from 'react';

import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import '../styles/Account.css';

function Account() {
    const [ menu, setMenu ] = useState(1);
    const [ orders, setOrders ] = useState([
        { order_number: '12', date: '1 January 2022', total: 123.45 },
        { order_number: '34', date: '1 January 2022', total: 123.45 },
        { order_number: '56', date: '1 January 2022', total: 123.45 },
        { order_number: '78', date: '1 January 2022', total: 123.45 },
        { order_number: '90', date: '1 January 2022', total: 123.45 },
    ]);

    const changePassword = (e) => {
        e.prevenTableCellefault();
        console.log('change password');
    };

    return ( 
        <main className='account__container'>
            <div className='account__sidebar'>
                <h2>Welcome back, [username]</h2>
                <div onClick={() => setMenu(0)} status={menu === 0 ? 'active' : 'inactive'}>
                    <PersonOutlineOutlinedIcon />
                    <p>Account</p>
                </div>
                <div onClick={() => setMenu(1)} status={menu === 1 ? 'active' : 'inactive'}>
                    <Inventory2OutlinedIcon />
                    <p>Orders</p>
                </div>
            </div>

            <div className='account__content'>
                {menu === 0 && <div className='account__profile'>
                    <h3>Change Password</h3>
                    <form onSubmit={(e) => changePassword(e)}>
                        <TextField label='Current Password' type='password' required />
                        <TextField label='New Password' type='password' required />
                        <TextField label='Confirm New Password' type='password' required />

                        <Button type='submit' variant='contained'>Confirm</Button>
                    </form>
                </div>}

                {menu === 1 && <Table className='account__orders' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Number</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map(item => (
                            <TableRow key={item.order_number}>
                                <TableCell>{item.order_number}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>${item.total}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}
            </div>
        </main>
    );
}

export default Account;