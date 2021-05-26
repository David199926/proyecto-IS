const express = require('express');
const router = express.Router();

const { getProfesionales, getAcademicas , deleteActivity } = require('../controllers/MyActivityController');

router.get('/academicas', getAcademicas);
router.get('/profesionales', getProfesionales);

router.post('/delete/' , deleteActivity);

module.exports = router;
