/**
 *  enterVehicle(vehicle)
      ↓
    allocateSlot(vehicleType)
      ↓
    generateTicket(vehicleId, slotId)
      ↓
    save(ticket)
      ↓
    EntryResult
 */



// controllers/EntryController.js
const EntryResult = require('../domain/result/EntryResult');

class EntryController {
  constructor(slotService, ticketService, ticketRepository) {
    this.slotService = slotService;
    this.ticketService = ticketService;
    this.ticketRepository = ticketRepository;
  }

  enterVehicle(vehicle) {
    const slot = this.slotService.allocateSlot(vehicle.vehicleType);

    if (!slot) {
      return new EntryResult(
        false,
        null,
        'No parking slot available'
      );
    }

    const ticket = this.ticketService.generateTicket(
      vehicle,
      slot.id
    );

    this.ticketRepository.save(ticket);

    return new EntryResult(
      true,
      { ticket, slot },
      'Vehicle parked successfully'
    );
  }
}

module.exports = EntryController;
