const express = require('express');
const cors = require('cors');
// controllers
const logInController = require('./controllers/logInController');
const activityController = require('./controllers/activityController')

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});