const axios = require("axios");
const firebase = require("../../../firebase");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs')
const fetchImage = (imgLink) =>
  new Promise(async (resolve, reject) => {
    await fetch(imgLink).then(res =>{
      res.body.pipe(fs.createWriteStream('public/image/test.jpg'))
      resolve();
    })
  });

const imageHandler = async (item, imgLink) => {
  try {
    var img = await fetchImage(imgLink);
    // upload local
    // await firebase.upload('test/hello.txt')
    console.log((await firebase.getFiles()).length)
  } catch (error) {
    console.error(error);
  }
};
module.exports = imageHandler;
