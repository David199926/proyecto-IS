const db = require('../models/dbConection');

const getAcademicas = async (req, res) =>{
    
    let myActivities = [];

     await db.collection("actividades").where('categoría' , '==' , 'Académica').get().then((querySnapshot) => {
        
        querySnapshot.forEach(async (doc) => {
            let response = await {data: doc.data() , id: doc.id};
            myActivities.push(response);
        });


    });
    
    await res.json(myActivities);

 
}

const getProfesionales = async (req , res) => {
    
    let myActivities = [];

    await db.collection("actividades").where('categoría' , '==' , 'Profesional').get().then((querySnapshot) => {
       
       querySnapshot.forEach(async (doc) => {
           let response = await {data: doc.data() , id: doc.id};
           myActivities.push(response);
       });


   });
   
   await res.json(myActivities);

}

const deleteActivity = async (req, res) => {
    await db.collection('actividades').doc(req.body.id).delete();
}

module.exports ={
    getAcademicas,
    getProfesionales,
    deleteActivity
}
