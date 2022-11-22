const puppeteer = require("puppeteer");

const startBrowser = async () => {
    let browser
    try {
    browser = await puppeteer.launch({
      // headless: true,
      headless: false,
      ignoreDefaultArgs: ["--disable-extensions"],
      args: [
        "--no-sandbox",
        "--use-gl=egl",
        "--disable-setuid-sandbox",
        "--start-maximized",
      ],
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    });
  } catch (error) {
    console.log(`could not start browser`)
  }
  return browser;
};

module.exports = startBrowser