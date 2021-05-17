const categoriasModel = require('../models/categoriasModel');
const activityModel = require('../models/activityModel');

/**
 * gets activitys categories and activitys types
 * @param {*} req 
 * @param {*} res 
 */
const getCategoriesAndTypes = (req, res) => {

    let formatedCategories = {};
    let typeData = {};

    categoriasModel.getAllCategories()
        .then((result) => {
            result.forEach((category) => {
                // create categories
                formatedCategories = { ...formatedCategories, [category.nombre]: [] };
                category.tipos.forEach((tipo) => {
                    let { nombre, campos, requiereArchivo } = tipo;
                    typeData = { ...typeData, [nombre]: { campos, requiereArchivo } };
                    // push category types
                    formatedCategories[category.nombre].push(nombre);
                })
            })
            res.json({ formatedCategories, typeData });
        })
}

/**
 * submits an activity
 * @param {*} req 
 * @param {*} res 
 */
const createActivity = async (req, res) => {
    const activity = {
        "título": req.body.title,
        "visibilidad": req.body.visibility,
        "categoría": req.body.category,
        "tipo": req.body.activityType,
        "progreso": req.body.progress,
        "periodo de inicio": req.body.startPeriod,
        "periodo de finalización": req.body.finishPeriod,
        "descripción": req.body.description,
        "intereses": req.body.interests,
        "campos": req.body.activityData,
    }

    activityModel.uploadActivity(activity)
        .then(() => {
            res.json({ 'status': 'ok' });
        })
        .catch(err => {
            console.error(err);
            res.json({ 'status': 'failed' });
        })
}


module.exports = {
    getCategoriesAndTypes,
    createActivity
}