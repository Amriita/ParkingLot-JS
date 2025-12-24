class SlotRepository {
  constructor() {
    this.slots = new Map(); // slotId → ParkingSlot
  }

  save(slot) {
    this.slots.set(slot.id, slot);
    return slot;
  }

  findById(slotId) {
    return this.slots.get(slotId);
  }

  findAvailableByType(slotType) {
    return [...this.slots.values()].find(
      s => !s.isOccupied && s.slotType === slotType
    );
  }
}

module.exports = SlotRepository;
