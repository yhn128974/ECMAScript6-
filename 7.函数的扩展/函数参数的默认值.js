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

// 与解构赋值默认值结合使用
// 参数默认值可以与解构赋值的默认值，结合起来使用。

// function foo({x, y = 5}) {
//   console.log(x, y);
// }

// foo({}) // undefined 5
// foo({x: 1}) // 1 5
// foo({x: 1, y: 2}) // 1 2
// foo() // TypeError: Cannot read property 'x' of undefined
// 上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。只有当函数foo()的参数是一个对象时，变量x和y才会通过解构赋值生成。如果函数foo()调用时没提供参数，变量x和y就不会生成，从而报错。通过提供函数参数的默认值，就可以避免这种情况。

// function foo({x, y = 5} = {}) {
//   console.log(x, y);
// }

// foo() // undefined 5
// 上面代码指定，如果没有提供参数，函数foo的参数默认为一个空对象。

// 下面是另一个解构赋值默认值的例子。

// function fetch(url, { body = '', method = 'GET', headers = {} }) {
//   console.log(method);
// }

// fetch('http://example.com', {})
// // "GET"

// fetch('http://example.com')
// // 报错
// 上面代码中，如果函数fetch()的第二个参数是一个对象，就可以为它的三个属性设置默认值。这种写法不能省略第二个参数，如果结合函数参数的默认值，就可以省略第二个参数。这时，就出现了双重默认值。

// function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
//   console.log(method);
// }

// fetch('http://example.com')
// // "GET"
// 上面代码中，函数fetch没有第二个参数时，函数参数的默认值就会生效，然后才是解构赋值的默认值生效，变量method才会取到默认值GET。

// 注意，函数参数的默认值生效以后，参数解构赋值依然会进行。

// function f({ a, b = 'world' } = { a: 'hello' }) {
//   console.log(b);
// }

// f() // world
// 上面示例中，函数f()调用时没有参数，所以参数默认值{ a: 'hello' }生效，然后再对这个默认值进行解构赋值，从而触发参数变量b的默认值生效。

// 作为练习，大家可以思考一下，下面两种函数写法有什么差别？

// // 写法一
// function m1({x = 0, y = 0} = {}) {
//   return [x, y];
// }

// // 写法二
// function m2({x, y} = { x: 0, y: 0 }) {
//   return [x, y];
// }

// // 函数没有参数的情况
// m1() // [0, 0]
// m2() // [0, 0]

// // x 和 y 都有值的情况
// m1({x: 3, y: 8}) // [3, 8]
// m2({x: 3, y: 8}) // [3, 8]

// // x 有值，y 无值的情况
// m1({x: 3}) // [3, 0]
// m2({x: 3}) // [3, undefined]

// // x 和 y 都无值的情况
// m1({}) // [0, 0];
// m2({}) // [undefined, undefined]

// m1({z: 3}) // [0, 0]
// m2({z: 3}) // [undefined, undefined]

// 参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

// // 例一
// function f(x = 1, y) {
//   return [x, y];
// }

// f() // [1, undefined]
// f(2) // [2, undefined]
// f(, 1) // 报错
// f(undefined, 1) // [1, 1]

// // 例二
// function f(x, y = 5, z) {
//   return [x, y, z];
// }

// f() // [undefined, 5, undefined]
// f(1) // [1, 5, undefined]
// f(1, ,2) // 报错
// f(1, undefined, 2) // [1, 5, 2]
// 上面代码中，有默认值的参数都不是尾参数。这时，无法只省略该参数，而不省略它后面的参数，除非显式输入undefined。

// 如果传入undefined，将触发该参数等于默认值，null则没有这个效果。

// function foo(x = 5, y = 6) {
//   console.log(x, y);
// }

// foo(undefined, null)
// // 5 null
// 上面代码中，x参数对应undefined，结果触发了默认值，y参数等于null，就没有触发默认值。

// 作用域 § ⇧
// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

// var x = 1;

// function f(x, y = x) {
//   console.log(y);
// }

// f(2) // 2
// 上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

// 再看下面的例子。

// let x = 1;

// function f(y = x) {
//   let x = 2;
//   console.log(y);
// }

// f() // 1
// 上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

// 如果此时，全局变量x不存在，就会报错。

// function f(y = x) {
//   let x = 2;
//   console.log(y);
// }

