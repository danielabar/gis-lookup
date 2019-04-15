const index = require('../index');
const { expect } = require('chai');

describe('index', () => {
  describe('find', () => {
    it('looks up a gis value by numeric income', () => {
      // Given
      const status = 'single';
      const income = 4561;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('655.32');
    });

    it('looks up a gis value by string income', () => {
      // Given
      const status = 'single';
      const income = '4561';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('655.32');
    });

    it('result includes input, output and metadadta', () => {
      // Given
      const status = 'single';
      const income = 72.01;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.input.status).to.equal('single');
      expect(result.input.income).to.equal(72.01);
      expect(result.output.gis).to.equal('895.32');
      expect(result.metadata).to.exist;
    });
  });
});
