const PaymentGatewayAdapter = require('./PaymentGatewayAdapter');

class StripeAdapter extends PaymentGatewayAdapter {
  pay(amount, currency = 'USD', metadata = {}) {
    // simulate stripe call
    return {
      success: true,
      transactionId: `STR-${Date.now()}`
    };
  }
}

module.exports = StripeAdapter;
