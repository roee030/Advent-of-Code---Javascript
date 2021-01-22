let string = ` role="dialog" aria-labelledby="pop_1609951152330_title" style="max-width: none;`;
console.log(
  string.split(" ").forEach((e) => {
    if (e.match(`aria-labelledby="pop_\[0-9]+\_title"`)) {
      console.log(e.split('"')[1]);
    }
  })
);
