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

  module('jQuery#zebraStripe3', {
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('correct default options', 2, function() {
    strictEqual($.fn.zebraStripe3.options.className, 'zebra', 'options.className should default to "zebra"');
    strictEqual($.fn.zebraStripe3.options.which, 'odd', 'options.which should default to "even"');
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.zebraStripe3(), this.elems, 'should be chaninable');
  });

  test('default options', 2, function() {
    this.elems.zebraStripe3();
    strictEqual(this.elems.find('tr, li').filter('.zs0.zebra').length, 12, 'should have striped the correct rows/items');
    strictEqual(this.elems.find('.zebra').length, 12, 'should have striped ONLY the correct rows/items');
  });

  test('options.className', 2, function() {
    this.elems.zebraStripe3({className: 'foo'});
    strictEqual(this.elems.find('tr, li').filter('.zs0.foo').length, 12, 'should have striped the correct rows/items');
    strictEqual(this.elems.find('.foo').length, 12, 'should have striped ONLY the correct rows/items');
  });

  test('options.which', 2, function() {
    this.elems.zebraStripe3({which: 'even'});
    strictEqual(this.elems.find('tr, li').filter('.zs1.zebra').length, 8, 'should have striped the correct rows/items');
    strictEqual(this.elems.find('.zebra').length, 8, 'should have striped ONLY the correct rows/items');
  });

  test('change defaults', 2, function() {
    $.fn.zebraStripe3.options = {
      className: 'foo',
      which: 'even'
    };
    this.elems.zebraStripe3();
    strictEqual(this.elems.find('tr, li').filter('.zs1.foo').length, 8, 'should have striped the correct rows/items');
    strictEqual(this.elems.find('.foo').length, 8, 'should have striped ONLY the correct rows/items');
  });

}(jQuery));
