const db = require('../models/dbConection');

const getActivityInfo = (req, res) =>{    

    db.collection('actividades')
    .where('idCreador' , '==' , req.body.idCreador)
    .get()
    .then((querySnapshot) => {
        
        querySnapshot.forEach(async (doc) => {
            res.status(200).json({data: doc.data() , idActividad: doc.id})
        });

    })
    .catch(error => {console.log(error) ; res.status(404).json({status:'failed', info: error})});
    

}

module.exports = {
    getActivityInfo
}
