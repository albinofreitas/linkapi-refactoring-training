const { expect } = require('@jest/globals');
const { statement, htmlStatement } = require('./statement');

describe('statement', () => {
  const invoice = [
    {
      customer: 'BigCo',
      performances: [{
        playID: 'hamlet',
        audience: 55
      },
      {
        playID: 'as-like',
        audience: 35
      },
      {
        playID: 'othello',
        audience: 40
      }
      ]
    }
  ];

  const plays = {
    hamlet: { 'name': 'Hamlet', 'type': 'tragedy' },
    'as-like': { 'name': 'As You Like It', 'type': 'comedy' },
    othello: { 'name': 'Othello', 'type': 'tragedy' }
  };

  it('should print a statement for multiple plays, single customer and multiple seats in plain text', () => {
    const expectedPlainText =
`Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;

    expect(statement(invoice[0], plays)).toEqual(expectedPlainText);
  });

//   it('should print a statement for multiple plays, single customer and multiple seats in HTML', () => {
//     const expectedHTML  =
// `<h1>Statement for BigCo</h1>
// <table>
// <tr><th>play</th><th>seats</th><th>cost</th></tr> <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>
//  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>
//  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>
// </table>
// <p>Amount owed is <em>$1,730.00</em></p>
// <p>You earned <em>47</em> credits </p>
// `;

//     expect(htmlStatement(invoice[0], plays)).toEqual(expectedHTML);
//   });
});
