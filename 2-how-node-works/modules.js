// module.exports
const Calculator = require('./test-module-1');
const calc1 = new Calculator();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./test-module-2');
const { add, multiply, divide } = require('./test-module-2');
console.log(add(2, 5));
console.log(multiply(2, 5));
console.log(divide(2, 5));

// caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();
