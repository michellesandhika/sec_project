import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import axios from '../services/axios';
import { Button, Alert } from '@mui/material';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import '../styles/StripeForm.css';

function StripeForm({ secret }) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    
    const [ captcha, setCaptcha ] = useState();
    const [ message, setMessage ] = useState();
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        // TODO: uncommit before hosting
        // if (!captcha) {
        //     setMessage("Please verify that you're not a robot.");
        //     return;
        // }

        e.preventDefault();
        setLoading(true);

        const { error } = await stripe.confirmPayment({ 
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000',    // TODO: change to domain after hosted
            },
            redirect: 'if_required',
        });

        setMessage(error ? error.message : null);
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

    const handleCaptcha = (value) => {
        setCaptcha(value);
      };

    return (
        <form className='stripeform__form' onSubmit={handleSubmit}>
            <PaymentElement />
            {message && <Alert severity='error'>{message}</Alert>}

            <div className='stripeform__button'>
                <ReCAPTCHA sitekey='6LdRy_0eAAAAAL08kTosI_LnAgBf8SDI_XSiWvQz' onChange={handleCaptcha} />
                <div>
                    <Button type='button' onClick={handleCancel} variant='outlined' disabled={loading || !stripe || !elements}>Cancel</Button>
                    <Button type='submit' variant='contained' disabled={loading || !stripe || !elements}>Confirm Purchase</Button>
                </div>
            </div>
        </form>
    );
}

export default StripeForm;