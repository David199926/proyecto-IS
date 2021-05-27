const express = require('express');
const router = express.Router();

const {getActivityInfo} = require('../controllers/ForeignActivityController')

router.post('/' , getActivityInfo);

module.exports = router;