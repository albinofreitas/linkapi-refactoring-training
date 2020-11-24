function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;

  for (let perf of invoice.performances) {
    // soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    // exibe a linha para esta requisição
    result += ` ${playFor(perf).name}: ${formatAsUSD(amountFor(perf) / 100)} (${perf.audience} seats)\n`;
    totalAmount += amountFor(perf);
  }
  result += `Amount owed is ${formatAsUSD(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
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
    }).format(number);
  }
}

module.exports = { statement };
