const Ticket = require('../domain/ticket/Ticket');

class TicketService {
  constructor() {
    this.activeTickets = new Map(); // ticketId → Ticket
  }

  createTicket(vehicleId, slotId) {
    const ticket = new Ticket(
      `T-${Date.now()}`,
      vehicleId,
      slotId
    );
    this.activeTickets.set(ticket.id, ticket);
    return ticket;
  }

  getTicket(ticketId) {
    return this.activeTickets.get(ticketId);
  }

  closeTicket(ticketId) {
    const ticket = this.activeTickets.get(ticketId);
    if (!ticket) throw new Error('Invalid ticket');
    ticket.closeTicket();
    this.activeTickets.delete(ticketId);
    return ticket;
  }

  generateTicket(vehicle, slotId) {
    return new Ticket(
      `T-${Date.now()}`,
      vehicle.id,
      vehicle.vehicleType, // ✅ PASS VEHICLE TYPE
      slotId
    );
  }
}

module.exports = TicketService;