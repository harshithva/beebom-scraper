const puppeteer = require("puppeteer");
const credentials = require("./credentials");

const BASE_URL = "https://talzap.com/wp-admin/post-new.php";
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    BASE_URL,
    { waitUntil: "networkidle2" },
  );
  //   await page.screenshot({ path: "screen.jpg" });
  //   await page.waitFor(4000);
  await page.waitFor(() => document.querySelectorAll("input").length);

  await page.type("[name=log]", credentials.user);
  await page.type("[name=pwd]", credentials.password);
  //   click login
  await page.keyboard.press("Enter");
  //   await browser.close();
})();
