const express = require('express');
const router = express.Router();

const { getProfesionales, getAcademicas , deleteActivity } = require('../controllers/MyActivityController');

router.post('/academicas', getAcademicas);
router.post('/profesionales', getProfesionales);

router.post('/delete/' , deleteActivity);

module.exports = router;
