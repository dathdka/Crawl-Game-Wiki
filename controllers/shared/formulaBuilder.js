
const formulaBuilder = (materialArray) =>{
    var string = ''
    for(var item of materialArray){
      var tempString = ''
      tempString = tempString.padStart(item.class*2, ' ') + tempString.padEnd(item.class, ' ') + '|__' + item.name + '\n';
      string+= tempString
    }
    return string;
}

module.exports = formulaBuilder