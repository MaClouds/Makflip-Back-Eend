const express = require('express');
const stripeRouter = express.Router();
const stripe = require('stripe')('sk_test_51Nv0TYLcpVDSklU4dydjyJfHJ9KamShhjRJlS3osm696jv1QsHn5HMts03pFxFbwwokNcGRZQRNmFUac1MLeJgnW00Q0oGYb5B');

// POST route to create a Stripe payment intent
stripeRouter.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, payment_method } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency,
      payment_method_types: payment_method ? [payment_method] : ['card'], // Default to 'card'
    });

    res.send({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = stripeRouter;
