function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${invoice.customer}\n`;
  const format = new Intl.NumberFormat("en-US",
    {
      style: "currency", currency: "USD",
      minimumFractionDigits: 2
    }).format;
  for (let perf of invoice.performances) {
    let thisAmount = amountFor(perf);
    // soma créditos por volume
    volumeCredits += Math.max(perf.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
    // exibe a linha para esta requisição
    result += ` ${playFor(perf).name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`;
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;

  function amountFor(performance) {
    let thisAmount = 0;

    switch (playFor(performance).type) {
      case "tragedy":
        thisAmount = 40000;
        if (performance.audience > 30) {
          thisAmount += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000; if (performance.audience > 20) {
          thisAmount += 10000 + 500 * (performance.audience - 20);
        }
        thisAmount += 300 * performance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(performance).type}`);
    }

    return thisAmount;
  }

  function playFor(performance) {
    return plays[performance.playID];
  }
}

module.exports = { statement };
