const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Obstacle = require('../lib/obstacle');

describe('Obstacle', function(){
  context('given attributes', function(){
    var x = 20;
    var y = 30;
    var height = 40;
    var width = 200;
    var context = 'Target';
    var obstacle = new Obstacle(x, y, width, height, context);

    it('should have a given x-coordinate', function(){
      assert.equal(obstacle.x, 20);
    });

    it('should have a given y-coordinate', function(){
      assert.equal(obstacle.y, 30);
    });

    it('should have a given height', function(){
      assert.equal(obstacle.height, 40);
    });

    it('should have a given width', function(){
      assert.equal(obstacle.width, 200);
    });

    it('should have a given context', function(){
      assert.equal(obstacle.context, 'Target');
    });
  });
});

describe('draw', function(){
  var x = 20;
  var y = 30;
  var height = 40;
  var width = 200;
  var context = stub().of('fillRect').of('fillStyle');
  var obstacle = new Obstacle(x, y, width, height, context);

  it('should call fillRect on the canvas', function(){
    obstacle.draw();
    assert.equal(context.fillRect.calls.length, 1);
  });

  it('should pass x, y, width, and height to fillRect', function(){
    obstacle.draw();
    assert.equal(context.fillRect.calls[0][0], obstacle.x);
    assert.equal(context.fillRect.calls[0][1], obstacle.y);
    assert.equal(context.fillRect.calls[0][2], obstacle.width);
    assert.equal(context.fillRect.calls[0][3], obstacle.height);
  });
});
