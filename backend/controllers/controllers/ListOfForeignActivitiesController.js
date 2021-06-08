const db = require('../models/dbConection');


const getListOfPublicActivities = async (req, res) => {
 
    let myActivities = [];

    await db.collection("actividades")
    .where('pública' , '==' , true)
    .get().then((querySnapshot) => {
       
       querySnapshot.forEach(async (doc) => {
           let response = await {data: doc.data() , id: doc.id};
           myActivities.push(response);
       });


   });
   
   await res.json(myActivities);
}

module.exports = {
    getListOfPublicActivities
}