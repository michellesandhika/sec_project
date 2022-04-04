const functions = require('firebase-functions');
const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);


// app config
const app = express();

app.use(cors({
    // origin: 'http://127.0.0.1:3000',
    origin: 'https://security-ce24b.web.app',
    methods: ['GET', 'POST'],
    responseHeader: 'Content-Type',
}));

app.use(express.json());

// stripe routes
app.post('/', async (request, response) => {
    response.status(201).send('Successfully Connected');   
});

app.post('/setup', async (request, response) => {
    const setupIntent = await stripe.setupIntents.create({
        payment_method_types: ['card'],
    });

    response.status(201).send({ secret: setupIntent.client_secret });   
});

app.post('/payment', async (request, response) => {
    const total = request.query.total;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: 'hkd',
    });

    response.status(201).send({ secret: paymentIntent.client_secret });   
});

app.post('/cancel', async (request, response) => {
    const secret = request.query.secret;
    const paymentIntent = await stripe.paymentIntents.cancel(secret);
    response.status(201).send({ status: paymentIntent.status });
});


// captcha routes
app.post('/verify', async (request, response) => {
    const token = request.query.token;
    const result = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`);
    response.status(200).send(result.data);
});


// exports
exports.services = functions.https.onRequest(app);
