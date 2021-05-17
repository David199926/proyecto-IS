const getCategoriesAndTypes = (req, res) => {
    // const values, use database latter
    const categories = {
        'Académica': [
            'Asignatura de pregrado',
            'Proyecto de investigación',
        ],
        'Profesional': [
            'Premios o reconocimientos',
            'Certificación',
        ],
        'Gestion': [
            'Permanencia y retención',
            'Gestión del programa académico'
        ],
    };
    res.json(categories);
}

const getActivityTypeData = (req, res) => {
    // const values, use database later
    const typeData = {
        "Asignatura de pregrado": {
            fields: {
                "código": '',
                "nombre": '',
                "cantidad de créditos": 0,
                "periodo académico": '',
                "componente": '',
            },
            needsFile: false,
        },
        "Proyecto de investigación": {
            fields: {
                "código": '',
                "título": '',
                "rol": "",
            },
            needsFile: true,
        },
        "Premios o reconocimientos": {
            fields: {
<<<<<<< HEAD
                "título": '',
                "fecha que se recibe": '',
                "organización que premia": '',
=======
                aaa31: 'aaa31',
                aaa32: 'aaa32',
>>>>>>> d7da726aa7a60a8c86b11081f707c02609795070
            },
            needsFile: true,
        },
        "Certificación": {
            fields: {
<<<<<<< HEAD
                "título": '',
                "fecha que se recibe": '',
                "organización que certifica": '',
=======
                aaa41: 'aaa41',
                aaa42: 'aaa42',
>>>>>>> d7da726aa7a60a8c86b11081f707c02609795070
            },
            needsFile: true,
        },
        "Permanencia y retención": {
            fields: {
<<<<<<< HEAD
                "título": '',
                "fecha de inicio": '',
                "fecha de finalización": '',
                "cantidad de estudiantes participantes": 0,
=======
                ppp11: 'ppp11',
                ppp12: 'ppp12',
>>>>>>> d7da726aa7a60a8c86b11081f707c02609795070
            },
            needsFile: true,
        },
        "Gestión del programa académico": {
            fields: {
<<<<<<< HEAD
                "título": '',
                "fecha de inicio": '',
                "fecha de finalización": '',
                "cantidad de estudiantes participantes": 0,
=======
                ppp21: 'ppp21',
                ppp22: 'ppp22',
>>>>>>> d7da726aa7a60a8c86b11081f707c02609795070
            },
            needsFile: true,
        },
    };

    res.json(typeData);
}

module.exports = {
    getCategoriesAndTypes,
    getActivityTypeData,
}