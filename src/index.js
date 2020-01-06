// console.log('1234')
// import axios from "axios"
// axios.get("/api/info").then(res => {
//   console.log(res)
// })

import counter from './a';
import number from "./b"

// import "./css/index.css";
// var btn = document.createElement("button");
// btn.innerHTML = "新增";
// document.body.appendChild(btn);

// btn.onclick = function () {
//   var div = document.createElement("div");
//   console.log("1");
//   div.innerHTML = "item111";
//   document.body.appendChild(div)
// }

counter();
number();
if (module.hot) {
  module.hot.accept("./b", function () {
    document.body.removeChild(document.getElementById("number"));
    number();
  })
}