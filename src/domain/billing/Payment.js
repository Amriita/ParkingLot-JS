class Payment {
  constructor(ticketId, amount, gateway) {
    this.ticketId = ticketId;
    this.amount = amount;
    this.gateway = gateway;
    this.status = 'PENDING';
  }

  markSuccess() {
    this.status = 'SUCCESS';
  }

  markFailed() {
    this.status = 'FAILED';
  }
}

module.exports = Payment;
