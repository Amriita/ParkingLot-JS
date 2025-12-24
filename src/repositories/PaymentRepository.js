class PaymentRepository {
  constructor() {
    this.payments = new Map(); // paymentId → Payment
  }

  save(payment) {
    this.payments.set(payment.ticketId, payment);
    return payment;
  }

  findByTicketId(ticketId) {
    return this.payments.get(ticketId);
  }
}

module.exports = PaymentRepository;
