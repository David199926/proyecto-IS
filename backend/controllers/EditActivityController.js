const db = require('../models/dbConection');

const editActivity = (req,res) => {

    const nuevoNombre = req.body.nombre;
    const nuevoNumero = req.body.numero;

    db.collection('prueba')
    .doc('DVrp9arnI2IOdloFJKdD')
    .update({
        nombre: nuevoNombre,
        numero: nuevoNumero
    });

    res.json({msg:'Data Updated'});
}

module.exports = {
    editActivity
}