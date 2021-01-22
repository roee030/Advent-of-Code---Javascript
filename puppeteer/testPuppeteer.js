const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const text = fs.readFileSync(path.resolve(__dirname, "testData.txt"), "utf8");
const arr1 = text.split("\r\n");

(async () => {
  while (arr1.length !== 0) {
    let code = arr1.pop();
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://pizzahut.co.il/");
    await page.click("#home-buttons > div:nth-child(2) > a");
    await page.type("#coupon_flow_field", code);

    let innerPage = await page.evaluate(() => document.body.innerHTML);
    let selector;
    innerPage.split(" ").forEach((e) => {
      if (e.match(`aria-labelledby="pop_\[0-9]+\_title"`)) {
        selector = e.split('"')[1].split("_title")[0];
      }
    });
    console.log(selector);
    await page.click(
      `#${selector} > div > div > div.inner-content > div > div > div `
    );
    await delay(4000);
    try {
      let checkErr = await page.$eval("#alert-popup_title", (e) => e.innerText);
      if (checkErr == "שגיאה") {
        continue;
      }
    } catch (e) {}
    await page.screenshot({
      path: `C:/Users/roeea/OneDrive/Documents/Github/ToLearn/img/${code}.png`,
    });
    await browser.close();
  }
  process.exit();
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
