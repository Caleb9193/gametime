const chai = require('chai');
const assert = chai.assert;

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
  });
});
