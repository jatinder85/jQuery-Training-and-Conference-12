//////////////////////////////
// Events and Event Delegation
//////////////////////////////



// jQuery provides shortcut methods for binding...
$("a").click(function(event) {
  console.log("clicked", $(this).attr("href"));
});

// ...and triggering event handlers.
$("a").click();

// However, there is no "un" shortcut method.
$("a").unclick(); // TypeError: Object has no method 'unclick'



// When you use the preferred "on" method (the old "bind" method
// works too), you have a lot more flexibility.
$("a").on("click", function(event) {
  console.log("clicked", $(this).attr("href"));
});



// For example, when you unbind event handlers, you unbind EVERY event
// handler of the specified type, bound to all selected elements.
$("a").off("click");

// But if you bind using namespaces...
$("a").on("click.mynamespace", function(event) {
  console.log("clicked", $(this).attr("href"));
});

// ...and unbind using the same namespace, only the event handlers
// bound with that namespace will be unbound, leaving other event
// handlers of that type, on the selected elements untouched.
$("a").off("click.mynamespace");

// Namespaces also work for triggering event handlers.
$("a").trigger("click.mynamespace");


// You can bind multiple event types at once (with optional namespaces).
$(window).on("resize.foo scroll.bar", function(event) {
  console.log("The window has been resized or scrolled!");
});






///////////////////
// The event object
///////////////////

// Whenever an event is triggered, the event handler function receives
// one argument, an event object. It has many properties.
$(document).on("click", function(event) {
  console.log(event.type);    // The event type, eg. "click"
  console.log(event.which);   // The button or kep that was pressed.
  console.log(event.target);  // The originating element.
  console.log(event.pageX);   // The document mouse X coordinate.
  console.log(event.pageY);   // The document mouse Y coordinate.
});






////////////////////
// The event handler
////////////////////

$("input").on("keydown", function(event) {
  // this: The element on which the event handler was bound.
  // event: The event object.

  // Change the input element's background to red if backspace was
  // pressed, otherwise green.
  $(this).css("background", event.which === 8 ? "red" : "green");
});






////////////////////////////////
// Preventing the default action
////////////////////////////////

// You've seen this before, right? Well, don't return false in your
// event handlers! This can introduce problems with event delegation.
$("a").on("click", function() {
  // Log stuff.
  console.log("I was just clicked!");
  // Prevent the default action AND stop event propagation.
  return false;
});

// By calling event.preventDefault() explicitly, only the default
// action is prevented; propagation isn't stopped.
$("a").on("click", function(event) {
  // Prevent the default action.
  event.preventDefault();
  // Log stuff.
  console.log("I was just clicked!");
});



/////////////////
// Event bubbling
/////////////////

// <html>
//   <body>
//     <div>
//       <p><a href="#foo">I am a Link!</a></p>
//     </div>
//     <div>
//       <p><a href="#bar">I am another Link!</a></p>
//     </div>
//   </body>
// </html>

// This is just for illustrative purposes!
$("*").add([document, window]).on("click", function() {
  console.log(this);
});



///////////////////
// Event delegation
///////////////////

// With this markup:
// <a href="#foo">I am a Link!</a>
// <a href="#bar">I am another Link!</a>

// This works like you'd expect, right?
$("a").on("click", function(event) {
  event.preventDefault();
  console.log( $(this).attr("href") );
});

// How about with this markup?
// <a href="#foo"><span>I am a Link!</span></a>
// <a href="#bar"><b><i>I am another Link!</i></b></a>

// It still works, even though you're not actually clicking the anchors.
// You're really clicking the "span" or "i" descendant elements of the
// anchors, but since they're inside the anchors, you're effectively
// clicking the anchors. This behavior we take for granted is called
// "event delegation."



// We can bind event handlers on any parent element. But because `this`
// is the element to which the event handler was bound, this example
// isn't particularly interesting.
$(document).on("click", function(event) {
  event.preventDefault();
  console.log(this);
});

// What if, instead of logging `this`, we logged event.target?
$(document).on("click", function(event) {
  event.preventDefault();
  console.log(event.target);
});

// Instead of logging to the console, let's see it in the page.
$(document).on("mouseover mouseout", function(event) {
  $(event.target).toggleClass("highlight");
});



// Knowing this, how might you utilize event delegation in your code?
$(document).on("mouseover mouseout", function(event) {
  var elem = $(event.target);
  if ( elem.is("li") ) {
    elem.toggleClass("highlight");
  }
});

// Utilizing implicit iteration, the previous example could be written
// more like this:
$(document).on("mouseover mouseout", function(event) {
  $(event.target).filter("li").toggleClass("highlight");
});

// So, that works great when li elements are interacted with directly,
// but it doesn't work well for descendant elements. How can we handle
// both?
$(document).on("mouseover mouseout", function(event) {
  $(event.target).closest("li").toggleClass("highlight");
});

// Internally, this is exactly what jQuery event delegation does. Except
// the selector is specified between the event types and the handler,
// `this` is the element that matched that selector, and it's MUCH more
// efficient than if it was done manually with .closest().
$(document).on("mouseover mouseout", "li", function(event) {
  $(this).toggleClass("highlight");
});



// And of course, because you're binding the event handler to a parent
// element, you don't need to re-bind event handlers every time you add
// new descendant elements matching that selector.
$("li").clone().insertAfter("#content li");






///////////////////////
// Stopping propagation
///////////////////////

// <html>
//   <body>
//     <div>
//       <p><a href="#foo">I am a Link!</a></p>
//     </div>
//     <div>
//       <p><a href="#bar">I am another Link!</a></p>
//     </div>
//   </body>
// </html>

// This is just for illustrative purposes!
$("*").add([document, window]).on("click", function() {
  console.log(this);
});

// So, what if you used `return false` to prevent the default action?
// You'd also be stopping propagation, in a way that's not very easy
// to troubleshoot. Don't return false in your event handlers!
$("a").on("click", function() {
  // Log stuff.
  console.log("I was just clicked!");
  // Prevent the default action AND stop event propagation. Oops?
  return false;
});

// This prevents default, but doesn't stop propagation.
$("a").on("click", function(event) {
  // Prevent the default action.
  event.preventDefault();
  // Log stuff.
  console.log("I was just clicked!");
});

// This stops event propagation, but doesn't prevent default.
$("a").on("click", function(event) {
  // Stop event propagation.
  event.stopPropagation();
  // Log stuff.
  console.log("I was just clicked!");
});

