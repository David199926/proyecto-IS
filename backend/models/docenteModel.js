const db = require('../models/dbConection');

//obtener todas las categorias
const getUser = async (username) => {
    let result = null;
    const snapshot = await db.collection('docentes').where('usuario', '==', username).get();
    snapshot.forEach((doc) => { result = {...doc.data(), id: doc.id} })
    return result
}

module.exports = {
    getUser,
}