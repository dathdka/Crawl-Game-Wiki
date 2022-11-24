const craftingMaterialsHandle = (item, tempMaterails) => {
    tempMaterails.forEach((el) => {
      const obj = {};
      var quantity = parseInt(el.match(/\d+/g));
      obj["name"] = el
        .replace(" x" + quantity, "")
        .replace(" x " + quantity, "")
        .replace("x " + quantity, "")
        .replace(quantity + 'x ', '')
        .replace(quantity + ' x ', '')
        .replace(quantity + ' x', '')
      obj["quantity"] = quantity;
      if (!isNaN(obj.quantity)){
        for(f  of item.craftingMaterials)
          if(f.name === obj.name )
            return;
        item.craftingMaterials.push(obj);
      }else
        return ;
    });
  };
module.exports = craftingMaterialsHandle