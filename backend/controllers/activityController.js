const getCategoriesAndTypes = (req, res) => {
    // const values, use database latter
    const categories =  {
        'Académica': ['AAA1', 'AAA2', 'AAA3', 'AAA4'],
        'Profesional': ['PPP1', 'PPP2', 'PPP3', 'PPP4'],
    };
    res.json(categories);
}

const getActivityTypeData = (req, res) => {
    // const values, use database later
    const typeInfo = {
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

    res.json(typeInfo);
}

module.exports = {
    getCategoriesAndTypes,
    getActivityTypeData,
}