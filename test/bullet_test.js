const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Bullet = require('../lib/bullet');
const Obstacle = require('../lib/obstacle');
const Target = require('../lib/target');

describe('Bullet', function(){
  context('default attributes', function(){
    var bullet = new Bullet();

    it('has a default height', function(){
      assert.equal(bullet.height, 3);
    });

    it('has a default width', function(){
      assert.equal(bullet.width, 3);
    });

    it('has a default y-coordinate', function(){
      assert.equal(bullet.y, 450);
    });

    it('has a default x-coordinate', function(){
      assert.equal(bullet.x, 75);
    });

    it('has a default radius', function(){
      assert.equal(bullet.radius, 4);
    });


    it('has a default beginning bounce count', function(){
      assert.equal(bullet.bounceCount, 0);
    });
  });

  context('given attributes', function(){
    var context = "Thing";
    var directionX = 15;
    var directionY = 20;
    var bullet = new Bullet(directionX, directionY, context);

    it('has a given context', function(){
      assert.equal(bullet.context, "Thing");
    });

    it('has a given x-coordinate direction', function(){
      assert.equal(bullet.directionX, 15);
    });

    it('has a given y-coordinate direction', function(){
      assert.equal(bullet.directionY, 20);
    });
  });
});

describe('draw', function(){
  var context = stub().of("beginPath").of("arc").of("fill");
  var directionX = 15;
  var directionY = 20;
  var bullet = new Bullet(directionX, directionY, context);

  it('should call arc on the canvas', function(){
    bullet.draw();
    assert.equal(context.arc.calls.length, 1);
  });

  it('should pass x-coordinate, y-coordinate, and radius to arc', function(){
    bullet.draw();
    assert.equal(context.arc.calls[0][0], bullet.x);
    assert.equal(context.arc.calls[0][1], bullet.y);
    assert.equal(context.arc.calls[0][2], bullet.radius);
  });
});

describe('move', function(){
  var context = stub().of("canvas").of("beginPath").of("arc").of("fill");
  var directionX = 15;
  var directionY = 20;
  var bullet = new Bullet(directionX, directionY, context);
  var obstacles = [new Obstacle(0, 250, 10, 300, context)];
  var targets = [new Target(1093, 100, 7, 50, context)];


  it('should increment the x coordinate by directionX', function(){
    bullet.move(obstacles, targets);
    assert.equal(bullet.x, 90);
  });

  it('should increment the y coordinate by directionY', function(){
    bullet.move(obstacles, targets);
    assert.equal(bullet.y, 490);
  });
});
