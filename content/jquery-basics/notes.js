////////////////
// jQuery Basics
////////////////



//////////////////////
// The jQuery function
//////////////////////

// Select some elements on the page using either this:
var elems = jQuery(selector);

// Or this:
var elems = $(selector);

// (jQuery and $ are references to the same global function)
jQuery === $ // true

// So instead of this mouthful:
var elem = document.getElementById("header1");
if (elem) {
  elem.innerHTML = "Lame.";
}

// You can just do this:
$("#header1").html("Awesome!");






//////////////////////
// What is $, anyways?
//////////////////////

// Just to prove a point.
var $ = function(selector) {
  return selector + " is a selector string, whatev";
};

$("#header1"); // "#header1 is a selector string, whatev"



// The "$" character has no special meaning in JavaScript. It's just
// another valid character used in named identifiers, like letters,
// numbers and underscores.
var $foo = 123;
var bar$ = 456;
var $o$m$g$ = 789;
var $$_$$_sUp3r_$_dUp3r_$$_$$ = "wtf, dude";






///////////////////////////
// $ isn't JUST a function!
///////////////////////////

// You should already know this part:
var elems = $(selector);

// And you probably already know this part:
var obj = {prop: "Hello!"};
obj.prop // "Hello!"

// In JavaScript, functions are objects too. jQuery utilizes this to
// "namespace" a bunch of helper methods right on the jQuery function:
$.ajax(options)
$.getJSON(url)
$.extend({}, object)
$.isArray(value)






////////////////////////////////
// jQuery objects are array-Like
////////////////////////////////

// Select some elements, and store a reference to the resulting jQuery
// object in a variable.
var elems = $(".nonexistent");

// While you CAN test if elements were selected like this:
if (elems.length > 0) {
  elems.html("Nothing happens.");
}

// In most cases, you'll just want to do this. jQuery implicitly iterates
// when you call jQuery methods on jQuery objects, so you don't need to
// loop explicitly.
$(".nonexistent").html("Nothing happens, but with much less code!");

// If 0 elements were selected, jQuery does nothing. If 1 element was
// selected, jQuery updates the html of one element. If 9001 elements
// were selected, jQuery updates the html of all 9001 elements.
$("derp").html("Awesome!");
$("#thing").html("Awesome!");
$("div").html("Awesome!");



// Select some elements.
var elems = $("li");

// While you can iterate over selected elements like this:
for (var i = 0; i < elems.length; i++) {
  console.log(i, elems[i]);
}

// It's much simpler using jQuery's .each method:
elems.each(function(index) {
  console.log(index, this);
});






///////////////////////////////
// jQuery objects are snapshots
///////////////////////////////

// When you select elements from the document, you select them as they
// exist in the document at the moment the jQuery function is called.
var allDivsInTheDocument = $("div");

// So if there were 10 elements...
allDivsInTheDocument.length // 10

// And you add a few more...
$("<div/><div/><div/>").appendTo("body");

// The existing jQuery objects you have don't change!
allDivsInTheDocument.length // 10

// Selecting elements from the document by calling the jQuery function
// again will create a new snapshot.
var allDivsInTheDocumentNow = $("div");
allDivsInTheDocumentNow.length // 13






/////////////////////
// Selecting elements
/////////////////////

// You can use standard CSS selectors.
var allDivsInTheDocument = $("div");
var anchorChildrenOfParagraphs = $("p > a");
var emailInputsInsideMyform = $("#my-form input[name='email']");

// Along with standard CSS selectors, you can use custom jQuery selectors:
var currentlyAnimatingDivs = $("div:animated");

// Although custom jQuery selectors are much more useful like this.
$("div").on("click", function() {
  var elem = $(this);
  if (!elem.is(":animated")) {
    elem.slideUp(3000).slideDown(500);
  }
});

// How can we write the previous example in a more concise way, using
// implicit iteration?
$("div").on("click", function() {
  $(this).not(":animated").slideUp(3000).slideDown(500);
});






///////////////////////
// Other ways to select
///////////////////////

// Not only can you select elements with a selector string:
var inputs = $("form input[name='first']");

// You can pass an element reference into jQuery:
var win = $(window);

// Or even an array of element references:
var winAndDoc = $([window, document]);



// Where else do we commonly pass an element reference into jQuery?
$("a").on("click", function() {
  $(this).addClass("highlight"); // <---- right there!
});

