const getActividad = (req, res) => {
    // const values, use database latter
    const actividad =  {
        titulo: "Actividad 1",
        porcentajeProgreso: 23,
        descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a ligula elementum diam venenatis consequat ut in tortor. Morbi consequat, libero eu imperdiet euismod, diam tellus mattis arcu, vel venenatis tortor nisi sed diam. In sit amet lorem ligula. Proin quis turpis lacus. Donec lobortis eu est ut aliquet. Donec non justo urna. Suspendisse nibh orci, varius tristique laoreet in, vestibulum vel neque. Morbi porttitor augue quis ex aliquet, non elementum ex blandit. Aenean eget est vel arcu aliquet sagittis id a quam. Quisque sodales lorem et vestibulum porta. Phasellus a ultricies nisl. Curabitur sed condimentum felis. Morbi pulvinar ex ut sem pellentesque, sit amet blandit mi condimentum.',
        categoria: 'Academica',
        tipoActividad: 'Proyecto de investigación',
        periodoAcademicoInicio: '2020-3',
        periodoAcademicoFin: '2021-1',
        codigo: 12345,
        rol: 'Director',
        listaTemas: {temas:['Deep Learning', 'Computación afectiva','gay']},
        colaboradores: [
            {nombre: 'Bill Cosby' , idActor: 123},
            {nombre: 'Jimmie McGill' , idActor: 456},
            {nombre: 'Stuart Hampton' , idActor: 789}
        ]
    };
    res.json(actividad);
}

module.exports = {
    getActividad
}