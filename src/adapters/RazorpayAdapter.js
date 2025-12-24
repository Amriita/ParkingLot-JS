const PaymentGatewayAdapter = require('./PaymentGatewayAdapter');

class RazorpayAdapter extends PaymentGatewayAdapter {
  pay(amount, currency = 'INR', metadata = {}) {
    // simulate razorpay call
    return {
      success: true,
      transactionId: `RAZ-${Date.now()}`
    };
  }
}

module.exports = RazorpayAdapter;