// f() // ReferenceError: x is not defined
// 下面这样写，也会报错。

// var x = 1;

// function foo(x = x) {
//   // ...
// }

// foo() // ReferenceError: Cannot access 'x' before initialization
// 上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错。

// 如果参数的默认值是一个函数，该函数的作用域也遵守这个规则。请看下面的例子。

// let foo = 'outer';

// function bar(func = () => foo) {
//   let foo = 'inner';
//   console.log(func());
// }

// bar(); // outer
// 上面代码中，函数bar的参数func的默认值是一个匿名函数，返回值为变量foo。函数参数形成的单独作用域里面，并没有定义变量foo，所以foo指向外层的全局变量foo，因此输出outer。

// 如果写成下面这样，就会报错。

// function bar(func = () => foo) {
//   let foo = 'inner';
//   console.log(func());
// }

// bar() // ReferenceError: foo is not defined
// 上面代码中，匿名函数里面的foo指向函数外层，但是函数外层并没有声明变量foo，所以就报错了。

// 下面是一个更复杂的例子。

// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//   var x = 3;
//   y();
//   console.log(x);
// }

// foo() // 3
// x // 1
// 上面代码中，函数foo的参数形成一个单独作用域。这个作用域里面，首先声明了变量x，然后声明了变量y，y的默认值是一个匿名函数。这个匿名函数内部的变量x，指向同一个作用域的第一个参数x。函数foo内部又声明了一个内部变量x，该变量与第一个参数x由于不是同一个作用域，所以不是同一个变量，因此执行y后，内部变量x和外部全局变量x的值都没变。

// 如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。

// var x = 1;
// function foo(x, y = function() { x = 2; }) {
//   x = 3;
//   y();
//   console.log(x);
// }

// foo() // 2
// x // 1

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

// rest 参数
// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

// function add(...values) {
//   let sum = 0;

//   for (var val of values) {
//     sum += val;
//   }

//   return sum;
// }

// add(2, 5, 3) // 10
// 上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

// 下面是一个 rest 参数代替arguments变量的例子。

// // arguments变量的写法
// function sortNumbers() {
//   return Array.from(arguments).sort();
// }

// // rest参数的写法
// const sortNumbers = (...numbers) => numbers.sort();
// 上面代码的两种写法，比较后可以发现，rest 参数的写法更自然也更简洁。

// arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.from先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。

// function push(array, ...items) {
//   items.forEach(function(item) {
//     array.push(item);
//     console.log(item);
//   });
// }

// var a = [];
// push(a, 1, 2, 3)
// 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

// // 报错
// function f(a, ...b, c) {
//   // ...
// }
// 函数的length属性，不包括 rest 参数。

// (function(a) {}).length  // 1
// (function(...a) {}).length  // 0
// (function(a, ...b) {}).length  // 1

// 严格模式
// 从 ES5 开始，函数内部可以设定为严格模式。

// function doSomething(a, b) {
//   'use strict';
//   // code
// }
// ES2016 做了一点修改，规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。

// // 报错
// function doSomething(a, b = a) {
//   'use strict';
//   // code
// }

// // 报错
// const doSomething = function ({a, b}) {
//   'use strict';
//   // code
// };

// // 报错
// const doSomething = (...a) => {
//   'use strict';
//   // code
// };

// const obj = {
//   // 报错
//   doSomething({a, b}) {
//     'use strict';
//     // code
//   }
// };
// 这样规定的原因是，函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。

// // 报错
// function doSomething(value = 070) {
//   'use strict';
//   return value;
// }
// 上面代码中，参数value的默认值是八进制数070，但是严格模式下不能用前缀0表示八进制，所以应该报错。但是实际上，JavaScript 引擎会先成功执行value = 070，然后进入函数体内部，发现需要用严格模式执行，这时才会报错。

// 虽然可以先解析函数体代码，再执行参数代码，但是这样无疑就增加了复杂性。因此，标准索性禁止了这种用法，只要参数使用了默认值、解构赋值、或者扩展运算符，就不能显式指定严格模式。

// 两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

// 'use strict';

// function doSomething(a, b = a) {
//   // code
// }
// 第二种是把函数包在一个无参数的立即执行函数里面。

// const doSomething = (function () {
//   'use strict';
//   return function(value = 42) {
//     return value;
//   };
// }());
