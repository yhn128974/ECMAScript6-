// Object.keys()，Object.values()，Object.entries()
// Object.keys()
// ES5 引入了Object.keys方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

// var obj = { foo: 'bar', baz: 42 };
// Object.keys(obj)
// // ["foo", "baz"]
// ES2017 引入了跟Object.keys配套的Object.values和Object.entries，作为遍历一个对象的补充手段，供for...of循环使用。

// let {keys, values, entries} = Object;
// let obj = { a: 1, b: 2, c: 3 };

// for (let key of keys(obj)) {
//   console.log(key); // 'a', 'b', 'c'
// }

// for (let value of values(obj)) {
//   console.log(value); // 1, 2, 3
// }

// for (let [key, value] of entries(obj)) {
//   console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
// }
// Object.values()
// Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

// const obj = { foo: 'bar', baz: 42 };
// Object.values(obj)
// // ["bar", 42]
// 返回数组的成员顺序，与本章的《属性的遍历》部分介绍的排列规则一致。

// const obj = { 100: 'a', 2: 'b', 7: 'c' };
// Object.values(obj)
// // ["b", "c", "a"]
// 上面代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。

// Object.values只返回对象自身的可遍历属性。

// const obj = Object.create({}, {p: {value: 42}});
// Object.values(obj) // []
// 上面代码中，Object.create方法的第二个参数添加的对象属性（属性p），如果不显式声明，默认是不可遍历的，因为p的属性描述对象的enumerable默认是false，Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

// const obj = Object.create({}, {p:
//   {
//     value: 42,
//     enumerable: true
//   }
// });
// Object.values(obj) // [42]
// Object.values会过滤属性名为 Symbol 值的属性。

// Object.values({ [Symbol()]: 123, foo: 'abc' });
// // ['abc']
// 如果Object.values方法的参数是一个字符串，会返回各个字符组成的一个数组。

// Object.values('foo')
// // ['f', 'o', 'o']
// 上面代码中，字符串会先转成一个类似数组的对象。字符串的每个字符，就是该对象的一个属性。因此，Object.values返回每个属性的键值，就是各个字符组成的一个数组。

// 如果参数不是对象，Object.values会先将其转为对象。由于数值和布尔值的包装对象，都不会为实例添加非继承的属性。所以，Object.values会返回空数组。

// Object.values(42) // []
// Object.values(true) // []
// Object.entries()
// Object.entries()方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

// const obj = { foo: 'bar', baz: 42 };
// Object.entries(obj)
// // [ ["foo", "bar"], ["baz", 42] ]
// 除了返回值不一样，该方法的行为与Object.values基本一致。

// 如果原对象的属性名是一个 Symbol 值，该属性会被忽略。

// Object.entries({ [Symbol()]: 123, foo: 'abc' });
// // [ [ 'foo', 'abc' ] ]
// 上面代码中，原对象有两个属性，Object.entries只输出属性名非 Symbol 值的属性。将来可能会有Reflect.ownEntries()方法，返回对象自身的所有属性。

// Object.entries的基本用途是遍历对象的属性。

// let obj = { one: 1, two: 2 };
// for (let [k, v] of Object.entries(obj)) {
//   console.log(
//     `${JSON.stringify(k)}: ${JSON.stringify(v)}`
//   );
// }
// // "one": 1
// // "two": 2
// Object.entries方法的另一个用处是，将对象转为真正的Map结构。

// const obj = { foo: 'bar', baz: 42 };
// const map = new Map(Object.entries(obj));
// map // Map { foo: "bar", baz: 42 }
// 自己实现Object.entries方法，非常简单。

// // Generator函数的版本
// function* entries(obj) {
//   for (let key of Object.keys(obj)) {
//     yield [key, obj[key]];
//   }
// }

// // 非Generator函数的版本
// function entries(obj) {
//   let arr = [];
//   for (let key of Object.keys(obj)) {
//     arr.push([key, obj[key]]);
//   }
//   return arr;
// }
// Object.fromEntries()
// Object.fromEntries()方法是Object.entries()的逆操作，用于将一个键值对数组转为对象。

// Object.fromEntries([
//   ['foo', 'bar'],
//   ['baz', 42]
// ])
// // { foo: "bar", baz: 42 }
// 该方法的主要目的，是将键值对的数据结构还原为对象，因此特别适合将 Map 结构转为对象。

// // 例一
// const entries = new Map([
//   ['foo', 'bar'],
//   ['baz', 42]
// ]);

// Object.fromEntries(entries)
// // { foo: "bar", baz: 42 }

// // 例二
// const map = new Map().set('foo', true).set('bar', false);
// Object.fromEntries(map)
// // { foo: true, bar: false }
// 该方法的一个用处是配合URLSearchParams对象，将查询字符串转为对象。

// Object.fromEntries(new URLSearchParams('foo=bar&baz=qux'))
// // { foo: "bar", baz: "qux" }
// Object.hasOwn()
// JavaScript 对象的属性分成两种：自身的属性和继承的属性。对象实例有一个hasOwnProperty()方法，可以判断某个属性是否为原生属性。ES2022 在Object对象上面新增了一个静态方法Object.hasOwn()，也可以判断是否为自身的属性。

// Object.hasOwn()可以接受两个参数，第一个是所要判断的对象，第二个是属性名。

// const foo = Object.create({ a: 123 });
// foo.b = 456;

// Object.hasOwn(foo, 'a') // false
// Object.hasOwn(foo, 'b') // true
// 上面示例中，对象foo的属性a是继承属性，属性b是原生属性。Object.hasOwn()对属性a返回false，对属性b返回true。

// Object.hasOwn()的一个好处是，对于不继承Object.prototype的对象不会报错，而hasOwnProperty()是会报错的。

// const obj = Object.create(null);

// obj.hasOwnProperty('foo') // 报错
// Object.hasOwn(obj, 'foo') // false
// 上面示例中，Object.create(null)返回的对象obj是没有原型的，不继承任何属性，这导致调用obj.hasOwnProperty()会报错，但是Object.hasOwn()就能正确处理这种情况。
