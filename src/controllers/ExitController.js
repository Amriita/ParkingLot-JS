/**
   * exitVehicle()
    → Get Ticket
    → Calculate Fee
    → Process Payment (with retries)
    → Release Slot
    → Generate Receipt
    → Return ExitResult
 */

const ExitResult = require("../domain/results/ExitResult");

class ExitController {
  constructor(ticketRepository, slotRepository, pricingService, paymentService, receiptService
  ) {
    this.ticketRepository = ticketRepository;
    this.slotRepository = slotRepository;
    this.pricingService = pricingService;
    this.paymentService = paymentService;
    this.receiptService = receiptService;
  }

   exitVehicle(ticketId) {
    // 1. Get Ticket
    const ticket = this.ticketRepository.findById(ticketId);
    console.log({ticket})
    if (!ticket || !ticket.isActive) {
      return new ExitResult(false, null, 'Invalid ticket');
    }

    // 2. Calculate Duration
    const hours =
      (Date.now() - ticket.entryTime.getTime()) /
      (1000 * 60 * 60);

    console.log({hours})

    // 3. Calculate Fee
    const fee = this.pricingService.calculate(
      ticket.vehicleType,
      hours
    );

    console.log({fee})

    // 4. Process Payment with retry
    const payment = this._processPaymentWithRetry(
      ticket.id,
      fee
    );

    console.log({payment})

    if (payment.status !== 'SUCCESS') {
      return new ExitResult(false, null, 'Payment failed');
    }

    // 5. Release Slot
    const slot = this.slotRepository.findById(ticket.slotId);
    console.log({slot})
    slot.removeVehicle();

    // 6. Close Ticket
    ticket.closeTicket();
    this.ticketRepository.delete(ticket.id);

    // 7. Generate Receipt
    const receipt = this.receiptService.generateReceipt(
      ticket.id,
      fee
    );

    return new ExitResult(
      true,
      { receipt, payment },
      'Exit successful'
    );
  }

  _processPaymentWithRetry(ticketId, amount, retries = 3) {
    let payment;
    while (retries-- > 0) {
      payment = this.paymentService.processPayment(
        ticketId,
        amount
      );
      if (payment.status === 'SUCCESS') break;
    }
    return payment;
  }
}

module.exports = ExitController;
