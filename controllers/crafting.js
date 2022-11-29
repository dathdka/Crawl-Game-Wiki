const items = require("../models/items");
const getAllMaterials = require('./shared/getAllMaterials')

const crafting = async (req, res) => {
    const {itemName} = req.body 
    const getMainItem = await items.findOne({ name: itemName.toLowerCase() });
  if (getMainItem) {
    var materialArray = [];
    await getAllMaterials(getMainItem.name, materialArray,0);
    res.status(200).json({
      map : materialArray
    })
  } else {
    res.status(403).send("item not exsist");
  }
};

module.exports = crafting;
