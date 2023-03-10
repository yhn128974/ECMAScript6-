// 圆括号问题
// 解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

// 由此带来的问题是，如果模式中出现圆括号怎么处理。ES6 的规则是，只要有可能导致解构的歧义，就不得使用圆括号。

// 但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。因此，建议只要有可能，就不要在模式中放置圆括号。

// 不能使用圆括号的情况
// 以下三种解构赋值不得使用圆括号。

// （1）变量声明语句

// // 全部报错
// let [(a)] = [1];

// let {x: (c)} = {};
// let ({x: c}) = {};
// let {(x: c)} = {};
// let {(x): c} = {};

// let { o: ({ p: p }) } = { o: { p: 2 } };
// 上面 6 个语句都会报错，因为它们都是变量声明语句，模式不能使用圆括号。

// （2）函数参数

// 函数参数也属于变量声明，因此不能带有圆括号。

// // 报错
// function f([(z)]) { return z; }
// // 报错
// function f([z,(x)]) { return x; }
// （3）赋值语句的模式

// // 全部报错
// ({ p: a }) = { p: 42 };
// ([a]) = [5];
// 上面代码将整个模式放在圆括号之中，导致报错。

// // 报错
// [({ p: a }), { x: c }] = [{}, {}];
// 上面代码将一部分模式放在圆括号之中，导致报错。

// 可以使用圆括号的情况
// 可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

// [(b)] = [3]; // 正确
// ({ p: (d) } = {}); // 正确
// [(parseInt.prop)] = [3]; // 正确
// 上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。
