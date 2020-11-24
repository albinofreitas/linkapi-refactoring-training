const createPerformanceCalculator = require("./calculator");

module.exports = function createStatementData(invoice, plays) {
  const statemantData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  statemantData.totalAmount = totalAmount(statemantData);
  statemantData.totalVolumeCredits = totalVolumeCredits(statemantData);

  return statemantData;

  function enrichPerformance(performance) {
    const calculator = createPerformanceCalculator(performance, playFor(performance));

    const result = {
      ...performance,
      play: calculator.play
    };

    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;

    return result;
  }

  function playFor(performance) {
    return plays[performance.playID];
  }
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
