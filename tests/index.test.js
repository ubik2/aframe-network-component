/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('network component', function () {
  setup(function (done) {
    this.el = entityFactory();
    this.el.setAttribute('network', {});
    this.el.addEventListener('loaded', function () {
      done();
    });
  });

  suite('local property', function () {
    test('is good', function () {
      assert.equal(1, 1);
    });
  });
});
