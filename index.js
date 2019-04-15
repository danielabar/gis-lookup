const Decimal = require('decimal.js');
const metadata = require('./data/current/metadata.json');
const table1Single = require('./data/current/table1-single.json');
const table2PartnerOAS = require('./data/current/table2-partner-oas.json');
const table3PartnerNoOAS = require('./data/current/table3-partner-no-oas.json');

const STATUS = Object.freeze({
  SINGLE: 'SINGLE',
  PARTNER_OAS: 'PARTNER_OAS',
  PARTNER_NO_OAS: 'PARTNER_NO_OAS',
});

function _lookupTable(status) {
  if (status === STATUS.SINGLE) {
    return table1Single;
  }
  if (status === STATUS.PARTNER_OAS) {
    return table2PartnerOAS;
  }
  if (status === STATUS.PARTNER_NO_OAS) {
    return table3PartnerNoOAS;
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
  return {
    input: { status, income },
    output: result,
    metadata: metadata,
  };
}

module.exports = { find, STATUS };
