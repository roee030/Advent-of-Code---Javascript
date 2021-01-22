const fs = require("fs");

const rows = fs.readFileSync("./input.txt", "utf8").split("\n");
const test = fs.readFileSync("./test.txt", "utf8").split("\n");

function getSeatID(rawRow) {
  const rowMoves = rawRow.slice(0, 7);
  const seatMoves = rawRow.slice(7, 10);
  let x = 0;
  for (let i = 0; i < rowMoves.length; i += 1) {
    if (rowMoves[i] === "B") {
      x += 2 ** (rowMoves.length - i - 1);
    }
  }

  let y = 0;
  for (let i = 0; i < seatMoves.length; i += 1) {
    if (seatMoves[i] === "R") {
      y += 2 ** (seatMoves.length - i - 1);
    }
  }
  return x * 8 + y;
}

let max = -1;

rows.forEach((row) => {
  const sid = getSeatID(row);
  // console.log(sid);
  if (sid > max) {
    max = sid;
  }
});
// const sid = getSeatID("BFFFBBFRRR");
console.log(max);
