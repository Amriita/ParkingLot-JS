const Payment = require('../domain/billing/Payment');

class PaymentService {
  constructor(paymentGatewayAdapter, paymentRepository) {
    this.gateway = paymentGatewayAdapter;
    this.paymentRepository = paymentRepository;
  }

  processPayment(ticketId, amount) {
    const response = this.gateway.pay(amount);

    const payment = new Payment(
      ticketId,
      amount,
      this.gateway.constructor.name
    );

    if (response.success) {
      payment.markSuccess();
    } else {
      payment.markFailed();
    }

    this.paymentRepository.save(payment);
    return payment;
  };
}

module.exports = PaymentService;
