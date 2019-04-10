const Decimal = require('decimal.js');
const table1Single = require('./data/current/table1-single.json');

function _lookupTable(status) {
  if (status === 'single') {
    return table1Single;
  }
}
function find(status, income) {
  const lookupTable = _lookupTable(status);
  const result = lookupTable.find(gisData => {
    const dFrom = new Decimal(gisData.from);
    const dTo = new Decimal(gisData.to);
    const dIncome = new Decimal(income);
    return dFrom.lte(dIncome) && dTo.gte(dIncome);
  });
  return result;
}

module.exports = { find };
