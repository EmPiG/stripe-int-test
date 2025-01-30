document.getElementById('checkout-button').addEventListener('click', async () => {
  try {
    // Krok 1: Wywołaj funkcję Netlify
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST'
    });
    
    // Krok 2: Pobierz sesję Stripe
    const { id } = await response.json();
    
    // Krok 3: Przekieruj do Stripe
    const stripe = Stripe('pk_test_51PqKAZC8xNNfMSBE99j6RZ643VeQX19RgCJ2bncqhyNYIPJWg9rV0Wi6tLhmHKcqSuZCEj6kk7PjaIS3y2dtZxvK00o61hYuRO'); // Wklej swój klucz publiczny
    await stripe.redirectToCheckout({ sessionId: id });
    
  } catch (error) {
    alert('Błąd: ' + error.message);
  }
});