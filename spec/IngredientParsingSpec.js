'use strict';

describe("Ingredient parsing", function() {
  var parser = require('../src/parser');

  it('parses amountless untiless ingredients', function() {
    var result = parser.parse('potatoes');
    expect(result.ingredient).toBe('potatoes');
  });

  it('parses amountless untiless multi-word ingredients', function() {
    var result = parser.parse('awesome sauce potatoes');
    expect(result.ingredient).toBe('awesome sauce potatoes');
  });
});
