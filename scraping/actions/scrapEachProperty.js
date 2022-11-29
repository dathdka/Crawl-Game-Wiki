const craftingMaterialsHandle = require("./propertiesHandler/craftingMaterials");
const imageHandler = require("./propertiesHandler/imageHandler");

const scrapEachProperty = (url, page) =>
  new Promise(async (resolve, reject) => {
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    await page.waitForSelector(
      "body > div.main-container > div.resizable-container > div.page.has-right-rail > main"
    );
    var item = {};
    try {
      await page.waitForSelector('figure > a > img')
      var imgLink = await page.$eval("figure > a > img", (item) => item.src);

      item['image'] = await imageHandler( imgLink);
      
      const canContinue = await page.$("#mw-content-text > div > aside");
      const rawData = await page.$eval(
        "#mw-content-text > div > aside",
        (item) => {
          return item.textContent
            .replaceAll("\n", "")
            .toLowerCase()
            .split("\t")
            .filter((el) => el !== "");
        }
      );
      // console.log(rawData);
      item["name"] = rawData[0];
      item["type"] = rawData.includes("type")
        ? rawData[rawData.indexOf("type") + 1]
        : "";
      item["droppedBy"] = rawData.includes("dropped by")
        ? rawData[rawData.indexOf("dropped by") + 1]
        : "";
      item["usage"] = rawData.includes("usage")
        ? rawData[rawData.indexOf("usage") + 1]
        : "";

      var tempMaterails = await page.$$eval(
        ".pi-data-value > ul > li",
        async (item) => {
          const parent =
            await item[0].parentElement.parentElement.parentElement.querySelector(
              "h3"
            );
          if (parent.textContent.toLowerCase() === "crafting materials")
            return item.map((el) => el.textContent.toLowerCase());
          else return [];
        }
      );
      item["craftingMaterials"] = [];
      if (tempMaterails.length > 0) {
        craftingMaterialsHandle(item, tempMaterails);
      }
      resolve(item);
    } catch (error) {
      resolve(item);
    }
  });
module.exports = scrapEachProperty;
