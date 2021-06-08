const express = require('express');
const router = express.Router();

const {getListOfActivities} = require('../controllers/PublicActivitiesController')

router.post('/' , getListOfActivities);

module.exports = router;