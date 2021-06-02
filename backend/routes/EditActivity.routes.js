const express = require('express');
const router = express.Router();

const {editActivity} = require('../controllers/activityController');

router.post('/' , editActivity);


module.exports = router;