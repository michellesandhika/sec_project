import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut, deleteUser } from 'firebase/auth';

import { Button, Table, TableHead, TableBody, TableRow, TableCell, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MarketPlaceCard from './MarketPlaceCard';
import GoogleAuthentication from './GoogleAuthentication';

import { useStateContext } from '../services/StateContext';
import { getItemsFromUser, getTransactionsFromUser, deleteAccount } from '../services/firestore';
import '../styles/Account.css';

function Account() {
    const dateFormat = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const [ { user }, dispatch ] = useStateContext();

    const auth = getAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const [ menu, setMenu ] = useState(0);
    const [ items, setItems ] = useState([]);
    const [ transactions, setTransactions ] = useState([]);
    
    const [ credential, setCredential ] = useState();
    const [ dialog, setDialog ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        getItemsFromUser(user.email).then(content => setItems(content));
        getTransactionsFromUser(user.email).then(content => setTransactions(content));
    }, [location.pathname, user]);

    const handleDelete = async () => {
        if (!credential)
            return;
        
        setLoading(true);
        console.log(credential);

        deleteUser(user).then(async () => {
            await deleteAccount(user.email);

            dispatch({
                type: 'SET_USER',
                user: null
            });

            setLoading(false);
        }).catch((error) => {
            const { code, message } = error;
            console.log(code, message);
            setLoading(false);
        });
    };
    
    const logout = () => {
        signOut(auth).then(() => {
            dispatch({
                type: 'SET_USER',
                user: null,
            });
        }).catch((error) => {
            const { code, message } = error;
            console.log(code, message);
        });
    };

    const navigatetoID = (id) => {
        navigate(`/product/${id}`);
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
                
                {/* arts tab */}
                {menu === 0 && <Grid container spacing={2}>
                    {items.map(item => (
                        <Grid key={item.Id} item xs={4} onClick={() => navigatetoID(item.Id)}>
                            <MarketPlaceCard title={item.Title} description={item.Description} fileName={item.FileName} ipfsLink={item.Id} price={item.Price} />
                        </Grid>
                    ))}
                </Grid>}

                {/* transactions tab */}
                {menu === 1 && <Table className='account__transactions' stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: '200px' }}>ID</TableCell>
                            <TableCell style={{ width: '120px' }}>Item</TableCell>
                            <TableCell style={{ width: '180px' }}>Date</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>From</TableCell>
                            <TableCell>To</TableCell>
                            <TableCell>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map(item => (
                            <TableRow key={item.Id}>
                                <TableCell>{item.Id}</TableCell>
                                <TableCell>{item.Item.Title}</TableCell>
                                <TableCell>{item.Time.toDate().toLocaleDateString('en-US', dateFormat)}</TableCell>
                                <TableCell>{item.Type}</TableCell>
                                <TableCell>{item.Type === 'Bought' ? item.Seller : '-'}</TableCell>
                                <TableCell>{item.Type === 'Sold' ? item.Buyer : '-'}</TableCell>
                                <TableCell>${item.Paid}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>}

                {/* settings tab */}
                {menu === 2 && <div className='account__profile'>
                    <h3>Delete Account</h3>
                    <Button onClick={() => setDialog(true)} variant='contained' color='error'>Delete Account</Button>
                </div>}

                {/* delete account dialog */}
                <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>Delete Account Confirmation</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>This action cannot be undone. Please sign in again confirm you want to delete this account.</DialogContentText>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                            <GoogleAuthentication size='medium' mode='reauth' setCredential={setCredential} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button disabled={loading} onClick={() => setDialog(false)} variant='outlined'>Cancel</Button>
                        <LoadingButton loading={loading} disabled={!credential} onClick={() => handleDelete()} variant='contained' color='error'>Delete Account</LoadingButton>
                    </DialogActions>
                </Dialog>
            </div>
        </main>
    );
}

export default Account;