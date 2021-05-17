import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import axios from 'axios';

// styles
import './styleForms.css'

// constants
import { BACKEND_URL } from '../../Constants/constants.js';

function GeneReport() {


    // const values  
    const periods = ['2020-1', '2020-3', '2021-1', '2021-3'];

    // component state
    const [categories, setCategories] = useState({});
    const [typeData, setTypeData] = useState({});

    const [category, setCategory] = useState([]);
    const [activityType, setActivityType] = useState('');
    const [startPeriod, setStartPeriod] = useState(periods[0]);
    const [finishPeriod, setFinishPeriod] = useState(periods[0]);


    const [autor, setAutor] = React.useState('');
    const [legend, setLegend] = React.useState('');
    const [errorAutor, seterrorAutor] = React.useState(false);
    
    // get activities categories from backend (ONLY ON COMPONENT MOUNT)
    useEffect( () => {
        axios.get(`${BACKEND_URL}/categories`)
        .then((response) => {
            let categories = response.data;
            setCategories(categories);
            const categoryValues = Object.keys(categories);
            const activityType = Object.values(categories)[0][0];
            setCategory(categoryValues[0]);
            setActivityType(activityType);
            // get type data from backend
            axios.get(`${BACKEND_URL}/typedata`)
            .then((response) => {
                let typeData = response.data;
                setTypeData(typeData);
            })
        })
    }, []);

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
                        {getMenuItems(Object.keys(categories))}
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
                        {getMenuItems(categories[category] || [])}
                    </TextField>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                    //validacion
                    onChange = {(e) => {
                        setAutor(e.target.value);
                        if(autor.length > 30 ){
                          seterrorAutor(true);
                          setLegend("El nombre del autor contiene maximo de 32 caracteres. Ejemplo: Wilson Arias o Juan Manuel");
                        }

                        else if(autor === ''){
                          seterrorAutor(true);
                          setLegend("El nombre del autor no puede ir con un caracter");
                        }
                         
                        else if(autor === "[0-1000]"){
                          seterrorAutor(true);
                          setLegend("No se admiten numeros")
                        }

                        else{
                          seterrorAutor(false);
                          setLegend("");
                        }
                      }}
                      error = {errorAutor}
                      label="Autor"
                      helperText = {legend}
                      fullWidth
                      variant="outlined" />
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