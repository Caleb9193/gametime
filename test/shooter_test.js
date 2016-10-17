const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Shooter = require('../lib/shooter');

describe('Shooter', function(){
  context('default attributes', function(){
    var shooter = new Shooter();

    it('has default x-coordinate', function(){
      assert.equal(shooter.x, 70);
    });

    it('has default y-coordinate', function(){
      assert.equal(shooter.y, 450);
    });

    it('has default height', function(){
      assert.equal(shooter.height, 50);
    });

    it('has default width', function(){
      assert.equal(shooter.width, 10);
    });
  });

  context('given attributes', function(){
    var context = "Thing";
    var shooter = new Shooter(context);

    it('should have a given context', function(){
      assert.equal(shooter.context, 'Thing');
    });
  });
});

describe('draw', function(){
  var context = stub().of('fillRect');
  var shooter = new Shooter(context);

  it('should call fillRect on the canvas', function(){
    shooter.draw();
    assert.equal(context.fillRect.calls.length, 1);
  });
});
