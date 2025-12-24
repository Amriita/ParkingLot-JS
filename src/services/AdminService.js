// services/AdminService.js
const Floor = require('../domain/parking/Floor');
const ParkingSlot = require('../domain/parking/ParkingSlot');
const PricingRule = require('../domain/billing/PricingRule');

class AdminService {
  constructor(
    floorRepository,
    slotRepository,
    pricingRuleRepository
  ) {
    this.floorRepository = floorRepository;
    this.slotRepository = slotRepository;
    this.pricingRuleRepository = pricingRuleRepository;
  }

  // ✅ addFloor use case
  addFloor(floorNumber) {
    const floor = new Floor(`F-${floorNumber}`, floorNumber);
    return this.floorRepository.save(floor);
  }

  // ✅ addSlot use case
  addSlot(floorNumber, slotType) {
    const floor =
      this.floorRepository.findByNumber(floorNumber);
    if (!floor) throw new Error('Floor not found');

    const slot = new ParkingSlot(
      `S-${Date.now()}`,
      slotType,
      floorNumber
    );

    floor.addSlot(slot);
    this.slotRepository.save(slot);

    return slot;
  }

  // ✅ updatePricing use case
  updatePricing(vehicleType, ruleType, rate) {
    const rule = new PricingRule(
      vehicleType,
      ruleType, // 'HOURLY' or 'FLAT'
      rate      // actual amount
    );

    return this.pricingRuleRepository.save(rule);
  }
}

module.exports = AdminService;
