const items = require("../models/items");
const formulaBuilder = require('./shared/formulaBuilder')
const getAllMaterials = require('./shared/getAllMaterials')
const getItemById = async (req, res) => {
  const { id } = req.body;
  const item = await items.findById(id).lean();  
  var materialArray = [];
  await getAllMaterials(item.name, materialArray, 0);
  item['formula'] = formulaBuilder(materialArray);
  console.log(item.formula)
  res.status(200).json(item);
};
module.exports = getItemById;
