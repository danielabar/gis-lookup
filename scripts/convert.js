const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

const CWD = process.cwd();
const DATA_DIR = './data/current';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function convert(inFile) {
  const outFile = inFile.replace('csv', 'json');
  return new Promise(function(resolve) {
    csv({
      noheader: true,
      headers: ['from', 'to', 'gis', 'gisOasCombined'],
    })
      .fromFile(inFile)
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
        fs.writeFileSync(outFile, JSON.stringify(jsonObj, null, 2));
        resolve('success');
      });
  });
}

(async () => {
  const dataFiles = fs.readdirSync('./data/current');
  const csvFiles = dataFiles.filter(dataFile => dataFile.endsWith('.csv'));
  asyncForEach(csvFiles, async csvFile => {
    await convert(path.resolve(CWD, DATA_DIR, csvFile));
  });
})();
