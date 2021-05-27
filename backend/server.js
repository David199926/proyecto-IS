const express = require('express');
const cors = require('cors');


// controllers
const logInController = require('./controllers/logInController');
const activityController = require('./controllers/activityController');
const interestsController = require('./controllers/interestsController');

//routers
const MyActivities = require('./routes/MyActivities.routes');
const ForeignActivity = require('./routes/ForeignActivity.routes');
const EditActivity = require('./routes/EditActivity.routes');
const Notifications = require('./routes/Notifications.routes');
const ListOfForeignActivities = require('./routes/ListOfForeignActivities.routes');

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
//sube la actividad a la base de datos
app.post('/new-activity', activityController.createActivity);



/**
 * Routers
 */
app.use('/mis-actividades' , MyActivities);
app.use('/foranea', ForeignActivity);
app.use('/edit', EditActivity);
app.use('/notifications' , Notifications);
app.use('/activities/public' , ListOfForeignActivities);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
