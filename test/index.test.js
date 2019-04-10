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
      expect(result.gis).to.equal('655.32');
    });

    it('looks up a gis value by string income', () => {
      // Given
      const status = 'single';
      const income = '4561';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.gis).to.equal('655.32');
    });
  });
});
