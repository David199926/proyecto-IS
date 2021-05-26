const db = require('../models/dbConection');

const getAcademicas = async (req, res) =>{
    
    let myActivities = [];

     await db.collection("misActividades").where('categoria' , '==' , 'academica').get().then((querySnapshot) => {
        
        querySnapshot.forEach(async (doc) => {
            let response = await {data: doc.data() , id: doc.id};
            myActivities.push(response);
        });


    });
    
    await res.json(myActivities);

 
}

const getProfesionales = async (req , res) => {
    
    let myActivities = [];

    await db.collection("misActividades").where('categoria' , '==' , 'profesional').get().then((querySnapshot) => {
       
       querySnapshot.forEach(async (doc) => {
           let response = await {data: doc.data() , id: doc.id};
           myActivities.push(response);
       });


   });
   
   await res.json(myActivities);

}

const deleteActivity = async (req, res) => {
    await db.collection('misActividades').doc(req.body.id).delete();
}

module.exports ={
    getAcademicas,
    getProfesionales,
    deleteActivity
}