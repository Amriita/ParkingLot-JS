class PricingRule {
  constructor(vehicleType, ruleType, rate) {
    this.vehicleType = vehicleType;
    this.ruleType = ruleType;
    this.rate = rate;
  }

  calculateFee(hours) {
    if (this.ruleType === 'FLAT') {
      return this.rate;
    }
    // HOURLY
    return Math.ceil(hours) * this.rate;
  }
}

module.exports = PricingRule;


module.exports = PricingRule;
