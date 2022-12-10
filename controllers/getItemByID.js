const items = require('../models/items')
const getItemById = async (req,res) => {
    const {id} = req.body
    const item = await items.findById(id)
    res.status(200).json({
        map : item
    })
}
module.exports = getItemById