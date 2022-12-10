const items = require('../models/items')
const getAllItem = async (req,res) =>{
    var itemList
    try{
        itemList = await items.find();
    }catch(err){
        console.error(err)
        res.status(204).send('something went wrong')
    }
    res.status(200).json({
        map : itemList
    })
}

module.exports = getAllItem