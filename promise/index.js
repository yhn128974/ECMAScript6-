const p = new Promise((resolve, reject) => {
  let xhr = new XMLHttpRequest();
  let httpUrl = "http://localhost:3000/users";
  xhr.open("GET", httpUrl);
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      let data = JSON.parse(xhr.response);

      resolve(data.data);
    } else if (xhr.status == 404) {
      reject(xhr.status);
    }
  };

  xhr.send();
});
p.then(
  (res) => {
    console.log(res);
  },
  (res) => {
    console.log(res);
  }
);
p.catch((err) => {
  console.log(`catch:` + err);
});
p.finally((res) => {
  console.log(`finally`, res);
});

let httpUrl = "http://localhost:3000/users";
fetch(httpUrl).then((res) => {
  let result = res.json();
  result.then((result) => {
    console.log(result);
  });
});
