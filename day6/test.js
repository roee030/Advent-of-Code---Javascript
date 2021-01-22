const { group } = require("console");
const fs = require("fs");

const groups = fs
  .readFileSync("./day06.txt", { encoding: "utf-8" })
  .split("\r\n");
let result = 0;
let set = new Set();
groups.forEach((e, i, arr) => {
  if (e == "") {
    console.log("clear:", set.size);
    result += set.size;
    set.clear();
  } else {
    console.log(e.split(""));
    e.split("").forEach(set.add, set);
    console.log("set:", set);
    if (i == arr.length - 1) {
      console.log("clear:", set.size);
      result += set.size;
      set.clear();
    }
  }
});
console.log(result);
