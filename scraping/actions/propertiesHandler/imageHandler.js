const axios = require("axios");
const firebase = require("../../../firebase");
const fetchImage = (imgLink) =>
  new Promise(async (resolve, reject) => {
    await axios
      .get(imgLink)
      .then((res) => {
        if (res?.data) resolve(res.data);
        else resolve(null);
      })
      .catch((err) => {
        console.error(err);
      });
  });

const imageHandler = async (item, imgLink) => {
  try {
    var img = await fetchImage(imgLink);
    firebase.file(new Date())
    await firebase.upload('test/hello.txt')
    console.log(await firebase.getFiles())
    // firebase.upload(new Date(),blobFile)
  } catch (error) {
    console.error(error);
  }
};
module.exports = imageHandler;
