const items = require("../models/items");

const getItemByName = async (req, res) =>{
    const {itemName} = req.body
    const item = await items.findOne({name: itemName})
    res.status(200).json(item)
}
module.exports = getItemByName