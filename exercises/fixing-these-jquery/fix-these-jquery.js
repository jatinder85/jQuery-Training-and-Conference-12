// # Fixing these jQuery
//
// Each of the document ready functions below shows a common jQuery
// anti-pattern. Your task: follow the instructions above each code sample,
// keeping in mind best practices and the knowledge you have of the jQuery API.
//
// ## Tips
//
// - Read the [API documentation](http://api.jquery.com/) to make sure you know
// all the options for using a given method
// - "Cache" selections in a variable if you can use the selection again;
// requerying the DOM is expensive and should only happen when necessary
// - Avoid unnecessary iteration. Most jQuery methods provide "implicit
// iteration" -- they will operate on all of the elements in a selection.
// Additionally, many methods allow passing a function that will operate on
// each method in the selection.

// How can we rewrite this code to improve the selectors?
$('.dogs #ellie').click(function() {    // Answer: ID should be unique, no need for class selector
  console.log('Ellie is the best dog');
});

$('table#sales thead th td').hover(function() { // ?? A lot wrong here
  $(this).toggleClass('active');
});

// How can we rewrite this code to avoid repeated selections?
$('li span').addClass('enabled');
$('li span').css('backgroundColor', 'red'); // Presentation in CSS; Add && remove classes via JS

$('li span a').on('click', function(e) {
  e.preventDefault();
  console.log($(this).attr('href'));
});

$('#toggle').on('click', function() {
  $('li a').removeClass('enabled');
});

// jQuery offers convenience methods for common event binding, and also lets
// you pass multiple events, separated by spaces, as the first argument to
// `.on()`. Knowing this, how can we improve the following?
$('a')
  .mouseover(function() {
    $(this).addClass('hover');
  })
  .mouseout(function() {
    $(this).removeClass('hover');
  });

$('input')
  .focus(function() {
    $(this).addClass('focused');
  })
  .blur(function() {
    $(this).removeClass('focused');
  });

// How could you rewrite the following code to avoid calling `.each()`?
$('div').each(function() {
  $(this).addClass('active');
});

$('li').each(function() {
  $(this).html($(this).html() + ', bro');
});

// How can we use jQuery to create this div more simply?
var myDiv = $('<div/>').appendTo($('body'));
myDiv.html('Teh awesomest div');
myDiv.addClass('omgomg');
myDiv.attr('id', 'because_a_class_just_isnt_enough');
myDiv.click(function() { console.log('unicorns! unicorns!'); });

// Without knowing anything about the HTML that it's being used on,
// can you suggest a better strategy than this?
$('#clickMe')
  .parent().parent().prev('tr').prev('tr').children('td').next('td').children('input').val('')
  .parent().parent().prev('tr').children('td').next('td').children('input').val('')
  .parent().parent().prev('tr').prev('tr').children('td').next('td').children('input').val('')
  .parent().parent().prev('tr').children('td').next('td').children('input').val('');

// There is some repetition in this code; how can we rewrite it to
// DRY it out? What other improvements can we make?
var lastClicked;

$('.foo').click(function() {
  lastClicked = $(this);
});

$('<div>').appendTo('#software').on('click', function() {
  lastClicked = $(this);
});

var tallest = 0;

$('.col').each(function(){
  if ($(this).height() > tallest) {
    tallest = $(this).height();
  }
});

$('.col').css('height', tallest + 'px');

$('li a').on('click', function(){
  $('#hardware').addClass('col');

  $('.col').each(function(){
    if ($(this).height() > tallest) {
      tallest = $(this).height();
    }
  });

  $('.col').css('height', tallest + 'px');
});
