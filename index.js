const Decimal = require('decimal.js');
const metadata = require('./data/current/metadata.json');
const table1Single = require('./data/current/table1-single.json');
const table2PartnerOAS = require('./data/current/table2-partner-oas.json');
const table3PartnerNoOAS = require('./data/current/table3-partner-no-oas.json');

const STATUS_ENUM = Object.freeze({
  SINGLE: 'SINGLE',
  PARTNER_OAS: 'PARTNER_OAS',
  PARTNER_NO_OAS: 'PARTNER_NO_OAS',
});

function _validate(status, income) {
  let dIncome;
  let dIncomeNeg;
  let result = {
    isValid: true,
    messages: [],
  };

  if (!STATUS_ENUM[status]) {
    result.messages.push({
      en_CA: 'Unknown status',
      fr_CA: 'TBD',
    });
    result.isValid = false;
  }

  try {
    dIncome = new Decimal(income);
    dIncomeNeg = dIncome.isNeg();
  } catch (err) {
    result.messages.push({
      en_CA: 'Invalid income',
      fr_CA: 'TBD',
    });
    result.isValid = false;
  }

  if (dIncomeNeg) {
    result.messages.push({
      en_CA: 'Income cannot be negative',
      fr_CA: 'TBD',
    });
    result.isValid = false;
  }

  return result;
}

function _lookupTable(status) {
  if (status === STATUS_ENUM.SINGLE) {
    return table1Single;
  }
  if (status === STATUS_ENUM.PARTNER_OAS) {
    return table2PartnerOAS;
  }
  if (status === STATUS_ENUM.PARTNER_NO_OAS) {
    return table3PartnerNoOAS;
  }
}

function find(status, income) {
  const validateResult = _validate(status, income);
  if (!validateResult.isValid) {
    return {
      input: { status, income },
      error: validateResult.messages,
    };
  }

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

module.exports = { find, STATUS: STATUS_ENUM };
