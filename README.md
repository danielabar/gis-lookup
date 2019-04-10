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

console.log(result.gis); // 13.18
```

## Reference Data

Lookup [tables](https://open.canada.ca/data/en/dataset/dfa4daf1-669e-4514-82cd-982f27707ed0) from Open Government Canada.
