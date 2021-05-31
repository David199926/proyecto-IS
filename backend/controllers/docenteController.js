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


module.exports = {
    getUserInfo,
}