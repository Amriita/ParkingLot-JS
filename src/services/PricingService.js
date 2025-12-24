const PricingRule = require('../domain/billing/PricingRule');

class PricingService {
  constructor(pricingRuleRepository) {
    this.repo = pricingRuleRepository;
  }

  updateHourlyPricing(vehicleType, ratePerHour) {
    const rule = new PricingRule(
      vehicleType,
      'HOURLY',     // ✅ ruleType
      ratePerHour  // ✅ rate
    );
    this.repo.save(rule);
  }

  updateFlatPricing(vehicleType, flatRate) {
    const rule = new PricingRule(
      vehicleType,
      'FLAT',      // ✅ ruleType
      flatRate     // ✅ rate
    );
    this.repo.save(rule);
  }

  calculate(vehicleType, hours) {
    const rule = this.repo.findByVehicleType(vehicleType);
    console.log("rule", rule)
    if (!rule) {
      throw new Error(`Pricing rule missing for ${vehicleType}`);
    }
    return rule.calculateFee(hours);
  }
}

module.exports = PricingService;
