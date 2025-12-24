class Floor {
  constructor(id, floorNumber) {
    this.id = id;
    this.floorNumber = floorNumber;
    this.slots = [];
  }

  addSlot(slot) {
    this.slots.push(slot);
  }

  getAvailableSlot(slotType) {
    return this.slots.find(
      slot => !slot.isOccupied && slot.slotType === slotType
    );
  }
}

module.exports = Floor;
