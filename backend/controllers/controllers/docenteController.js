const docenteModel = require('../models/docenteModel');
const activityModel = require('../models/activityModel');

// get user info
const getUserInfo = async (req, res) => {
    const {id} = req.query;
    const user = await docenteModel.getUserById(id);
    const collabs = await docenteModel.getUserCollabs(id);
    const userActivities = await activityModel.getUserActivities(id);
    

    const response = {};
    response.fullName = `${user.nombre} ${user.apellido}`;
    response.totalActivities = userActivities.length;
    response.collabs = collabs.length;

    let unfinished = 0;
    let finished = 0;
    userActivities.forEach( activity => {
        if (activity.progreso === 100) {
            finished++;
        } else {
            unfinished++;
        }
    })
    response.unfinished = unfinished;
    response.finished = finished;

    res.json(response)
}
// get user interests
const getUserInterests = async (req, res) => {
    const {id} = req.query;
    docenteModel.getUserById(id)
    .then((user) => {
        res.json(user["intereses"]);
    })
}
// update user interests
const updateUserInterests = async (req, res) => {
    const {interests, id} = req.body;
    const user = await docenteModel.getUserById(id);
    user.intereses = interests;
    docenteModel.updateUser(user)
    .then(() => {
        res.json({ 'status': 'ok' });
    })
    .catch(err => {
        console.error(err);
        res.json({ 'status': 'failed' });
    })
}

module.exports = {
    getUserInfo,
    getUserInterests,
    updateUserInterests,
}