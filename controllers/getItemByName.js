const items = require("../models/items");

const getItemByName = async (req, res) =>{
    const {itemName} = req.body
    try {
        const item = await items.findOne({name: itemName?.toLowerCase()})
        res.status(200).json(item)
    } catch (error) {
        res.status(400).json(null)
    }
}
module.exports = getItemByName