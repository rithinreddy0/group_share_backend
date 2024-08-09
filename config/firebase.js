var admin = require("firebase-admin");

var serviceAccount = require("./group-share-44520-firebase-adminsdk-4v56f-690fc9b0b0.json");

const firebase = ()=>{
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://group-share-44520.appspot.com"
      });
}
module.exports = firebase;
