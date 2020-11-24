const PerformanceCalculator = require("./calculator/performance-calculator");

module.exports = function createStatementData(invoice, plays) {
  const statemantData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  statemantData.totalAmount = totalAmount(statemantData);
  statemantData.totalVolumeCredits = totalVolumeCredits(statemantData);

  return statemantData;

  function enrichPerformance(performance) {
    const calculator = new PerformanceCalculator(performance, playFor(performance));

    const result = {
      ...performance,
      play: calculator.play
    };

    result.amount = calculator.amount;
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  function volumeCreditsFor(performance) {
    let result = Math.max(performance.audience - 30, 0);

    if ("comedy" === performance.play.type) result += Math.floor(performance.audience / 5);

    return result;
  }

  function totalVolumeCredits(data) {
    let result = 0;

    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }

    return result;
  }

  function totalAmount(data) {
    let result = 0;

    for (let perf of data.performances) {
      result += perf.amount;
    }

    return result;
  }

  function playFor(performance) {
    return plays[performance.playID];
  }
}
