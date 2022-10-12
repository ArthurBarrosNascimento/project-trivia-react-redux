Syntax
setTimeout(code)
setTimeout(code, delay)

setTimeout(functionRef)
setTimeout(functionRef, delay)
setTimeout(functionRef, delay, param1)
setTimeout(functionRef, delay, param1, param2, /* … ,*/ paramN)

// functionRef - A function to be executed after the timer expires.

// Passing string literals

// Don't do this
setTimeout("console.log('Hello World!');", 500);

// Do this instead
setTimeout(() => {
  console.log('Hello World!');
}, 500);