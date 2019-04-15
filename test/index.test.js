const index = require('../index');
const { expect } = require('chai');

describe('index', () => {
  describe('find', () => {
    it('looks up a gis value by numeric income', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = 4561;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('655.32');
    });

    it('looks up a gis value by string income', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = '4561';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('655.32');
    });

    it('switches to partner oas table', () => {
      // Given
      const status = index.STATUS.PARTNER_OAS;
      const income = 336;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('533.77');
    });

    it('switches to partner no oas table', () => {
      // Given
      const status = index.STATUS.PARTNER_NO_OAS;
      const income = 336;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.output.gis).to.equal('898.32');
    });

    it('result includes input, output and metadadta', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = 72.01;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.input.status).to.equal('SINGLE');
      expect(result.input.income).to.equal(72.01);
      expect(result.output.gis).to.equal('895.32');
      expect(result.metadata).to.exist;
    });

    it('returns result for 0 income', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = '0';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.input.status).to.equal('SINGLE');
      expect(result.input.income).to.equal('0');
      expect(result.output.gis).to.equal('898.32');
      expect(result.metadata).to.exist;
    });

    it('returns an error for unknown status', () => {
      // Given
      const status = 'foo';
      const income = 100;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.error[0].en_CA).to.equal('Unknown status');
      expect(result.error[0].fr_CA).to.equal('TBD');
    });

    it('returns an error for non numeric income', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = 'abc';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.error[0].en_CA).to.equal('Invalid income');
      expect(result.error[0].fr_CA).to.equal('TBD');
    });

    it('returns an error for negative income', () => {
      // Given
      const status = index.STATUS.SINGLE;
      const income = -100;
      // When
      const result = index.find(status, income);
      // Then
      expect(result.error[0].en_CA).to.equal('Income cannot be negative');
      expect(result.error[0].fr_CA).to.equal('TBD');
    });

    it('returns multiple error messages', () => {
      // Given
      const status = 'foo';
      const income = 'abc';
      // When
      const result = index.find(status, income);
      // Then
      expect(result.error[0].en_CA).to.equal('Unknown status');
      expect(result.error[0].fr_CA).to.equal('TBD');
      expect(result.error[1].en_CA).to.equal('Invalid income');
      expect(result.error[1].fr_CA).to.equal('TBD');
    });
  });
});
