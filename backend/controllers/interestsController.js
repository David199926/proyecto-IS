const interesesModel = require('../models/interesesModel');

const getInterests = (req, res) => {
    interesesModel.getAllInterests()
    .then((interests) => {
        res.json(interests);
    })
}

module.exports = {
    getInterests,
}