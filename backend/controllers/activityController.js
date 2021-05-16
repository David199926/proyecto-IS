const getCategoriesAndTypes = (req, res) => {
    // const values, use database latter
    const categories =  {
        'Cualquier': ['Cualquier'],

        'Académica':[
            'Cualquier', 'Asignatura de pregrado', 'Proyecto de investigación', 'Extensión', 'Participación en redes académicas de cooperación internacional',
            'Producción académica','Profesor invitado','Movilidad nacional/internacional','EgresaParticipación en eventos nacionales o internacionalesdos',
            'Talleres, seminarios y otros eventos', 'Promoción del programa', 'Dirección de trabajo de grado', 'Jurado de tesis de grado',
            'Dirección de trabajo de grado', 'Proyección social'
            ],

        'Profesional': ['Cualquier','Premios o reconocimientos', 'Certificación', 'Patentes', 'Registro de software'],
        
        'Gestion': ['Cualquier','Permanencia y retención', 'Gestión del programa académico'],
    };
    res.json(categories);
}

const getActivityTypeData = (req, res) => {
    // const values, use database later
    const typeData = {
        AAA1: {
            aaa11: 'aaa11',
            aaa12: 'aaa12',
        },
        AAA2: {
            aaa21: 'aaa21',
            aaa22: 'aaa22',
        },
        AAA3: {
            aaa31: 'aaa31',
            aaa32: 'aaa32',
        },
        AAA4: {
            aaa41: 'aaa41',
            aaa42: 'aaa42',
        },
        PPP1: {
            ppp11: 'ppp11',
            ppp12: 'ppp12',
        },
        PPP2: {
            ppp21: 'ppp21',
            ppp22: 'ppp22',
        },
        PPP3: {
            ppp31: 'ppp31',
            ppp32: 'ppp32',
        },
        PPP4: {
            ppp41: 'ppp41',
            ppp42: 'ppp42',
        },
    };

    res.json(typeData);
}

module.exports = {
    getCategoriesAndTypes,
    getActivityTypeData,
}