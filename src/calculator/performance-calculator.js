class PerformanceCalculator {
  constructor(performance, play) {
    this.performance = performance;
    this.play = play;
  }

  get amount() {
    throw new Error('responsabilidade é da subclasse');
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

module.exports = PerformanceCalculator;
