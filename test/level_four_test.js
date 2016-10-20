const chai = require('chai');
const assert = chai.assert;
const LevelFour = require('../lib/level_four');
const Target = require('../lib/target');
const Obstacle = require('../lib/obstacle');

describe('LevelFour', function(){
  context('default attributes', function(){
    var level = new LevelFour();

    it('has a default ammo amount', function(){
      assert.equal(level.ammo, 7);
    });

    it('has a default array of targets', function(){
      assert.isArray(level.targets);
      assert.instanceOf(level.targets[0], Target);
    });

    it('has a default array of obstacles', function(){
      assert.isArray(level.obstacles);
      assert.instanceOf(level.obstacles[0], Obstacle);
    });
  });
});
