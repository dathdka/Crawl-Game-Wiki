const firebase = require("../../../firebase");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');

const getName = (imgLink) =>{
  var arrSplit = imgLink.split('/')
  for(let i =0 ; i< arrSplit.length ; i++)
    if(arrSplit[i].includes('png'||'jpg'||'jpeg'))
      return arrSplit[i];
}

const fetchImage = (imgLink) =>
  new Promise(async (resolve, reject) => {
    await fetch(imgLink).then(async res =>{
      //TODO: save file by name
      var name = getName(imgLink);
      let createFile = fs.createWriteStream(`public/${name}`)
      res.body.pipe(createFile)
      createFile.on('finish',()=>{
        resolve(name)
      })
    })
  });

const imageHandler = async (imgLink) => {
  try {
    // upload local and remove instantly
    var name = await fetchImage(imgLink)
    await firebase.upload(`public/${name}`)
    fs.unlinkSync(`public/${name}`)
    return name
  } catch (error) {
    console.log('something went wrong')
    console.error(error);
  }
};
module.exports = imageHandler;
