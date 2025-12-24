const Receipt = require('../domain/billing/Receipt');

class ReceiptService {
  generateReceipt(ticketId, totalFee) {
    const receipt = new Receipt(
      `R-${Date.now()}`,
      ticketId,
      totalFee
    );
    receipt.markPaid();
    return receipt;
  }
}

module.exports = ReceiptService;
