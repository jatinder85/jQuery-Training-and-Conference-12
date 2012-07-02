/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  /*
    ======== A Handy Little QUnit Reference ========
    http://docs.jquery.com/QUnit

    Test methods:
      expect(numAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      raises(block, [expected], [message])
  */

  module('jQuery#zebraStripe2', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.zebraStripe2(), this.elems, 'should be chaninable');
  });

  test('stripes correctly', 2, function() {
    this.elems.zebraStripe2('zebra');
    strictEqual(this.elems.find('tr, li').filter('.zs0.zebra').length, 12, 'should have striped the correct rows/items');
    strictEqual(this.elems.find('.zebra').length, 12, 'should have striped ONLY the correct rows/items');
  });

}(jQuery));
