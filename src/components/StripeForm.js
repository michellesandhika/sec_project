import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button, Alert } from '@mui/material';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

import axios from '../services/axios';
import { verifyCaptcha } from '../services/utilities';
import { changingOwnership } from '../services/firestore';
import { useStateContext } from '../services/StateContext';
import '../styles/StripeForm.css';

function StripeForm({ secret }) {
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const [ { cart, user }, dispatch ] = useStateContext();
    
    const [ captcha, setCaptcha ] = useState();
    const [ message, setMessage ] = useState();
    const [ loading, setLoading ] = useState(false);

    const handleSubmit = async (e) => {
        if (!captcha) {
            setMessage("Please verify that you're not a robot.");
            return;
        }

        e.preventDefault();
        setLoading(true);

        const { error } = await stripe.confirmPayment({ 
            elements,
            confirmParams: {
                return_url: 'http://120.0.0.1:3000',
                // return_url: 'https://security-ce24b.web.app',
            },
            redirect: 'if_required',
        });

        if (!error) {
            for (const item of cart) {
                changingOwnership(item.Owner, user.email, item.Id);
            }

            dispatch({
                type: 'EMPTY_CART',
            });

            setLoading(false);
            navigate('/account');
        }

        setMessage(error ? error.message : null);
    };

    const handleCancel = async () => {
        const response = await axios({ 
            method: 'POST', 
            url: `/cancel?secret=${secret.split('_secret')[0]}`,
        });

        navigate('/');
    };

    const handleCaptcha = async (value) => {
        const response = await verifyCaptcha(value);
        if (response.success)
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