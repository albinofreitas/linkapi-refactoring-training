function statement(invoice, plays) {
  const statemantData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
  };

  statemantData.totalAmount = totalAmount(statemantData);
  statemantData.totalVolumeCredits = totalVolumeCredits(statemantData);

  return renderPlainText(statemantData, plays);

  function enrichPerformance(performance) {
    const result = {
      ...performance,
      play: playFor(performance)
    };

    result.amount = amountFor(result);
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

  function amountFor(performance) {
    let result = 0;

    switch (performance.play.type) {
      case "tragedy":
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000; if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${performance.play.type}`);
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

function renderPlainText(data, plays) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${formatAsUSD(perf.amount)} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${formatAsUSD(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;
}

function formatAsUSD(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 2
  }).format(number / 100);
}

module.exports = { statement };
