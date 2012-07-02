// # Debugging

// ## Console 101
//
// Your browser's console gives you great insight into what's happening
// with your code -- especially when something goes wrong.
//
// You can execute code directly in the console, and you can also call
// out to the console from your normal code:
console.log('Hello, world');
console.dir({ foo : 'bar' });
console.log('a', [ 1, 2, 3 ], false);

// ## Console Tips
//
// $0 access the element you're inspecting.
//
// Different browsers have different methods, such as markTimeline,
// profile, profileEnd, assert, and more.
console.assert(a === b, a, 'equals', b);

// ## More Console Goodness
//
// - break on errors
// - debugger statements
// - custom breakpoints
// - stack traces
// - watch expressions
