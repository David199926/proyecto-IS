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

//obtener todas las categorias y tipos
const getAllCategoriesAndTypes = async () => {
    const results = [];

    const catRef = db.collection('categorias');
    
    snapshot.forEach((doc)=>{
        doc.collection('tipos').get()
        .then((snapshot) => {
            results.push({...doc.data(), id: doc.id, tipos: snapshot});
        })
        
    })
    return results;
}

module.exports = {
    getAllCategories,
    getAllCategoriesAndTypes
}