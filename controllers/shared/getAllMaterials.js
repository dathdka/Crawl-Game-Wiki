const items = require('../../models/items')

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
module.exports = getAllMaterials