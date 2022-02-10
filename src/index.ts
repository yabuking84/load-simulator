import url from "./request"

let count = 0
setInterval(() => {
  console.log(url);
  console.log(count)
  count++
}, 2000)
