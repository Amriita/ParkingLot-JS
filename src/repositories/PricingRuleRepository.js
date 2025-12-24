class PricingRuleRepository {
  constructor() {
    this.rules = new Map(); // vehicleType → PricingRule
  }

  save(rule) {
    this.rules.set(rule.vehicleType, rule);
    return rule;
  }

  findByVehicleType(vehicleType) {
    console.log({vehicleType})
    return this.rules.get(vehicleType);
  }

  findAll() {
    return [...this.rules.values()];
  }
}

module.exports = PricingRuleRepository;