// Or:
$("a").each(function() {
  $(this).addClass("selected"); // <---- right there!
});






/////////////////
// Filtering sets
/////////////////

// Given this jQuery object...
var divs = $("div");

// The "not" method filters the selected set of elements down to the
// subset that doesn't match the given selector. This could be anywhere
// from 0 to all of the initial set of elements.
var divsNotAnimating = divs.not(":animated");

// Using the ":not" selector inside the "filter" method will yield
// equivalent results.
var divsNotAnimating = divs.filter(":not(:animated)");

// Of course, given the option, you could choose to do everything with a
// single selector string.
var divsNotAnimating = $("div:not(:animated)");

// There are many jQuery custom selectors that can be used for filtering.
var firstDiv = $("div:first");
var lastDiv = $("div:last");
var secondDiv = $("div:eq(1)");
var divsContainingAnchors = $("div:has(a)");

// And for most of them, there exists a corresponding filtering method.
var firstDiv = divs.first();
var lastDiv = divs.last();
var secondDiv = divs.eq(1);
var divsContainingAnchors = divs.has("a");






/////////////////////
// Traversing the DOM
/////////////////////

var form = $("#my-form");

// You can find all descendant elements of an element.
var inputsInForm = form.find("input");

// Or all children of an element.
var childrenOfForm = form.children();

// There are all kinds of traversal methods. Parents, children, siblings,
// you name it.
$("h1").siblings().children(":first-child").next().addClass("highlight");
$("li").parent().prevAll().addClass("highlight");

// Elements don't have to be in the document to be traversable.
$("<p><i/><b/></p>");                               // [<p><i></i><b></b></p>]
$("<p><i/><b/></p>").children();                    // [<i>​</i>​, <b>​</b>​]
$("<p><i/><b/></p>").children().text("x");          // [<i>​x</i>​, <b>x​</b>​]
$("<p><i/><b/></p>").children().text("x").parent(); // [<p><i>x</i><b>x</b></p>]






//////////////////////
// Getters and setters
//////////////////////

// jQuery methods are both setters (affecting every selected element)...
$("li").html("<b>Hello</b> <i>world</i>");
$("li").text("<b>Hello</b> <i>world</i>");

// And getters. Note that methods that work as both getter and setter
// will only return the value for the FIRST selected element.
$("li").html(); // "<i>item 1</i> content"

// With a few notable exception, of course.
$("li").text(); // "item 1 contentitem 2 content item 3 contentitem 4 content"

// Most methods that work as setters and getters will also accept a
// callback that can be used to programmatically change values. Think
// of this as a "combo" getter + setter.
 $("li").html(function(index, value) {
  return "<b>" + index + "</b> " + value;
});






////////////////////////////
// Attributes and properties
////////////////////////////

$("img:first").each(function() {
  var img = $(this);

  // Set the src attribute of the image.
  img.attr("src", "/static/img/sample.gif");

  // Get the src attribute.
  console.log( img.attr("src") ); // "/static/img/sample.gif"

  // Get the src property with jQuery.
  console.log( img.prop("src") ); // "http://bocoup.com/static/img/sample.gif"

  // But if you already have a DOM element reference, you can access
  // properties directly from the element. This is very efficient!
  console.log( this.src );        // "http://bocoup.com/static/img/sample.gif"
});



// Change form element values.
$("form input[name='first']").val("Ben");

// Add or remove classes.
$("div").addClass("foo").removeClass("bar").toggleClass("foo bar");

// Change inline style properties.
$("p").css({
  color: "#fff",
  opacity: 0.75,
  fontWeight: 700,
  "background-color": "#007"
});

// Change width and height. Also see .innerHeight() and .outerHeight().
$("img").width(30).height(150);

// Change offsets.
$("img:first").offset({left: 300, top: 200});






////////////////////////
// Creating new elements
////////////////////////

// When creating elements, you can add attributes, properties, content, etc.
var graph = $('<p id="test" class="fancy"><b>hello</b> <i>world</i></p>');

// You can do the same things (and more) with jQuery methods.
var graph = $("<p/>");
graph.prop("id", "test");
graph.addClass("fancy");
graph.html("<b>hello</b> <i>world</i>");
graph.on("click", function() {
  console.log( $(this).text() );
});

