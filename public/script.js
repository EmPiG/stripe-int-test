const stripe = Stripe('pk_test_51PqKAZC8xNNfMSBE99j6RZ643VeQX19RgCJ2bncqhyNYIPJWg9rV0Wi6tLhmHKcqSuZCEj6kk7PjaIS3y2dtZxvK00o61hYuRO');

document.getElementById('checkout-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { sessionId } = await response.json();
    
    const result = await stripe.redirectToCheckout({ sessionId });
    
    if (result.error) {
      alert(result.error.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Wystąpił błąd podczas inicjowania płatności');
  }
});