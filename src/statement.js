function statement(invoice, plays) {
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // exibe a linha para esta requisição
    result += ` ${playFor(perf).name}: ${formatAsUSD(amountFor(perf))} (${perf.audience} seats)\n`;
  }

  result += `Amount owed is ${formatAsUSD(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function amountFor(performance) {
    let result = 0;

    switch (playFor(performance).type) {
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
        throw new Error(`unknown type: ${playFor(performance).type}`);
    }

    return result;
  }

  function playFor(performance) {
    return plays[performance.playID];
  }

  function formatAsUSD(number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format(number / 100);
  }

  function volumeCreditsFor(performance) {
    let result = Math.max(performance.audience - 30, 0);

    if ("comedy" === playFor(performance).type) result += Math.floor(performance.audience / 5);

    return result;
  }

  function totalAmount() {
    let result = 0;

    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }

    return result;
  }

  function totalVolumeCredits() {
    let result = 0;

    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }

    return result;
  }
}

module.exports = { statement };
