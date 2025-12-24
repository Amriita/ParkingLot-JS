class SlotService {
  constructor(slotRepository) {
    this.slotRepository = slotRepository;
  }

  allocateSlot(vehicleType) {
    const slot = this.slotRepository.findAvailableByType(vehicleType);
    if (!slot) return null;

    slot.isOccupied = true;
    return slot;
  }

  releaseSlot(slotId) {
    const slot = this.slotRepository.findById(slotId);
    if (!slot) throw new Error('Slot not found');

    slot.removeVehicle();
    return slot;
  }
}

module.exports = SlotService;
