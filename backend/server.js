const express = require('express');
const cors = require('cors');
// controllers
const logInController = require('./controllers/logInController');
const activityController = require('./controllers/activityController');
const actividadForanea = require('./controllers/actividadForanea');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// auth user in login
app.post('/validate', logInController.validate);
// get activities categories and types
app.get('/categories', activityController.getCategoriesAndTypes);
// get activities types data
app.get('/typedata', activityController.getActivityTypeData);

//devuelve un JSON con todos los datos de la actividad
app.get('/actividad-foranea' , actividadForanea.getActividad );


app.get('/prueba', activityController.getCategoriesAndTypes)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
