class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    let result = 0;

    switch (this.play.type) {
      case "tragedy":
        throw 'not available';
      case "comedy":
        throw 'not available';
      default:
        throw new Error(`unknown type: ${this.play.type}`);
    }

    return result;
  }

  get volumeCredits() {
    let result = Math.max(this.performance.audience - 30, 0);

    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

module.exports = PerformanceCalculator;
