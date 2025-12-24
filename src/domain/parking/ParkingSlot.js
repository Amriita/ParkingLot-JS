class ParkingSlot {
  constructor(id, slotType, floorNumber) {
    this.id = id;
    this.slotType = slotType;
    this.floorNumber = floorNumber;
    this.isOccupied = false;
    this.currentVehicle = null;
  }

  parkVehicle(vehicle) {
    if (this.isOccupied) {
      throw new Error('Slot already occupied');
    }
    this.currentVehicle = vehicle;
    this.isOccupied = true;
  }

  removeVehicle() {
    this.currentVehicle = null;
    this.isOccupied = false;
  }
}

module.exports = ParkingSlot;
