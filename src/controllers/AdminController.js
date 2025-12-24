// controllers/AdminController.js
class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  addFloor(floorNumber) {
    return this.adminService.addFloor(floorNumber);
  }

  addSlot(floorNumber, slotType) {
    return this.adminService.addSlot(floorNumber, slotType);
  }

  updatePricing(vehicleType, ruleType, rate) {
    return this.adminService.updatePricing(
      vehicleType,
      ruleType,
      rate
    );
  }
}

module.exports = AdminController;
