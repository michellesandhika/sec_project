import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

import { app } from "../services/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useStateContext } from '../services/StateContext';
import { validatePassword } from '../services/utilities';
import "../styles/Authentication.css";

function Authentication() {
    const auth = getAuth(app);
    const { register, handleSubmit, setValue } = useForm();
    
    const [ {}, dispatch ] = useStateContext();
    const [ menu, setMenu ] = useState(0);
    const [ error, setError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onSubmit = (data) => {
        if (menu === 0) 
            login(data);
        else 
            signup(data);
    };

    const login = (data) => {
        if (!data.captcha) {
            setError(true);
            setErrorMessage('Please verify that you\'re not a robot.');
            return;
        }
        
        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            if (!userCredential.user.emailVerified) {
                sendEmailVerification(userCredential.user);
                setErrorMessage('A new verification link has been sent to your email account. Please verify your email before logging in.');

                // TODO: uncomment this line before deployment
                // return;
            }

            redirect(userCredential.user);
        })
        .catch((error) => {
            const { code, message } = error;
            
            setError(true);
            console.log(code, message);

            switch (code) {
                case 'auth/wrong-password':
                    setErrorMessage('Wrong password. Try entering your password again.');
                    break;
                
                case 'auth/user-not-found':
                    setErrorMessage('You account information is not in our database. Please sign up first.');
                    break;
                
                default:
                    setErrorMessage('Something went wrong. Please try again.');
            };
        });
    };

    const signup = (data) => {
        if (!data.captcha) {
            setError(true);
            setErrorMessage('Please verify that you\'re not a robot.');
            return;
        }

        if (data.password !== data.confirmPassword) {
            setError(true);
            setErrorMessage('Your password does not match.');
            return;
        }

        if (!validatePassword(data.password)) {
            setError(true);
            setErrorMessage('Your password must be at least 8 characters and contains an uppercase letter, lowercase letter, and numbers.');
            return;
        }

        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user);
            redirect(userCredential.user);  
        })
        .catch((error) => {
            const { code, message } = error;

            setError(true);
            console.log(code, message);

            switch (code) {
                default:
                    setErrorMessage('Invalid email address/password.');
            };
        });
    };

    const redirect = (user) => {
        dispatch({
            type: 'SET_USER',
            user: user,
        });
        setError(false);
    };

    const handleCaptcha = (value) => {
        setValue('captcha', value);
    };

    return (
        <main className="authentication__container">
            <h1>{menu === 0 ? "Login" : "Sign up"}</h1>

            {error && <Alert severity='error'>{errorMessage}</Alert>}

            <form className="authentication__form" onSubmit={handleSubmit(onSubmit)}>
                <TextField label="Email" type="email" required {...register("email")} />
                <TextField label="Password" type="password" required {...register("password")}/>
                {menu === 1 && (
                    <TextField label="Confirm Password" type="password" required {...register("confirmPassword")} />
                )}
                <div className="authentication__captcha">
                    <ReCAPTCHA sitekey="6LdRy_0eAAAAAL08kTosI_LnAgBf8SDI_XSiWvQz" onChange={handleCaptcha} />
                </div>

                <Button type="submit" variant="contained">{menu === 0 ? "Login" : "Sign up"}</Button>
            </form>

            {menu === 0 && (
                <div className="authentication__question">
                    <h6>Not a member?<span onClick={() => setMenu(1)}>Sign up</span></h6>
                </div>
            )}

            {menu === 1 && (
                <div className="authentication__question">
                    <h6>Already have an account?<span onClick={() => setMenu(0)}>Log in</span></h6>
                </div>
            )}
        </main>
    );
}

export default Authentication;
