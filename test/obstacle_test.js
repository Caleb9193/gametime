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
