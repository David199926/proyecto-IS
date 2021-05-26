const express = require('express');
const cors = require('cors');


// controllers
const logInController = require('./controllers/logInController');
const activityController = require('./controllers/activityController');
const interestsController = require('./controllers/interestsController');
const actividadForanea = require('./controllers/actividadForanea');
const MyActivities = require('./routes/MyActivities.routes')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// auth user in login
app.post('/validate', logInController.validate);
// get categories and typeData from db
app.get('/categories-types', activityController.getCategoriesAndTypes);
// get interests list
app.get('/interests', interestsController.getInterests);
//devuelve un JSON con todos los datos de la actividad
app.get('/actividad-foranea' , actividadForanea.getActividad );
//sube la actividad a la base de datos
app.post('/new-activity', activityController.createActivity);



/**
 *
 */
app.use('/mis-actividades' , MyActivities);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
