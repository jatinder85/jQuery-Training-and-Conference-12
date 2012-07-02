////////////////////////
// jQuery Best Practices
////////////////////////



///////////////////////////////////////////////////
// Use variables, AKA "caching" your jQuery objects
///////////////////////////////////////////////////

// This code is unnecessarily inefficient.
$("#paragraph1").html("This element is awesome.");
$("#paragraph1").addClass("highlight");
$("#paragraph1").show();

// Using variables reduces the amount of work the browser has to do.
var elem = $("#paragraph1");
elem.html("This element is awesome.");
elem.addClass("highlight");
elem.show();

// And if you prefer chaining, that works just as well.
$("#paragraph1")
  .html("This element is awesome.")
  .addClass("highlight")
  .show();






//////////////////////
// Know your selectors
//////////////////////

// Keep your selectors simple!
var overlySpecific = $("body p#paragraph1");
var specificEnough = $("#paragraph1"); // Single #id selectors are fast!



// Avoid custom jQuery selectors when you don't need them, because they
// prevent jQuery from taking advantage of native DOM methods.
$("form input:submit").click();

// Using a querySelectorAll-supported selector will be significantly
// faster in modern browsers.
$("form input[type='submit']").click();



// What's the difference?
$("#content li:first").addClass("highlight");
$("#content li:first-child").addClass("selected");



// This highlights just the first li on the page. Also, :first is a custom
// jQuery selector, so it's not as efficient as the .first() method.
$("#content li:first").addClass("highlight");

// This is much more efficient.
$("#content li").first().addClass("highlight");

// This highlights the first child li of each parent list. And because it's
// a querySelectorAll-supported selector, it's efficient.
$("#content li:first-child").addClass("selected");



// What's the difference?
$("#content li:odd").addClass("highlight");
$("#content li:nth-child(odd)").addClass("selected");



// This highlights every other li, regardless of its relationship with its
// parent. And :odd is a custom jQuery selector, so it's not efficient.
$("#content li:odd").addClass("highlight");

// This highlights every odd child li of each parent list. And it's a
// querySelectorAll-supported selector, so it's more efficient.
$("#content li:nth-child(odd)").addClass("selected");



// What's the difference?
$("#content p > a").addClass("highlight");
$("#content p a").addClass("selected");
$("#content p:has(a)").addClass("highlight");



// This highlights every anchor that's a child of a paragraph.
$("#content p > a").addClass("highlight");

// This highlights every anchor that's a descendant of a paragraph.
$("#content p a").addClass("selected");

// This highlights every *paragraph* that contains an anchor. But because
// :has is a custom jQuery selector, this is somewhat inefficient.
$("#content p:has(a)").addClass("highlight");

// This, on the other hand, is much more efficient.
$("#content p").has("a").addClass("highlight");






///////////////////////////
// Inline styles vs classes
///////////////////////////

// Changing inline styles with .css() is inefficient, and should be done
// only when necessary. CSS is much easier to maintain in .css files than
// in .js files. Avoid this:
$("ul li").css({
  color: "#070",
  background: "#afa"
});



// With classes, you can dynamically apply CSS styles, while keeping
// your CSS and JavaScript separate.

// site.css: Every li with a "selected" class will be styled.
li.selected {
  color: #070;
  background: #afa;
}

// site.js: This adds the "selected" class to every listitem.
$("ul li").addClass("selected");

// But how can this be done more efficiently?



// Understanding how CSS rules work can save you a lot of unnecessary
// expense in your JavaScript!

// site.css: Every li descendant of a ul with the "selected" class
// will be styled.
ul.selected li {
  color: #070;
  background: #afa;
}

// site.js: This adds the "selected" class to just the parent ul elements.
$("ul").addClass("selected");






//////////////////////////////
// Create elements efficiently
//////////////////////////////

// Given this list of items...
var arr = ["this", "is", "a", "super", "long", "list"];

// You could iterate over all the items using jQuery methods to build
// the list dynamically.
var list = $("<ul/>");
$.each(arr, function(index, item) {
  $("<li/>").html(item).appendTo(list);
});
list.appendTo("#target");

// But, believe it or not, building the list as a string of HTML that
// gets appended to the document at the end is much faster.
var html = "";
$.each(arr, function(index, item) {
  html += "<li>" + item + "</li>";
});
$("<ul>" + html + "</ul>").appendTo("#target");

