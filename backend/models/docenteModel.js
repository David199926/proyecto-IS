const db = require('../models/dbConection');

// obtener a un usuario por username
const getUser = async (username) => {
    let result = null;
    const snapshot = await db.collection('docentes').where('usuario', '==', username).get();
    snapshot.forEach((doc) => { result = { ...doc.data(), id: doc.id } });
    return result;
}
// obtener un usuario por id
const getUserById = async (userId) => {
    let result = null;
    const snapshot = await db.collection('docentes').where('__name__', '==', userId).get();
    snapshot.forEach((doc) => { result = { ...doc.data(), id: doc.id } });
    return result;
}
// obtener todas las actividades en las que colabora un docente
const getUserCollabs = async (userId) => {
    const collabs = [];
    const snapshot = await db.collection('actividades').where('colaboradores', 'array-contains', userId).get();
    snapshot.forEach((doc) => {
        collabs.push({ ...doc.data(), id: doc.id });
    });
    return collabs;
}
// actualizar al usuario
const updateUser = async (user) => {
    db.collection('docentes').doc(user.id).set(user)
        .catch(err => {
            throw err
        })
}
// obtener todos los usuarios (excepto el que hace la solicitud)
const getOthers = async (userId) => {
    let result = [];
    const snapshot = await db.collection('docentes').where('__name__', '!=', userId).get();
    snapshot.forEach((doc) => {
        result.push({
            id: doc.id,
            fullName: doc.data().nombre + ' ' + doc.data().apellido,
            interests: doc.data().intereses,
        });
    });
    return result;
}

module.exports = {
    getUser,
    getUserById,
    getUserCollabs,
    updateUser,
    getOthers
}