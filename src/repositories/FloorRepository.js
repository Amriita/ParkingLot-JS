class FloorRepository {
  constructor() {
    this.floors = new Map(); // floorNumber → Floor
  }

  save(floor) {
    this.floors.set(floor.floorNumber, floor);
    return floor;
  }

  findByNumber(floorNumber) {
    return this.floors.get(floorNumber);
  }

  findAll() {
    return [...this.floors.values()];
  }
}

module.exports = FloorRepository;
