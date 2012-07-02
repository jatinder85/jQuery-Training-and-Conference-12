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

  module('jQuery#zebraStripe1', {
    setup: function() {
      this.elems = $('#qunit-fixture').children('table');
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.zebraStripe1(), this.elems, 'should be chaninable');
  });

  test('stripes the correct elements', 2, function() {
    this.elems.zebraStripe1('zebra');
    strictEqual(this.elems.find('tr.zs0.zebra').length, 6, 'should have striped the correct rows');
    strictEqual(this.elems.find('.zebra').length, 6, 'should have striped ONLY the correct rows');
  });

}(jQuery));