// Ever since jQuery 1.4, you can also pass in an options object as the
// second argument to the jQuery function when creating a new element.
var graph = $("<p/>", {
  id: "test",
  className: "fancy",
  html: "<b>hello</b> <i>world</i>",
  click: function() {
    console.log( $(this).text() );
  }
});






////////////////////////////
// Manipulating the document
////////////////////////////

// Once you've created something, how do you attach it to the document?
var graph = $("<p>new content</p>");

graph.appendTo("#target");     // Inside #target, at the beginning.
graph.prependTo("#target");    // Inside #target, at the end.
graph.insertBefore("#target"); // Outside #target, before.
graph.insertAfter("#target");  // Outside #target, after.
graph.replaceAll("#target");   // Replace #target completely.

// These methods do similar things, but chain a little differently.
$("#target").append("<p>new content</p>");
$("#target").prepend("<p>new content</p>");
$("#target").insert("<p>new content</p>");
$("#target").after("<p>new content</p>");
$("#target").replaceWith("<p>new content</p>");



// Note that when you append an element to the DOM, it gets MOVED to
// the new location, NOT copied. Elements can exist in only one place
// in the document (or in a fragment in memory) at a time.
var elem = $("#my-element");
elem.length // 1

// Move elem somewhere else.
elem.appendTo("#new-parent");

// Yep, there's still only one of them.
$("#my-element").length // 1



// If you really want to duplicate an element, clone it!
var elem = $("#my-element");
elem.length // 1

// First, clone elem. Then, move the clone somewhere else.
// But wait, what did we forget to do here?
elem.clone().appendTo("#new-parent");

// When you clone an element with an id, you need to change (or remove)
// the id before appending it into the document!
elem.clone().removeAttr("id").appendTo("#new-parent");

// If you also want to clone event handlers and data, pass true to .clone().
$("a:first").clone(true).insertAfter("#other-image");



// You can wrap and unwrap elements.
$("a").wrap('<span class="highlight"/>').unwrap();



// You can remove elements from the document, permanently. Not only does
// this detach the selected elements from the document, it also deletes
// all event handlers and data for you.
$("p").remove();

// You can remove all descendant elements from elements. This method also
// deletes all event handlers and data, and is used internally, every time
// .html() is called.
$("p").empty();

// If you want to remove an element from the document temporarily, be
// sure to use .detach(), which doesn't delete event handlers and data!
var anchor = $("#my-anchor").detach();
anchor.appendTo("body");






///////////
// Chaining
///////////

// Here, we first select all paragraphs. Next, we filter that set down
// to only those that contain anchors. Finally, we add a "highlight" class.
$("p").has("a").addClass("highlight");

// Instead of doing this in one long "chain" we could use a variable.
var graphs = $("p");
graphs.has("a").addClass("highlight");

// Or multiple variables.
var graphs = $("p");
var graphsWithAnchors = graphs.has("a");
graphsWithAnchors.addClass("highlight");



// Whenever you reduce a set of elements down to a subset using a jQuery
// filtering method, get all new elements using a jQuery traversal method,
// or use a jQuery method as a setter, jQuery returns a jQuery object.

// And when a jQuery method returns a jQuery object, you can chain.

// Let's break this chain down:
$("ul").children().not(":last-child").addClass("highlight").html();

$("ul") // select: returns a jQuery object.
  .children() // traverse: returns a new jQuery object.
    .not(":last-child") // filter: returns a new jQuery object.
      .addClass("highlight") // set: returns the same jQuery object.
        .html(); // get: returns a string of HTML, not a jQuery object!



// The .end() method can be used to "revert" the last filter or traversal
// operation in the chain.
$("ul").addClass("highlight"); // highlight uls.
$("ul").children().addClass("highlight"); // highlight lis inside of uls.
$("ul").children().end().addClass("highlight"); // highlight uls, inefficiently!


// Note that the .end() method doesn't revert changes made to the document.
// In this example, the uls and their children will all still have their
// classes. The ul still has an event handler bound. It's only the chain
// that is reverted.
$("ul")
  .bind("click", function() {
    $(this).toggleClass("clicked");
  })
  .children()
    .addClass("children")
    .end()
  .addClass("parent");

// If you find it easier to keep the chaining to a minimum, and use
// variables instead, by all means do so!
var uls = $("ul");
uls.bind("click", function() {
  $(this).toggleClass("clicked");
});
uls.addClass("parent");
uls.children().addClass("children");
