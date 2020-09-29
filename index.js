let url="https://chat.whatsapp.com/"
let selector="h2"
let numberOfCycles=50
let length=22
const fs = require("fs");
let chars="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const puppeteer = require("puppeteer");
let foundGroups=""
	function randomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

function randomElement(a) {
return a[randomInt(0,a.length-1)]
}
async function newGroup(name,groupHash) {
await fs.appendFileSync("groups.txt",`${name}: ${url}${groupHash}\r\n`)
}
async function main() {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    let page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );
    page.on("console", msg => {
      for (let i = 0; i < msg.args.length; ++i)
        console.log(`${i}: ${msg.args[i]}`);
    });
let counter=0
while (counter<numberOfCycles) {
let construct=""
for (let i=1;i<=length;i++) {
construct+=randomElement(chars)
}
counter++;
console.log("going to group...")
await page.goto(url+construct)
console.log("done")
if (await page.$(selector) !== null) {

    const element = await page.$(selector);
    const text = await page.evaluate(element => element.textContent, element);
//As much as you try to hide the fact that there is no group under this link to prevent crawling, I can still stt it...
if (text!="") {
console.log("found!")
console.log(text)
newGroup(text,construct)
}
} else { 
console.log("not found")
continue }
}
}
main()