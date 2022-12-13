const items = require('../../models/items')
const getInfo = async ( itemNameArray = []) =>{
    var arrayObj = []
    for(let name of itemNameArray){
        const obj = await items.findOne({name: name});
        arrayObj.push(obj)
    }
    return arrayObj;
}
module.exports = getInfo