const ComedyCalculator = require("./comedy-calculator");
const TragedyCalculator = require("./tragedy-calculator");

module.exports = function createPerformanceCalculator(performance, play) {
  switch(play.type) {
    case "tragedy": return new TragedyCalculator(performance, play);
    case "comedy" : return new ComedyCalculator(performance, play);
    default: throw new Error(`unknown type: ${play.type}`);
  }
}
