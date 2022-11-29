const items = require('../models/items')
const info = async (req,res) =>{
    const {itemName} = req.body
    const item = await items.find({
        name : itemName
    })
    if(item)
        res.status(200).json(item)
    else
        res.status(403).send('not found')
}
module.exports = info