const PerformanceCalculator = require("./performance-calculator");

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;

    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }

    return result;
  }
}

module.exports = TragedyCalculator;
