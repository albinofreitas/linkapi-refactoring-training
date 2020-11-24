class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    throw new Error('responsabilidade é da subclasse');
  }

  get volumeCredits() {
    let result = Math.max(this.performance.audience - 30, 0);

    if ("comedy" === this.play.type) result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

module.exports = PerformanceCalculator;
