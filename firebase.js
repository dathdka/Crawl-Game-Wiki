

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "game-wiki-26686.appspot.com",
});


const bucket = admin.storage().bucket()
module.exports = bucket;