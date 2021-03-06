const express = require('express');
const cors = require('cors');


// controllers
const logInController = require('./controllers/logInController');
const activityController = require('./controllers/activityController');
const interestsController = require('./controllers/interestsController');
const docenteController = require('./controllers/docenteController');

//routers
const MyActivities = require('./routes/MyActivities.routes');
const ForeignActivity = require('./routes/ForeignActivity.routes');
const EditActivity = require('./routes/EditActivity.routes');
const ListOfForeignActivities = require('./routes/ListOfForeignActivities.routes');
const listActivities= require("./routes/listActivities.routes");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// auth user in login
app.post('/validate', logInController.validate);
// gets user info
app.get('/user', docenteController.getUserInfo);

// get categories and typeData from db
app.get('/categories-types', activityController.getCategoriesAndTypes);
// get interests list
app.get('/interests', interestsController.getInterests);

//sube la actividad a la base de datos
app.post('/new-activity', activityController.createActivity);
// search for an activity in db
app.post('/activity/:id', activityController.getActivity);
// get activity collaborators
app.get('/collabs', activityController.getCollaborators);
// get activity no collaborators
app.get('/no-collaborators', activityController.getNoCollaborators);
// send collaboration invitations
app.post('/invite/:id', activityController.inviteCollaborators)

// get user interests
app.get('/user-interests', docenteController.getUserInterests);
// update user interests
app.post('/user-interests', docenteController.updateUserInterests);


/**
 * Routers
 */
app.use('/mis-actividades' , MyActivities);
app.use('/foranea', ForeignActivity);
app.use('/edit', EditActivity);
app.use('/activities/public' , ListOfForeignActivities);
app.use('/publicActivities', listActivities );


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
