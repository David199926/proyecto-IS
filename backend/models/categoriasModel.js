const db = require('../models/dbConection');

//obtener todas las categorias
const getAllCategories = async () => {
    const results = [];
    const snapshot = await db.collection('categorias').get();
    snapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
    })
    return results;
}

module.exports = {
    getAllCategories,
}