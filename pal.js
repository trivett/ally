/** @format */

const pa11y = require("pa11y");
const puppeteer = require("puppeteer");

(async () => {
  try {
    const browser = await puppeteer.launch({dumpio: true});
    console.log("we made it this far");
    const page = await browser.newPage();
    console.log('========');
    console.log(page);
    console.log('========');
    await page.setCookie({
      name: "login_id",
      value: "5UsTtWBfF4r8w36tEma-2Q",
      domain: "localhost",
      path: "/account",

      expirationDate: 1661963836,
      hostOnly: false,
      httpOnly: false,
      secure: false,
      session: false,
      sameSite: "no_restriction",
    });

    const config = {
      browser,
      page,
      chromeLaunchConfig: {
        // ignoreHTTPSErrors: true,
        executablePath: "/usr/bin/google-chrome",
      },
      ignore: ["WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail"],
    };

    // console.log("time to try");
    const result = await pa11y(`http://localhost:8000`, config);
    console.log("i got it");
    console.log(result);
    await page.close();
    await browser.close();
  } catch (error) {
    console.log("oops");
    console.error(error.message);
    // console.error(error);
  }
})();
