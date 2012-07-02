/*
 * jquery.zebra-stripe
 *
 * Copyright (c) 2012 John Q. Public
 * Licensed under the MIT, GPL licenses.
 */

(function($) {

  // This jQuery method should zebra-stripe all selected tables, adding
  // the specified className to all odd table rows.
  $.fn.zebraStripe1 = function(className) {
    // Your code goes here.
	$("tr:nth-child(odd)").addClass(className);
	return this;
  };

}(jQuery));
