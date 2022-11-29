const items = require('../../models/items')

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

module.exports = getAllItemCanBeCraft