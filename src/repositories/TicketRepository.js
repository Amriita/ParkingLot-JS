class TicketRepository {
  constructor() {
    this.tickets = new Map(); // ticketId → Ticket
  }

  save(ticket) {
    this.tickets.set(ticket.id, ticket);
    return ticket;
  }

  findById(ticketId) {
    return this.tickets.get(ticketId);
  }

  delete(ticketId) {
    this.tickets.delete(ticketId);
  }

  findAllActive() {
    return [...this.tickets.values()].filter(
      t => t.isActive
    );
  }
}

module.exports = TicketRepository;
