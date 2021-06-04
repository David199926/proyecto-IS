const express = require('express');
const router = express.Router();

const { getProfesionales, getAcademicas , getGestion, deleteActivity } = require('../controllers/MyActivityController');

router.post('/academicas', getAcademicas);
router.post('/profesionales', getProfesionales);
router.post('/gestion', getGestion);

router.post('/delete/' , deleteActivity);

module.exports = router;
