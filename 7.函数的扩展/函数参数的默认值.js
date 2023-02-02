// 基本用法
// ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。

// function log(x, y) {
//   y = y || 'World';
//   console.log(x, y);
// }

// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello World
// 上面代码检查函数log()的参数y有没有赋值，如果没有，则指定默认值为World。这种写法的缺点在于，如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用。就像上面代码的最后一行，参数y等于空字符，结果被改为默认值。

// 为了避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。

// if (typeof y === 'undefined') {
//   y = 'World';
// }
// ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

// function log(x, y = 'World') {
//   console.log(x, y);
// }

// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello
// 可以看到，ES6 的写法比 ES5 简洁许多，而且非常自然。下面是另一个例子。

// function Point(x = 0, y = 0) {
//   this.x = x;
//   this.y = y;
// }

// const p = new Point();
// p // { x: 0, y: 0 }
// 除了简洁，ES6 的写法还有两个好处：首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，不用查看函数体或文档；其次，有利于将来的代码优化，即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

// 参数变量是默认声明的，所以不能用let或const再次声明。

// function foo(x = 5) {
//   let x = 1; // error
//   const x = 2; // error
// }
// 上面代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。

// 使用参数默认值时，函数不能有同名参数。

// // 不报错
// function foo(x, x, y) {
//   // ...
// }

// // 报错
// function foo(x, x, y = 1) {
//   // ...
// }
// // SyntaxError: Duplicate parameter name not allowed in this context
// 另外，一个容易忽略的地方是，参数默认值不是传值的，而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

// let x = 99;
// function foo(p = x + 1) {
//   console.log(p);
// }

// foo() // 100

// x = 100;
// foo() // 101
// 上面代码中，参数p的默认值是x + 1。这时，每次调用函数foo()，都会重新计算x + 1，而不是默认p等于 100。

// 应用
// 利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误。

// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }

// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided;
// }

// foo()
// // Error: Missing parameter
// 上面代码的foo函数，如果调用的时候没有参数，就会调用默认值throwIfMissing函数，从而抛出一个错误。

// 从上面代码还可以看到，参数mustBeProvided的默认值等于throwIfMissing函数的运行结果（注意函数名throwIfMissing之后有一对圆括号），这表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。

// 另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

// function foo(optional = undefined) { ··· }
