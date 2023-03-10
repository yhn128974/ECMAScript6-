// JSON.stringify() 的改造
// 根据标准，JSON 数据必须是 UTF-8 编码。但是，现在的JSON.stringify()方法有可能返回不符合 UTF-8 标准的字符串。

// 具体来说，UTF-8 标准规定，0xD800到0xDFFF之间的码点，不能单独使用，必须配对使用。比如，\uD834\uDF06是两个码点，但是必须放在一起配对使用，代表字符𝌆。这是为了表示码点大于0xFFFF的字符的一种变通方法。单独使用\uD834和\uDF06这两个码点是不合法的，或者颠倒顺序也不行，因为\uDF06\uD834并没有对应的字符。

// JSON.stringify()的问题在于，它可能返回0xD800到0xDFFF之间的单个码点。

// JSON.stringify('\u{D834}') // "\u{D834}"
// 为了确保返回的是合法的 UTF-8 字符，ES2019 改变了JSON.stringify()的行为。如果遇到0xD800到0xDFFF之间的单个码点，或者不存在的配对形式，它会返回转义字符串，留给应用自己决定下一步的处理。

// JSON.stringify('\u{D834}') // ""\\uD834""
// JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""
