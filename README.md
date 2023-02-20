<h1>A web service crawl data from website "fandom" and provide API to get information of valheim game<h1/>

TABLE OF CONTENT:
<br/>
1. [Tech stack](#tech-stack)
2. [How to install?](#how-to-install)
3. [Primary features](#primary-features)

## Tech stack: <a name="tech-stack"></a>
 - Framework: Express.js
 - Programing language: JavaScript 
 - SQL: MongoDB
 - Other library: Puppeteer, Mongoose, CORS,...

## How to install? <a name="how-to-install"></a>
install:
```
  npm install
```

run:
```
  npm start
```
## Primary features <a name="primary-features"></a>

- Crawl data
```
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
```

- Upload image to firebase storage

```
const getName = (imgLink) =>{
  var arrSplit = imgLink.split('/')
  for(let i =0 ; i< arrSplit.length ; i++)
    if(arrSplit[i].includes('png'||'jpg'||'jpeg'))
      return arrSplit[i];
}

const fetchImage = (imgLink) =>
  new Promise(async (resolve, reject) => {
    await fetch(imgLink).then(async res =>{
      var name = getName(imgLink);
      let createFile = fs.createWriteStream(`public/${name}`)
      res.body.pipe(createFile)
      createFile.on('finish',()=>{
        resolve(name)
      })
    })
  });

const imageHandler = async (imgLink) => {
  try {
    // upload local and remove instantly
    var name = await fetchImage(imgLink)
    const [file] = await firebase.upload(`public/${name}`)
    await file.makePublic()
    let link = file.publicUrl()
    fs.unlinkSync(`public/${name}`)
    return link
  } catch (error) {
    console.log('something went wrong')
    console.error(error);
  }
};
```

- Get all material by item name
```
const getAllMaterials = async (materialName, materialArray, currentClass) => {
  try {
    const material = await items.findOne({ name: materialName }).lean();
    material['class'] = currentClass;
    const length = material.craftingMaterials || ''
    if (length === 0 || length === '') {
      return materialArray.push(material);
    }
    materialArray.push(material);
    for (let tempItem of material.craftingMaterials) {
      await getAllMaterials(tempItem.name, materialArray, currentClass + 1);
    }
  } catch (error) {
    return;
  }
  };
const crafting = async (req, res) => {
  const { itemName } = req.body;
  try {
    const getMainItem = await items.findOne({ name: itemName.toLowerCase() });
    if (getMainItem) {
      var materialArray = [];
      await getAllMaterials(getMainItem.name, materialArray, 0);
      res.status(200).json(materialArray);
    } else {
      res.status(403).send("item not exsist");
    }
  } catch (error) {
    console.error(error);
    res.status(405).send("something went wrong");
  }
};
```
- Get all material CAN be craft by item name:

```
const getAllItemCanBeCraft = async (materialName,itemCanBeCraftArray) =>{
    const parentItems = await items.find({
        "craftingMaterials.name" : materialName
    }).lean()
    if(parentItems.length > 0){
        for(const parentItem of parentItems){
            await getAllItemCanBeCraft(parentItem.name,itemCanBeCraftArray)
        }
    }else{
        return itemCanBeCraftArray.push(materialName)
    }
}

const canCrafting = async (req, res) => {
  const { itemName } = req.body;
  try {
    const material = await items.findOne({
      name: itemName?.toLowerCase(),
    });
    if (material) {
      var itemCanBeCraftArray = [];
      await getAllItemCanBeCraft(material.name, itemCanBeCraftArray);
      const arrayObj = await getInfo(itemCanBeCraftArray)
      res.status(200).json(arrayObj);
    } else res.status(404).send(`material doesn't exsist`);
  } catch (error) {
    console.error(error);
    res.status(405).send("something went wrong");
  }
};
```

- Find item by name:
```
const getItemByName = async (req, res) =>{
    const {itemName} = req.body
    try {
        const item = await items.find({name: itemName?.toLowerCase()})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json(null)
    }
}
```
