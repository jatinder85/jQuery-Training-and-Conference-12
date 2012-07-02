/*
 * jquery.zebra-stripe
 *
 * Copyright (c) 2012 John Q. Public
 * Licensed under the MIT, GPL licenses.
 */

(function($) {

  // This jQuery method should zebra-stripe all selected tables and lists,
  // adding the specified className to all odd or even table rows (or
  // listitems). Instead of specifying the options as individual arguments,
  // they should be specified as properties of an options object.
  $.fn.zebraStripe3 = function(options) {
    // Override the default options with the specified options.
    options = $.extend({}, $.fn.zebraStripe3.options, options);
    // Iterate over every selected element, returning `this` for chaining.
    return this.each(function() {
      // The current element, selected in a jQuery object.
      var elem = $(this);
      var rows;
      // If the current element is a ul or ol, get its lis.
      if (elem.is('ul, ol')) {
        rows = elem.children();
      // If the current element is a table, get its trs
      } else if (elem.is('table')) {
        rows = elem.find('tr');
      }
      // If rows were found, add the specified class to the appropriate rows.
      if (rows) {
        rows.filter(':nth-child(' + options.which + ')').addClass(options.className);
      }
    });
  };

  // This default options object should default to a className of 'zebra'
  // and 'odd' (vs. 'even') row striping.
  $.fn.zebraStripe3.options = {
    className: 'zebra',
    which: 'odd'
  };

}(jQuery));
