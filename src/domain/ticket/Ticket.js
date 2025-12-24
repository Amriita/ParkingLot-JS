// domain/ticket/Ticket.js
class Ticket {
  constructor(id, vehicleId, vehicleType, slotId) {
    this.id = id;
    this.vehicleId = vehicleId;
    this.vehicleType = vehicleType; // ✅ ADD THIS
    this.slotId = slotId;
    this.entryTime = new Date();
    this.isActive = true;
  }

  closeTicket() {
    this.isActive = false;
  }
}

module.exports = Ticket;
