const csv = require('csvtojson');
const fs = require('fs');

csv({
  noheader: true,
  headers: ['from', 'to', 'gis', 'gisOasCombined'],
})
  .fromFile('./data/current/table1-single.csv')
  .subscribe(json => {
    if (Number.isNaN(Number.parseFloat(json.from))) {
      json.from = 0;
      json.to = 0;
      json.gis = 0;
      json.gisOasCombined = 0;
    } else {
      json.from = json.from.replace(',', '');
      json.to = json.to.replace(',', '');
      json.gis = json.gis.replace(',', '');
      json.gisOasCombined = json.gisOasCombined.replace(',', '');
    }
  })
  .then(jsonObj => {
    fs.writeFileSync('./data/current/table1-single.json', JSON.stringify(jsonObj, null, 2));
  });
