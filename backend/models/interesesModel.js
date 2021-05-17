const db = require('../models/dbConection');

// obtener todos los intereses
const getAllInterests = async () => {
    const results = [];
    const snapshot = await db.collection('intereses').get();
    snapshot.forEach((doc) => {
        results.push(doc.data().nombre);
    })
    return results;
}

module.exports = {
    getAllInterests,
}