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
                aaa31: 'aaa31',
                aaa32: 'aaa32',
            },
            needsFile: true,
        },
        "Certificación": {
            fields: {
                aaa41: 'aaa41',
                aaa42: 'aaa42',
            },
            needsFile: true,
        },
        "Permanencia y retención": {
            fields: {
                ppp11: 'ppp11',
                ppp12: 'ppp12',
            },
            needsFile: true,
        },
        "Gestión del programa académico": {
            fields: {
                ppp21: 'ppp21',
                ppp22: 'ppp22',
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