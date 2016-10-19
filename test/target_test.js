const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Target = require('../lib/target');

describe('Target', function(){
  context('default attributes', function(){
    var target = new Target();

    it('should have a default width', function(){
      assert.equal(target.width, 17);
    });

    it('should have a default height', function(){
      assert.equal(target.height, 50);
    });

    it('should have a default display attribute of true', function(){
      assert.equal(target.display, true);
    });
  });

  context('given attributes', function(){
    var x = 20;
    var y = 30;
    var context = 'Target';
    var target = new Target(x, y, context);

    it('should have a given x-coordinate', function(){
      assert.equal(target.x, 20);
    });

    it('should have a given y-coordinate', function(){
      assert.equal(target.y, 30);
    });


    it('should have a given context', function(){
      assert.equal(target.context, 'Target');
    });
  });
});
