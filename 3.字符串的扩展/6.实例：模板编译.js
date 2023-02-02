// 实例：模板编译
// 下面，我们来看一个通过模板字符串，生成正式模板的实例。

// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;
// 上面代码在模板字符串之中，放置了一个常规模板。该模板使用<%...%>放置 JavaScript 代码，使用<%= ... %>输出 JavaScript 表达式。

// 怎么编译这个模板字符串呢？

// 一种思路是将其转换为 JavaScript 表达式字符串。

// echo('<ul>');
// for(let i=0; i < data.supplies.length; i++) {
//   echo('<li>');
//   echo(data.supplies[i]);
//   echo('</li>');
// };
// echo('</ul>');
// 这个转换使用正则表达式就行了。

// let evalExpr = /<%=(.+?)%>/g;
// let expr = /<%([\s\S]+?)%>/g;

// template = template
//   .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//   .replace(expr, '`); \n $1 \n  echo(`');

// template = 'echo(`' + template + '`);';
// 然后，将template封装在一个函数里面返回，就可以了。

// let script =
// `(function parse(data){
//   let output = "";

//   function echo(html){
//     output += html;
//   }

//   ${ template }

//   return output;
// })`;

// return script;
// 将上面的内容拼装成一个模板编译函数compile。

// function compile(template){
//   const evalExpr = /<%=(.+?)%>/g;
//   const expr = /<%([\s\S]+?)%>/g;

//   template = template
//     .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
//     .replace(expr, '`); \n $1 \n  echo(`');

//   template = 'echo(`' + template + '`);';

//   let script =
//   `(function parse(data){
//     let output = "";

//     function echo(html){
//       output += html;
//     }

//     ${ template }

//     return output;
//   })`;

//   return script;
// }
// compile函数的用法如下。

// let parse = eval(compile(template));
// div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });
// //   <ul>
// //     <li>broom</li>
// //     <li>mop</li>
// //     <li>cleaner</li>
// //   </ul>
