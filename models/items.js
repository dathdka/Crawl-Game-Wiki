const mongoose = require('mongoose')

const schema = mongoose.Schema

const itemsSchema = new schema({
    name : {type: String},
    type : {type : String},
    droppedBy : {type: String},
    useage : {type : String},
    image : {type : String},
    craftingMaterials :  { type : Array , "default" : [] }
})

module.exports = mongoose.model('items', itemsSchema)