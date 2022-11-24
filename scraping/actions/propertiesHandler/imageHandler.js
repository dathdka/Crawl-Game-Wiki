const axios = require("axios");

const fetchImage = (imgLink) => new Promise(async (resolve, reject) => {
    let res = await axios.get(imgLink)
    if(res){
        console.log('ok')
        resolve();
    }
    else{
        console.log('not ok')
        resolve();
    }
});

const imageHandler = async (item, imgLink) => {
    await fetchImage(imgLink)
};
module.exports = imageHandler;
