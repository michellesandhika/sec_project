import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../services/axios';
import { Button } from '@mui/material';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import '../styles/StripeForm.css';

function StripeForm({ secret }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const [ message, setMessage ] = useState();
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await stripe.confirmPayment({ 
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000',    // TODO: change to domain after hosted
            },
            redirect: 'if_required',
        });

        setMessage(error ? error.message : '');
        setLoading(false);
        navigate('/');
    };

    const handleCancel = async () => {
        const response = await axios({ 
            method: 'POST', 
            url: `/cancel?secret=${secret.split('_secret')[0]}`,
        });

        console.log('payment status: ', response.data.status);
        navigate('/');
    };

    return (
        <form className='stripeform__form' onSubmit={handleSubmit}>
            <PaymentElement />
            <Button type='submit' variant='contained' disabled={loading || !stripe || !elements}>Confirm Purchase</Button>
            <Button onClick={handleCancel}  variant='outlined'>Cancel</Button>
            {message && <h6>{message}</h6>}
        </form>
    );
}

export default StripeForm;