const docenteModel = require('../models/docenteModel');

const validate = (req, res) => {
    // err index
    // 0 => unregistered user
    // 1 => wrong password 
    const {username, password} = req.body;
    docenteModel.getUser(username)
    .then((user) => {
        if (user == null) res.json({error: 0}); 
        if (user.contrasena != password) res.json({error: 1});
        res.json({error: null, user: user});
    })
}

module.exports = {
    validate
}