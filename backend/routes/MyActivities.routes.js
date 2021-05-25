const express = require('express');
const router = express.Router();

const { getProfesionales, getMyActivities , deleteActivity } = require('../controllers/MyActivityController');

router.get('/academicas', getMyActivities);
router.get('/profesionales', getProfesionales);

router.post('/delete/' , deleteActivity);

module.exports = router;