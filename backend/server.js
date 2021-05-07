const express = require('express');
const cors = require('cors');

const logInController = require('./controllers/logInController');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.post('/validate', logInController.validate);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});