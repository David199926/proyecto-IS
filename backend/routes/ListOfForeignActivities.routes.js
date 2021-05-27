const express = require('express');
const router = express.Router();

const {getListOfPublicActivities} = require('../controllers/ListOfForeignActivitiesController')

router.post('/' , getListOfPublicActivities);

module.exports = router;