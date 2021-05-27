const db = require('../models/dbConection');

// obtener todos los intereses
const uploadActivity = async (activity) => {
    db.collection('actividades').doc().set(activity)
    .catch(err => {
        throw err;
    })
}

const getActivity = async (activityId) => {
    let result = null;
    const snapshot = await db.collection('actividades').where('__name__', '==' ,activityId).get();
    snapshot.forEach((doc) => { result = {...doc.data(), id: doc.id} })
    return result
}

module.exports = {
    uploadActivity,
    getActivity
}