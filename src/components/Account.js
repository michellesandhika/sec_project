import React, { useState, useEffect } from 'react';

import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MarketPlaceCard from './MarketPlaceCard';
import { useStateContext } from '../services/StateContext';
import { getItems, getTransactions } from '../services/firestore';
import { getAuth, signOut } from 'firebase/auth';

import '../styles/Account.css';

function Account() {
    const dateFormat = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const [ {}, dispatch ] = useStateContext();

    const auth = getAuth();
    const user = auth.currentUser;

    const [ menu, setMenu ] = useState(0);
    const [ items, setItems ] = useState([]);
    const [ transactions, setTransactions ] = useState([]);

    const [ input, setInput ] = useState('');
    const [ dialog, setDialog ] = useState(false);

    useEffect(() => {
        getItems().then(content => setItems(content));                  // TODO: change to this users items
        getTransactions().then(content => setTransactions(content));    // TODO: change to this users transactions
    }, []);

    const deleteAccount = () => {
        if (input !== 'confirm') 
            return;
        
        // TODO: delete account
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
                <h2>Welcome back!</h2>
                <div onClick={() => setMenu(0)} status={menu === 0 ? 'active' : 'inactive'}>
                    <PaletteOutlinedIcon />
                    <p>My Arts</p>
                </div>
                <div onClick={() => setMenu(1)} status={menu === 1 ? 'active' : 'inactive'}>
                    <Inventory2OutlinedIcon />
                    <p>My Transactions</p>
                </div>
                <div onClick={() => setMenu(2)} status={menu === 2 ? 'active' : 'inactive'}>
                    <SettingsOutlinedIcon />
                    <p>Settings</p>
                </div>
                <div>
                    <Button onClick={logout} variant='contained' endIcon={<LogoutOutlinedIcon />}>Logout</Button>
                </div>
            </div>

            <div className='account__content'>
                {menu === 0 && <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid key={item.id} item xs={4}>
                            <MarketPlaceCard title={'hello'} description={'a lot of other things here'} picture={''}></MarketPlaceCard>
                        </Grid>
                    ))}
                </Grid>}

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
                    <h3>Delete Account</h3>
                    <Button onClick={() => setDialog(true)} variant='contained' color='error'>Delete Account</Button>
                </div>}

                <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>Delete Account Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>This action cannot be undone. Enter confirm to confirm you want to delete this account.</DialogContentText>
                        <TextField label='Confirmation' type='text' onChange={(e) => setInput(e.target.value)} style={{ marginTop: '25px' }} fullWidth autoFocus />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setDialog(false)} variant='outlined'>Cancel</Button>
                        <Button onClick={() => deleteAccount()} variant='contained' color='error'>Delete Account</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}

export default Account;