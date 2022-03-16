import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from '../services/axios';
import { Button } from '@mui/material';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import '../styles/StripeForm.css';

function StripeForm({ total }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [ message, setMessage ] = useState();
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // confirm payment
        const secretResponse = await axios({ 
            method: 'POST', 
            url: `/payment?total=${Math.round(total * 100)}`,
        });

        const secret = secretResponse.data.secret;
        console.log(secret);
        
        const methodResponse = await stripe.confirmPayment({ 
            elements,
            confirmParams: {
                return_url: '/',
            },
        });

        console.log(methodResponse);

        // setMessage(error.type === 'card_error' || error.type === 'validation_error' ? error.message : 'An unexpected error occured.');
        setLoading(false);
    };

    return (
        <div className='stripeform__container'>
            <h2>Payment</h2>

            <form className='stripeform__form' onSubmit={handleSubmit}>
                <PaymentElement />
                <Button type='submit' variant='contained' disabled={loading || !stripe || !elements}>Confirm Purchase</Button>
                {message && <h6>{message}</h6>}
            </form>
        </div>
    );
}

export default StripeForm;