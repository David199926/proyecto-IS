import React, { useState} from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// styles
import './styleForms.css'



function GeneReport() {


    // const values
    const categories = {
        'Académica':[
            'Asignatura de pregrado', 'Proyecto de investigación', 'Extensión', 'Participación en redes académicas de cooperación internacional',
            'Producción académica','Profesor invitado','Movilidad nacional/internacional','EgresaParticipación en eventos nacionales o internacionalesdos',
            'Talleres, seminarios y otros eventos', 'Promoción del programa', 'Dirección de trabajo de grado', 'Jurado de tesis de grado',
            'Dirección de trabajo de grado', 'Proyección social'
            ],

        'Profesional': ['Premios o reconocimientos', 'Certificación', 'Patentes', 'Registro de software'],
        
        'Gestion': ['Permanencia y retención', 'Gestión del programa académico'],
    }
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
    }
    const categoryValues = Object.keys(categories);
    const periods = ['2020-1', '2020-3', '2021-1', '2021-3'];

    // component state
    const [title, setTItle] = useState("");
    const [category, setCategory] = useState(categoryValues[0]);
    const [activityType, setActivityType] = useState(categories[category][0]);
    const [startPeriod, setStartPeriod] = useState(periods[0]);
    const [finishPeriod, setFinishPeriod] = useState(periods[0]);

 

    // get menu items for a select control
    const getMenuItems = (array) => {
        return (array.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        )))
    }


    // get periods after initial periods
    const getSubsequentPeriods = () => {
        let availablePeriods = periods.filter((period) => {
            let [year, semester] = period.split('-');
            let [startYear, startSemester] = startPeriod.split('-');
            return (year > startYear) || (year === startYear && semester >= startSemester);
        });
        if (!availablePeriods.includes(finishPeriod)) {
            // avoid out of range select warning
            setFinishPeriod(availablePeriods[0]);
        }
        return getMenuItems(availablePeriods);
    }

    // control handle function
    const handleChange = (setFunction) => {
        return (event) => { setFunction(event.target.value); }
    }
    // category change produces type change
    const handleCategory = (event) => {
        let value = event.target.value;
        setCategory(value);
        handleActivityType(categories[value][0]);
    }
    // type change produces activity data change
    const handleActivityType = (value) => {
        setActivityType(value);
    }
 
    
    return (
        <div className="geneR">
            <h2>Opciones de busqueda</h2>
            <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                    {/* categoría de la actividad */}
                    <TextField
                        id="Category"
                        select
                        label="Categoría de la actividad"
                        value={category}
                        variant="outlined"
                        onChange={handleCategory}
                        fullWidth
                    >
                        {getMenuItems(categoryValues)}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {/* tipos de actividad */}
                    <TextField
                        id="Types"
                        select
                        label="Tipo de la actividad"
                        value={activityType}
                        variant="outlined"
                        fullWidth
                        onChange={(event) => { handleActivityType(event.target.value) }}
                    >
                        {getMenuItems(categories[category])}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {/* periodo académico de inicio */}
                    <TextField
                        id="startPeriod"
                        select
                        label="Periodo de incio"
                        value={startPeriod}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange(setStartPeriod)}
                    >
                        {getMenuItems(periods)}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {/* periodo académico de finalización */}
                    <TextField
                        id="finalPeriod"
                        select
                        label="Periodo de fin"
                        value={finishPeriod}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange(setFinishPeriod)}
                    >
                        {getSubsequentPeriods()}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {/* autor de actividad */}
                    <TextField
                        id="title"
                        label="Título"
                        variant="outlined"
                        onChange={handleChange(setTItle)}
                        fullWidth
                    />
                </Grid>

                <Grid container direction="row" justify="flex-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Aplicar
                </Button>
            </Grid>

            </Grid>

            
        </div>
    )
}

export default GeneReport