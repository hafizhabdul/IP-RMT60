const axios = require('axios');

const MAYAR_API_URL = 'https://api.mayar.id/hl/v1';
const API_KEY = process.env.MAYAR_API_KEY;

const mayarClient = axios.create({
  baseURL: MAYAR_API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

const createPaymentLink = async (transaction) => {
  try {
    const { invoice_number, total_amount, User, description } = transaction;

    const payload = {
      name: User.username || 'Customer',
      email: User.email,
      amount: total_amount,
      mobile: User.phoneNumber || '0000000000',
      description: description || `Payment for Invoice ${invoice_number}`,
      redirectUrl: `${process.env.CLIENT_URL}/payment/success?order_id=${invoice_number}`,
      // Mayar might use different field names, adjusting based on common practices
      // If specific fields are needed, they should be checked against docs.
      // Assuming standard fields based on research.
    };

    const response = await mayarClient.post('/payment/create', payload);
    
    return {
      link: response.data.data.link, // Adjust based on actual response structure
      id: response.data.data.id,
      transactionId: response.data.data.transactionId
    };
  } catch (error) {
    console.error('Error creating Mayar payment:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  createPaymentLink
};
