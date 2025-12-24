class Receipt {
  constructor(id, ticketId, totalFee) {
    this.id = id;
    this.ticketId = ticketId;
    this.exitTime = new Date();
    this.totalFee = totalFee;
    this.paymentStatus = 'PENDING';
  }

  markPaid() {
    this.paymentStatus = 'PAID';
  }
}

module.exports = Receipt;
