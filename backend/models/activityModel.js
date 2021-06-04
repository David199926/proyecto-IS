const db = require('../models/dbConection');
const docenteModel = require('../models/docenteModel');

// subir actividad
const uploadActivity = async (activity) => {
    db.collection('actividades').doc().set(activity)
        .catch(err => {
            throw err;
        })
}

// obtener actividad
const getActivity = async (activityId) => {
    const doc = await db.collection('actividades').doc(activityId).get();
    return { ...doc.data(), id: doc.id }
}

// obtener colaboradores de una actividad
const getActivityCollabs = async (activityId) => {
    const response = [];
    const doc = await db.collection('actividades').doc(activityId).get();
    const collabs = doc.data().colaboradores;
    for (id of collabs) {
        const collab = await docenteModel.getUserById(id);
        response.push({
            id: collab.id,
            fullName: collab.nombre + ' ' + collab.apellido,
        });
    }
    return response;
}

// obtener todas las actividades de un docente
const getUserActivities = async (userId) => {
    let activities = [];
    const snapshot = await db.collection('actividades').where('codigoCreador', '==', userId).get();
    snapshot.forEach((doc) => {
        activities.push({ ...doc.data(), id: doc.id })
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
    getActivityCollabs,
    getUserActivities,
    updateActivity,
}