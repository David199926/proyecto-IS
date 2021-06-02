const categoriasModel = require('../models/categoriasModel');
const activityModel = require('../models/activityModel');

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

const createActivity = async (req, res) => {
    const activity = {
        "codigoCreador": req.body.codigoCreador,
        "título": req.body.title,
        "progreso": req.body.progress,
        "pública": req.body.visibility === "pública",
        "categoría": req.body.category,
        "tipo": req.body.activityType,
        "periodo de inicio": req.body.startPeriod,
        "periodo de finalización": req.body.finishPeriod,
        "descripción": req.body.description,
        "datos tipo": req.body.activityData,
        "colaboradores": [],
        "temas relacionados": req.body.interests,
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

const getActivity = async (req, res) => {
    const {id} = req.params;
    activityModel.getActivity(id)
    .then((activity) => {
        res.json(activity);
    })
    .catch(err => {
        console.error(err);
        res.json({ 'status': 'failed' });
    })
}

const editActivity = async (req, res) => {
    const activityId = req.body.id;
    const activity = {
        "codigoCreador": req.body.codigoCreador,
        "título": req.body.title,
        "progreso": req.body.progress,
        "pública": req.body.visibility === "pública",
        "categoría": req.body.category,
        "tipo": req.body.activityType,
        "periodo de inicio": req.body.startPeriod,
        "periodo de finalización": req.body.finishPeriod,
        "descripción": req.body.description,
        "datos tipo": req.body.activityData,
        "colaboradores": req.body.collabs,
        "temas relacionados": req.body.interests,
    }
    activityModel.updateActivity(activityId, activity)
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
    createActivity,
    getActivity,
    editActivity,
}