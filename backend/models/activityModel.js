const db = require('../models/dbConection');

// obtener todos los intereses
const uploadActivity = async (activity) => {
    db.collection('actividades').doc().set(activity)
    .catch(err => {
        throw err;
    })
}

module.exports = {
    uploadActivity,
}