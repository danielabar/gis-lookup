# GIS Lookup

> PROTOTYPE: Lookup GIS (Guaranteed Income Supplement) amount by income and marital status.

## Install

```shell
npm install gis-lookup
```

## Usage

```javascript
const gisLookup = require('gis-lookup');

const income = 17905;
const result = gisLookup.find(gisLookup.STATUS.SINGLE, income);

console.log(result.output.gis);                         // "13.18"
console.log(result.metadata.time_period_coverage_start) // for example: "2019-01-01 00:00:00"
console.log(result.metadata.time_period_coverage_end)   // for example: ""2019-06-30 00:00:00",
```

Available statuses are as follows:

| Status         | Description                                                              |
| -------------- | ------------------------------------------------------------------------ |
| SINGLE         | Single person who receives an OAS pension                                |
| PARTNER_OAS    | Spouse/common-law partner of someone who receives an OAS pension         |
| PARTNER_NO_OAS | Spouse/common-law partner of someone who does not receive an OAS pension |

If something goes wrong, result will contain an `error` property

```javascript
const gisLookup = require('gis-lookup');

const result = gisLookup.find('married', 'abc')
console.log(result.error); // [{"en_CA":"Unknown status","fr_CA":"TBD"},{"en_CA":"Invalid income","fr_CA":"TBD"}]
```

## Maintenance

TBD, too manual currently...

```shell
npm run generate
```

## Reference Data

Lookup [tables](https://open.canada.ca/data/en/dataset/dfa4daf1-669e-4514-82cd-982f27707ed0) from Open Government Canada.
