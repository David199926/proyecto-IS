const db = require('../models/dbConection');

const createActivity = async (req, res) => {

    const activity = {
        title: req.body.title,
        visibility : req.body.visibility,
        category : req.body.category,
        activityType : req.body.activityType,
        progress : req.body.progress,
        startPeriod : req.body.startPeriod,
        finishPeriod : req.body.finishPeriod,
        description : req.body.description,
        interests : req.body.interests,
        activityData: req.body.activityData,
        interestsAvailable : req.body.interestsAvailable
    }

    await db.collection('actividades').doc().set(activity);

    res.json({
        'status' : 'ok'
    });
}

module.exports = {
    createActivity
}