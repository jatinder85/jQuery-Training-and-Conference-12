/*
 * jquery.zebra-stripe
 *
 * Copyright (c) 2012 John Q. Public
 * Licensed under the MIT, GPL licenses.
 */

(function($) {

  // This jQuery method should zebra-stripe all selected tables and lists,
  // adding the specified className to all odd table rows (or listitems).
  $.fn.zebraStripe2 = function(className) {
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
      // If rows were found, add the specified class to all odd rows.
      if (rows) {
        rows.filter(':nth-child(odd)').addClass(className);
      }
    });
  };

}(jQuery));
