require('dotenv').config(); // Tylko dla środowiska lokalnego
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: [{
        price: 'price_1QhHlFC8xNNfMSBE9CIjk1nn',
        quantity: 1,
      }],
      mode: 'payment',
      return_url: `${event.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: session.id })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: error.message 
      }),
    };
  }
};