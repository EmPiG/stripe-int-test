require('dotenv').config(); // Tylko dla środowiska lokalnego
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    // Stwórz sesję płatności
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'pln',
          product_data: { name: 'Moja usługa' },
          unit_amount: 2500, 
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${event.headers.host}/success.html`,
      cancel_url: `${event.headers.host}/cancel.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};