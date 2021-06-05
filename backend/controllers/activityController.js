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
    const { id } = req.params;
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

const getCollaborators = async (req, res) => {
    const { id } = req.query;
    activityModel.getActivityCollabs(id)
        .then((collabs) => {
            res.json(collabs);
        })
        .catch(err => {
            console.error(err);
            res.json({ 'status': 'failed' });
        })
}

const getNoCollaborators = async (req, res) => {
    const {activityId } = req.query;
    activityModel.getActivityNoCollabs(activityId)
        .then((collabs) => {
            res.json(collabs);
        })
        .catch(err => {
            console.error(err);
            res.json({ 'status': 'failed' });
        })
}

const inviteCollaborators = async (req, res) => {
    const collaborators = req.body;
    const { id } = req.params;

    activityModel.getActivity(id).
        then((activity) => {
            collaborators.forEach(collaborator => {
                if (!activity.colaboradores.includes(collaborator)) {
                    activity.colaboradores.push(collaborator);
                }
            })
            activityModel.updateActivity(id, activity)
                .then(() => { res.json({ 'status': 'ok' }) })
                .catch(err => {
                    res.json({ 'status': 'failed' });
                    throw err;
                })
        })
        .catch(err => {
            res.json({ 'status': 'failed' });
            throw err;
        })
}


module.exports = {
    getCategoriesAndTypes,
    createActivity,
    getActivity,
    editActivity,
    getCollaborators,
    getNoCollaborators,
    inviteCollaborators
}