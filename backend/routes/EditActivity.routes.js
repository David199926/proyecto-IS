const express = require('express');
const router = express.Router();

const {editActivity} = require('../controllers/EditActivityController');

router.post('/' , editActivity );


module.exports = router;