// This is one reason why templates are so popular.
var tmpl = Mustache.compile("<ul>{{#items}}<li>{{.}}</li>{{/items}}</ul>");
var html = tmpl({items: arr});
$(html).appendTo("#target");​​​​






///////////////////////////////////////////
// Do as much work off-document as possible
///////////////////////////////////////////

// This adds the class AFTER the element has been appended to the
// document, which causes an unnecessary reflow.
$("<p>new content</p>").appendTo("#target").addClass("highlight");

// This adds the class before appending the element, while it is still
// only in memory.
$("<p>new content</p>").addClass("highlight").appendTo("#target");






//////////////////////////
// Clean up after yourself
//////////////////////////

// Store a reference to a jQuery object containing all 5 divs on the page
// in a variable.
var divs = $("div");
divs.length // 5

// At some point in the future, remove the selected divs from the document.
divs.remove();

// Because jQuery objects are snapshots, the divs we removed are still
// consuming memory. Removed elements still being referenced in a variable
// is a major cause of memory leaks!
divs.length // 5

// Problem solved. As long as no variables point to removed elements,
// they can be garbage collected by the browser.
divs = null;






////////////////////////////////
// Parents just don't understand
////////////////////////////////

// Depending on your markup, you might be able to call .parent() once.
$("p a").hover(function() {
  $(this).parent().toggleClass("highlight");
});

// But sometimes you might need to call .parent() a few times.
$("p a").hover(function() {
  $(this).parent().parent().toggleClass("highlight");
});

// What happens when the markup varies, and you don't know how many times
// you'll need to call .parent()?
$("p a").hover(function() {
  $(this).closest("p").toggleClass("highlight");
});






////////////////////////
// Namespace your events
////////////////////////

// Bind a "resize" event handler on window.
$(window).on("resize", function() {
  centerMyDialog();
});

// Note that this unbinds not just the "resize" event handler YOU bound,
// but ALL "resize" event handlers bound on window!
$(window).off("resize");



// Bind a "resize" and "scroll" event handler on window, using a namespace.
$(window).on("resize.mydialog scroll.mydialog", function() {
  centerMyDialog();
});

// Unbind just your namespaced "resize" event handler bound on window.
$(window).off("resize.mydialog");

// Unbind ALL of your namespaced event handlers bound on window.
$(window).off("resize.mydialog");






////////////////////////////////
// Each isn't just for iteration
////////////////////////////////

// This code works great when just one element is selected.
$("#paragraph1").html( $("#paragraph1").html() + "!!!" );

// But what happens when the selector matches many elements?
$("#content li").html( $("#content li").html() + "!!!" );

// One solution to this problem is to use .each to iterate explicitly.
// Also note how a variable was used to DRY the code up!
$("#content li").each(function() {
  var elem = $(this);
  elem.html( elem.html() + "!!!" );
});

// (In this example, the best solution would actually be to use this
// signature of the .html method)
$("#content li").html(function(index, value) {
  return value + "!!!";
});



// While .each is useful for its for-loop-like behavior:
$("#content li").each(function(index) {
  if (index === 2) {
    return;
  } else if (index === 8) {
    return false;
  }
  $(this).prepend("<b>" + index + "</b> ");
});



// It's most useful because it creates a per-element function scope...



// In this example, every anchor shares the same global state, because the
// counter var exists outside the .each callback function.
var counter = 0;
$("a").on("click", function(event) {
  event.preventDefault();
  counter++;
  console.log(counter, $(this).attr("href"));
});

// Here, each anchor has its own local state because the vars are local to
// the .each callback function, and thus per-element.
$("a").each(function() {
  var elem = $(this);
  var counter = 0;

  elem.on("click", function(event) {
    event.preventDefault();
    counter++;
    console.log(counter, elem.attr("href"));
  });
});



// vvv THE BASIC JQUERY "EACH" PATTERN vvv

// Whenever you do this, it doesn't matter if you have 1, 0 or 3000 widgets
// on the page. jQuery explicitly iterates over them, executing the .each
// callback function once per element, giving each widget its own state.
// And if no widgets were found, jQuery does nothing.

$(".widget").each(function() {
  var widget = $(this);
  // Your per-widget code goes here!
});

// ^^^ THE BASIC JQUERY "EACH" PATTERN ^^^
