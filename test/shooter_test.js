const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Shooter = require('../lib/shooter');

describe('Shooter', function(){
  context('given attributes', function(){
    var context = "Thing";
    var shooter = new Shooter(context);

    it('should have a given context', function(){
      assert.equal(shooter.context, 'Thing');
    });
  });
});
