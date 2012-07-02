// # Deferreds
//
// The jqXHR object is simply a special flavor of a "deferred". jQuery
// lets you create your own deferreds, which can be a powerful way for
// managing asynchronous code. Deferreds provide a means to react to the
// eventual success or failure of an asynchronous operation, and reduce
// the need for deeply nested callbacks.

// ## $.Deferred
//
// You can create your own deferreds using `$.Deferred`. Here, we run a
// function in a setTimeout, and "resolve" our deferred with the return
// value of that function. We return the deferred's "promise" -- an object
// to which we can attach callbacks, but which doesn't have the ability to
// modify the outcome of deferred itself. We "reject" the deferred if anything
// goes wrong with running the provided function.
function doSomethingLater(fn, time) {
  var dfd = $.Deferred();

  setTimeout(function() {
    dfd.resolve(fn());
  }, time || 0);

  return dfd.promise();
}

var promise = doSomethingLater(function() { /* ... */ }, 100);
debugger;

// ## .then(), .done(), .fail(), .always()
//
// Just like with a jqXHR, we can attach success and error handlers to
// a promise.
function doSomethingLater(fn, time) {
  var dfd = $.Deferred();

  setTimeout(function() {
    dfd.resolve(fn());
  }, time || 0);

  return dfd.promise();
}

var success = function(resp) {
  $('#target').html('it worked');
};
var err = function(req, status, err) {
  $('#target').html('it failed');
};
var dfd = doSomethingLater(function() { /* ... */ }, 100);

dfd.then(success, err);

// ## pipe()
//
// We can use the `pipe()` method to react to the resolution
// of an asynchronous operation by manipulating the value it
// returns and creating a new deferred.
//
// In jQuery 1.8, the `.then()` method of a promise will behave
// like pipe.
function doSomethingLater(fn, time) {
  var dfd = $.Deferred();

  setTimeout(function() {
    dfd.resolve(fn());
  }, time || 0);

  return dfd.promise();
}

var dfd = doSomethingLater(function() { return 1; }, 100);

dfd
  .pipe(function(resp) { return resp + ' ' + resp; })
  .done(function(newResp) { $('#target').html(newResp); });

// ## Reacting to maybe-asynchronous operations
//
// Sometimes we have an operation that might return immediately, or
// might be asynchronous -- for example, if a function does something
// async the first time it runs, and then caches the value for future
// use. In this case, we can use `$.when()` to react to either case.
function maybeAsync(num) {
  var dfd = $.Deferred();

  // return a deferred when num === 1
  if (num === 1) {
    setTimeout(function() {
      dfd.resolve(num);
    }, 100);
    return dfd.promise();
  }

  // return immediately otherwise
  return num;
}

// this will resolve async
$.when(maybeAsync(1)).then(function(resp) {
  $('#target').append('<p>' + resp + '</p>');
});

// this will return immediately
$.when(maybeAsync(0)).then(function(resp) {
  $('#target').append('<p>' + resp + '</p>');
});

// You can also pass `$.when` more than one argument, which lets you mix
// sync and async operations; you get their return values back as arguments
// to the callback.
function maybeAsync(num) {
  var dfd = $.Deferred();

  // return a deferred when num === 1
  if (num === 1) {
    setTimeout(function() {
      dfd.resolve(num);
    }, 100);
    return dfd.promise();
  }

  // return immediately otherwise
  return num;
}

$.when(maybeAsync(0), maybeAsync(1))
  .then(function(resp1, resp2) {
    $('#target').append('<p>' + resp1 + '</p>');
    $('#target').append('<p>' + resp2 + '</p>');
  });

// When a jqXHR is one of the arguments to `$.when`, we get an array of
// arguments passed to our callback.
function maybeAsync(num) {
  var dfd = $.Deferred();

  // return a deferred when num === 1
  if (num === 1) {
    setTimeout(function() {
      dfd.resolve(num);
    }, 100);
    return dfd.promise();
  }

  // return immediately otherwise
  return num;
}

$.when(maybeAsync(0), $.get('/data/people.json'))
  .then(function(resp1, resp2) {
    debugger;
  });
