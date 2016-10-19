const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');
const Scoreboard = require('../lib/scoreboard');

describe('Scoreboard', function(){
  context('given attributes', function(){
    var context = 'Thing';
    var scoreboard = new Scoreboard(context);

    it('it should have a given context', function(){
      assert.equal(scoreboard.context, 'Thing');
    });
  });
});
