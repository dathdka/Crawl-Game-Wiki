const items = require("../models/items");
const getAllMaterials = require("./shared/getAllMaterials");

const crafting = async (req, res) => {
  const { itemName } = req.body;
  try {
    const getMainItem = await items.findOne({ name: itemName.toLowerCase() });
    if (getMainItem) {
      var materialArray = [];
      await getAllMaterials(getMainItem.name, materialArray, 0);
      res.status(200).json({
        map: materialArray,
      });
    } else {
      res.status(403).send("item not exsist");
    }
  } catch (error) {
    console.error(error);
    res.status(405).send("something went wrong");
  }
};

module.exports = crafting;
