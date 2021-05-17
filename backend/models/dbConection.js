const admin = require('firebase-admin');

const databaseURL = 'https://actividades-prueba-default-rtdb.firebaseio.com/';
const serviceAccount = require("./actividades-prueba-firebase-adminsdk-vw648-bdc4b4cc59.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL,
});

module.exports = admin.firestore();