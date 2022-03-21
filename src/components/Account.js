import React, { useState, useEffect } from 'react';

import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MarketPlaceCard from './MarketPlaceCard';
import { useStateContext } from '../services/StateContext';
import { getItems, getTransactions } from '../services/firestore';
import { getAuth, signOut } from "firebase/auth";

import '../styles/Account.css';

function Account() {
    const dateFormat = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const auth = getAuth();
    const [ {}, dispatch ] = useStateContext();

    const [ menu, setMenu ] = useState(0);
    const [ items, setItems ] = useState([]);
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        getItems().then(content => setItems(content));                  // TODO: change to this users items
        getTransactions().then(content => setTransactions(content));    // TODO: change to this users transactions
    }, []);
    
    const changePassword = (e) => {
        e.prevenTableCellefault();
        console.log('change password');
    };

    const logout = () => {
        signOut(auth)
        .then(() => {
            dispatch({
                type: 'SET_USER',
                user: null,
            });
        })
        .catch((error) => {
            const { code, message } = error;
            console.log(code, message);
        });
    };
    
    return ( 
        <main className='account__container'>
            <div className='account__sidebar'>
                <h2>Welcome back, [username]</h2>
                <div onClick={() => setMenu(0)} status={menu === 0 ? 'active' : 'inactive'}>
                    <PaletteOutlinedIcon />
                    <p>My Arts</p>
                </div>
                <div onClick={() => setMenu(1)} status={menu === 1 ? 'active' : 'inactive'}>
                    <Inventory2OutlinedIcon />
                    <p>My Transactions</p>
                </div>
                <div onClick={() => setMenu(2)} status={menu === 2 ? 'active' : 'inactive'}>
                    <PersonOutlineOutlinedIcon />
                    <p>Change Password</p>
                </div>
                <div>
                    <Button onClick={logout} variant='contained' endIcon={<LogoutOutlinedIcon />}>Logout</Button>
                </div>
            </div>

            <div className='account__content'>
                {menu === 0 && <div>
                    {items.map(item => (
                        <MarketPlaceCard key={item.id} title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                    ))}
                </div>}

                {menu === 1 && <Table className='account__transactions' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.Time.toDate().toLocaleDateString('en-US', dateFormat)}</TableCell>
                                <TableCell>{item.Seller}</TableCell>
                                <TableCell>${item.Paid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}

                {menu === 2 && <div className='account__profile'>
                    <h3>Change Password</h3>
                    <form onSubmit={(e) => changePassword(e)}>
                        <TextField label='Current Password' type='password' required />
                        <TextField label='New Password' type='password' required />
                        <TextField label='Confirm New Password' type='password' required />

                        <Button type='submit' variant='contained'>Confirm</Button>
                    </form>
                </div>}
            </div>
        </main>
    );
}

export default Account;