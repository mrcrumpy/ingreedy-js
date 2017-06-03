'use strict';

var ingreedyMatchers = {
  toBeParsedAs: function(util, customEqualityTesters) {
    return {
      compare: function(inputString, expected) {
        var parserResult;
        var specResult = {};
        var Ingreedy = require('../src/parser');

        try {
          parserResult = Ingreedy.parse(inputString);
        } catch(err) {
          specResult.pass = false;
        }

        if(specResult.pass !== false) {
          specResult.pass = util.equals(parserResult, expected);
        }

        if(specResult.pass) {
          specResult.message = 'Ingreedy successfully parsed "' + inputString + '"';
        } else {
          specResult.message = 'Ingreedy parsed \n' + JSON.stringify(parserResult) + '\ninstead of \n' + JSON.stringify(expected);
        }

        return specResult;
      }
    }
  }
};

describe("Ingreedy", function() {
  var parser = require('../src/parser');

  beforeEach(function() {
    jasmine.addMatchers(ingreedyMatchers);
  });

  describe('simple ingredient additions', function() {
    it('parses the correct values', function() {
      expect('1 lb potatoes').toBeParsedAs({
        amount: '1',
        unit: 'lb',
        ingredient: 'potatoes'
      });
    });
  });

  describe('german ingredient additions', function() {
    it('parses the correct values', function() {
      expect('schwarze Oliven (z. B. Kalamata; ohne Stein): 50 g').toBeParsedAs({
        amount: '50',
        unit: 'g',
        ingredient: 'schwarze Oliven (z. B. Kalamata; ohne Stein)'
      });
    });
  });

  describe('ingredient additions with a container', function() {
    it('parses the correct values', function() {
      expect('2 28 oz can tomatoes').toBeParsedAs({
        amount: '2',
        ingredient: 'can tomatoes',
        container: {
          amount: '28',
          unit: 'oz'
        }
      });
    });
  });
});
