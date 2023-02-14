// async function f() {
//   // 等同于
//   // return 123;
//   return await 123;
// }

// f().then((v) => console.log(v));

// let fnpromise1 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let info = `sorry I am late `;
//       resolve(info);
//     }, 5000);
//   });
// };

// let fnpromise2 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let info = `hi I am coming early `;
//       resolve(info);
//     }, 1000);
//   });
// };

// let fnpromise3 = function () {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       let info = `erroy:someing thing was wrong`;
//       reject(info);
//     }, 3000);
//   });
// };

// async function demo() {
//   try {
//     let result1 = await fnpromise1();
//     let result2 = await fnpromise2();
//     let result3 = await fnpromise3();

//     console.log(result1);
//     console.log(result2);
//     console.log(result3);
//   } catch (err) {
//     console.log(err);
//   }
// }
// demo();

// console.log('wo ');



let httpUrl = "http://localhost:3000/users";

async function getinfo(httpUrl) {

  let data = await fetch(httpUrl)
  data.then((res) => {
    let result = res.json();
    result.then((result) => {
      console.log(result);
    });
  });

}