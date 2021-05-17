categoriasModel = require('../models/categoriasModel');
/*
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
}*/

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
                "título": '',
                "fecha que se recibe": '',
                "organización que premia": '',
            },
            needsFile: true,
        },
        "Certificación": {
            fields: {
                "título": '',
                "fecha que se recibe": '',
                "organización que certifica": '',
            },
            needsFile: true,
        },
        "Permanencia y retención": {
            fields: {
                "título": '',
                "fecha de inicio": '',
                "fecha de finalización": '',
                "cantidad de estudiantes participantes": 0,
            },
            needsFile: true,
        },
        "Gestión del programa académico": {
            fields: {
                "título": '',
                "fecha de inicio": '',
                "fecha de finalización": '',
                "cantidad de estudiantes participantes": 0,
            },
            needsFile: true,
        },
    };

    res.json(typeData);
}

const getCategoriesAndTypes = (req, res) => {

    let formatedCategories = {};
    let typeData = {};

    categoriasModel.getAllCategories()
        .then((result) => {
            result.forEach((category) => {
                // create categories
                formatedCategories = { ...formatedCategories, [category.nombre]: [] };
                category.tipos.forEach((tipo) => {
                    let { nombre, campos, requiereArchivo } = tipo;
                    typeData = { ...typeData, [nombre]: { campos, requiereArchivo } };
                    // push category types
                    formatedCategories[category.nombre].push(nombre);
                })
            })
            res.json({ formatedCategories, typeData });
        })
}

/**
 * Formats categories and types from raw database raw data
 * @param {object} categories 
 * @returns 
 */
const formatCategories = (categories) => {
    let formatedCategories = {};

    categories.forEach((category) => {
        // create categories
        formatedCategories = { ...formatedCategories, [category.nombre]: [] };
        category.tipos.forEach((tipo) => {
            // push category types
            formatedCategories[category.nombre].push(tipo.nombre);
        })
    })

    return formatedCategories;
}

/**
 * Formats data type and types from raw database raw data
 * @param {object} categories 
 */
const formatDataTypes = (categories) => {
    let typeData = {};

    categories.forEach((category) => {
        category.tipos.forEach((tipo) => {
            // push category types
            let { nombre, campos, requiereArchivo } = tipo;
            typeData = { ...typeData, [nombre]: { campos, requiereArchivo } };
        })
    })

    return typeData;
}

module.exports = {
    getCategoriesAndTypes,
    getActivityTypeData,
    getCategoriesAndTypes,
}