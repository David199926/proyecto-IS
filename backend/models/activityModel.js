const db = require('../models/dbConection');

// subir actividad
const uploadActivity = async (activity) => {
    db.collection('actividades').doc().set(activity)
    .catch(err => {
        throw err;
    })
}
// obtener actividad
const getActivity = async (activityId) => {
    let result = null;
    const snapshot = await db.collection('actividades').where('__name__', '==' ,activityId).get();
    snapshot.forEach((doc) => { result = {...doc.data(), id: doc.id} })
    return result
}
// obtener todas las actividades de un docente
const getUserActivities = async (userId) => {
    let activities = [];
    const snapshot = await db.collection('actividades').where('codigoCreador', '==' , userId).get();
    snapshot.forEach((doc) => {
        activities.push({...doc.data(), id: doc.id}) 
    });
    return activities;
}
// actualiza una actividad existente
const updateActivity = async (activityId, activity) => {
    db.collection('actividades').doc(activityId).set(activity)
    .catch(err => {
        throw err
    })
}

module.exports = {
    uploadActivity,
    getActivity,
    getUserActivities,
    updateActivity,
}