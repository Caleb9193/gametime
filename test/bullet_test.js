const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Bullet = require('../lib/bullet');

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

    it('has a default x-coordinate speed', function(){
      assert.equal(bullet.speedX, 15);
    });

    it('has a default y-coordinate speed', function(){
      assert.equal(bullet.speedY, 15);
    });

    it('has a default beginning bounce count', function(){
      assert.equal(bullet.bounceCount, 0);
    });
  });

  context('given attributes', function(){
    it('has a given context', function(){
      var context = "Thing";
      var bullet = new Bullet(context);

      assert.equal(bullet.context, "Thing");
    });
  });

  // describe('draw', function(){
  //   it('should call arc on the canvas', function(){
  //     var context = stub().of("arc");
  //     console.log(context);
  //     var bullet = new Bullet(context);
  //     bullet.draw();
  //     assert.equal(context.arc.calls.length, 1);
  //   });
  // });
});
