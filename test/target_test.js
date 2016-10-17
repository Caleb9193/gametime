const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Target = require('../lib/target');

describe('Target', function(){
  context('default attributes', function(){
    var target = new Target();

    it('should have a default display attribute of true', function(){
      assert.equal(target.display, true);
    });
  });

  context('given attributes', function(){
    var x = 20;
    var y = 30;
    var width = 200;
    var height = 40;
    var context = 'Target';
    var target = new Target(x, y, width, height, context);

    it('should have a given x-coordinate', function(){
      assert.equal(target.x, 20);
    });

    it('should have a given y-coordinate', function(){
      assert.equal(target.y, 30);
    });

    it('should have a given width', function(){
      assert.equal(target.width, 200);
    });

    it('should have a given height', function(){
      assert.equal(target.height, 40);
    });

    it('should have a given context', function(){
      assert.equal(target.context, 'Target');
    });
  });
});

describe('draw', function(){
  var context = stub().of('fillStyle').of('fillRect');
  var x = 20;
  var y = 30;
  var width = 200;
  var height = 40;
  var target = new Target(x, y, width, height, context);

  it('should call fillRect on the canvas', function(){
    target.draw();
    assert.equal(context.fillRect.calls.length, 1);
  });

  it('should pass x, y, width, height', function(){
    target.draw();
    assert.equal(context.fillRect.calls[0][0], target.x);
    assert.equal(context.fillRect.calls[0][1], target.y);
    assert.equal(context.fillRect.calls[0][2], target.width);
    assert.equal(context.fillRect.calls[0][3], target.height);
  });
});
