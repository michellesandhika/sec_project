import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { TextField, Button, Table, TableHead, TableBody, TableRow, TableCell, Alert, Grid } from '@mui/material';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MarketPlaceCard from './MarketPlaceCard';
import { useStateContext } from '../services/StateContext';
import { getItems, getTransactions } from '../services/firestore';
import { validatePassword } from '../services/utilities';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, signOut, sendEmailVerification } from 'firebase/auth';

import '../styles/Account.css';

function Account() {
    const dateFormat = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    const [ {}, dispatch ] = useStateContext();

    const auth = getAuth();
    const user = auth.currentUser;
    const { register, handleSubmit, reset } = useForm();

    const [ verifySuccess, setVerifySuccess ] = useState(false);
    const [ verifyError, setVerifyError ] = useState('');

    const [ passwordSuccess, setPasswordSuccess ] = useState(false);
    const [ passwordError, setPasswordError ] = useState('');

    const [ menu, setMenu ] = useState(0);
    const [ items, setItems ] = useState([]);
    const [ transactions, setTransactions ] = useState([]);

    useEffect(() => {
        getItems().then(content => setItems(content));                  // TODO: change to this users items
        getTransactions().then(content => setTransactions(content));    // TODO: change to this users transactions
    }, []);

    useEffect(() => {
        setVerifySuccess(false);
        setPasswordSuccess(false);
        setPasswordError('');
        reset();
    }, [menu, reset]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVerifySuccess(false);
            setVerifyError('');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [verifySuccess, verifyError]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPasswordSuccess(false);
            setPasswordError('');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [passwordSuccess, passwordError]);
    
    const changePassword = async (data) => {
        if (data.new !== data.confirm) {
            setPasswordError('Your password does not match.');
            return;
        }

        if (!validatePassword(data.new)) {
            setPasswordError('Your password must be at least 8 characters and contains an uppercase letter, lowercase letter, and numbers.');
            return;
        }

        const credentials = EmailAuthProvider.credential(user.email, data.current);

        reauthenticateWithCredential(user, credentials)
        .then(() => {
            updatePassword(user, data.new)
            .then(() => {
                setPasswordSuccess(true);
                setPasswordError('');
                reset();
            })
            .catch((error) => {
                const { code, message } = error;
                console.log(code, message);
    
                setPasswordSuccess(false);
                setPasswordError('Something went wrong. Please try again.');
            });
        })
        .catch(() => {
            setPasswordSuccess(false);
            setPasswordError('Failed to change password. Your current password might be incorrect.');
        });
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

    const sendVerification = () => {
        sendEmailVerification(user)
        .then(() => {
            setVerifySuccess(true);
        })
        .catch((error) => {
            const { code, message } = error;
            
            setVerifyError(true);
            console.log(code, message);

            switch (code) {
                case 'auth/too-many-requests':
                    setVerifyError('You\'ve requested for too many verification link. Please try again later.');
                    break;
                
                default:
                    setVerifyError('Something went wrong. Please try again.');
            };
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
                    <h3>Account Verification</h3>
                    <div>
                        {user.emailVerified && <Alert severity='success'>Verification Status: Verified</Alert>}                        
                        {!user.emailVerified && <Alert severity='warning'>Verification Status: Not Verified</Alert>}                        
                        
                        {verifySuccess && <Alert severity='success'>A new verification link has been sent to your email account.</Alert>}                        
                        {verifyError !== '' && <Alert severity='error'>{verifyError}</Alert>}                        

                        {!user.emailVerified && <Button type='submit' variant='contained' onClick={sendVerification}>Verify Account</Button>}
                    </div>

                    <h3>Change Password</h3>
                    <form onSubmit={handleSubmit(changePassword)}>
                        <TextField label='Current Password' type='password' required {...register('current')} />
                        <TextField label='New Password' type='password' required {...register('new')} />
                        <TextField label='Confirm New Password' type='password' required {...register('confirm')} />

                        {passwordSuccess && <Alert severity='success'>Changed Password Successfully!</Alert>}
                        {passwordError !== '' && <Alert severity='error'>{passwordError}</Alert>}

                        <Button type='submit' variant='contained'>Confirm</Button>
                    </form>
                </div>}
            </div>
        </main>
    );
}

export default Account;