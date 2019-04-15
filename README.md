# GIS Lookup

> PROTOTYPE: Lookup GIS (Guaranteed Income Supplement) amount by income and marital status.

## Install

```shell
npm install gis-lookup
```

## Usage

```javascript
const gisLookup = require('gis-lookup');

const status = 'single';
const income = 17905;
const result = gisLookup.find(status, income);

console.log(result.output.gis);                         // "13.18"
console.log(result.metadata.time_period_coverage_start) // for example: "2019-01-01 00:00:00"
console.log(result.metadata.time_period_coverage_end)   // for example: ""2019-06-30 00:00:00",
```

## Reference Data

Lookup [tables](https://open.canada.ca/data/en/dataset/dfa4daf1-669e-4514-82cd-982f27707ed0) from Open Government Canada.
