const items = require('../models/items')
const startBrowser = require('./browser')
const scrapEachProperty = require('./actions/scrapEachProperty')
const crawItem = async () =>{
    let browser = await startBrowser()
    const url = "https://valheim.fandom.com/wiki/Items_List";
    let page = (await browser.pages())[0];
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
    await page.goto(url,{ waitUntil: "load", timeout: 0 });
    await page.waitForSelector("main");
    const ItemsSrc = await page.$$eval(
      "#mw-content-text > div > ul > li > a",
      (items) => {
        items.pop();
        return items.map((el) => el.href);
      }
    );
    ItemsSrc.push('https://valheim.fandom.com/wiki/Silver')
    ItemsSrc.push('https://valheim.fandom.com/wiki/Silver_ore')
    ItemsSrc.push('https://valheim.fandom.com/wiki/Wolf_pelt')
    ItemsSrc.push('https://valheim.fandom.com/wiki/Drake_trophy')
    try {
      for (const item of ItemsSrc) {
        const obj = await scrapEachProperty(item, page);
        console.log(obj)
        const checkExists = await items.findOne({
          name: obj.name
        });
        if (checkExists) {
          checkExists.image = obj.image
          checkExists.type = obj.type;
          checkExists.droppedBy = obj.droppedBy;
          checkExists.useage = obj.useage;
          checkExists.craftingMaterials = obj.craftingMaterials;
          await checkExists.save();
          console.log('update')
        } else{
          const objCreated = await items.create({
            name: obj.name,
            type: obj.type,
            droppedBy: obj.droppedBy,
            useage: obj.useage,
            image: obj.image,
            craftingMaterials: obj.craftingMaterials
          });
          console.log('created')
        }
      }
      console.log('succeeded')
    } catch (error) {
      console.error(error)
    } finally {
      await browser.close()
    }
}

module.exports = crawItem