import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Progress from './Progress/Progress';
import UploadFile from './UploadFile/UploadFile'

// styles
import './CrearActividad.css'

function CrearActividad() {

    // const values
    const categories = {
        'Académica': ['AAA1', 'AAA2', 'AAA3', 'AAA4'],
        'Profesional': ['PPP1', 'PPP2', 'PPP3', 'PPP4'],
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
    const visibilityValues = ['pública', 'privada'];
    const periods = ['2020-1', '2020-3', '2021-1', '2021-3'];
    const interestValues = ['interes1', 'interes2'];

    // component state
    const [title, setTItle] = useState("");
    const [visibility, setVisibility] = useState(visibilityValues[0]);
    const [category, setCategory] = useState(categoryValues[0]);
    const [activityType, setActivityType] = useState(categories[category][0]);
    const [progress, setProgress] = useState(0);
    const [startPeriod, setStartPeriod] = useState(periods[0]);
    const [finishPeriod, setFinishPeriod] = useState(periods[0]);
    const [description, setDescription] = useState('Esta es una descripción');
    const [interests, setInterests] = useState([]);
    const [activityData, setActivityData] = useState(typeData[activityType]);
    const [file, setFile] = useState(null);
    const [interestsAvailable, setInterestsAvailable] = useState(interestValues)
    const [inputValues, setInputvalues] = useState([]);


    // get activity data
    const getTypeDataInput = () => {
        return (
            <Grid container spacing={2}>
                {
                    Object.entries(activityData).map(([label, value], index) => {
                        return (
                            <Grid item xs={12} key={`gi-${index}`}>
                                <TextField
                                    key={index}
                                    label={label}
                                    variant="outlined"
                                    fullWidth
                                    value={value}
                                    onChange={(event) => {
                                        setActivityData({ ...activityData, [label]: event.target.value })
                                    }}
                                />
                            </Grid>
                        );
                    })
                }
            </Grid>
        )
    }

    // get menu items for a select control
    const getMenuItems = (array) => {
        return (array.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        )))
    }

    // get insterest chips
    const getInterestChips = () => {
        return (
            <Grid item xs={12}>
                {
                    interests.map((option, index) => (
                        <Chip
                            key={index}
                            label={option}
                            className="interests-chips"
                            onDelete={handleDelete(option)}
                        />
                    ))
                }
            </Grid>
        )
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
        setActivityData(typeData[value]);
    }
    // handle interest input
    const pushInterest = (event, newValue) => {
        if (newValue == null) return null;
        setInterests([...interests, newValue]);
        setInterestsAvailable(interestsAvailable.filter((value) => value !== newValue));
        setInputvalues([]);
    }
    // handle delete interest input
    const handleDelete = (chipToDelete) => () => {
        setInterests((interests) => interests.filter((interest) => interest !== chipToDelete));
        setInterestsAvailable([...interestsAvailable, chipToDelete]);
    };

    return (
        <div className="main-container">
            <h1>Crear actividad</h1>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    {/* titulo de la actividad */}
                    <TextField
                        id="title"
                        label="Título"
                        variant="outlined"
                        onChange={handleChange(setTItle)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={4}>
                    {/* visibilidad de la actividad */}
                    <TextField
                        id="visibility"
                        select
                        label="Visibilidad"
                        value={visibility}
                        variant="outlined"
                        onChange={handleChange(setVisibility)}
                        fullWidth
                    >
                        {getMenuItems(visibilityValues)}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={8}>
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
                    <Grid item xs={8}>
                        {/* progreso de actividad */}
                        <Progress progress={progress} setProgress={setProgress} />
                    </Grid>
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={4}>
                    {/* periodo académico de finalización */}
                    <TextField
                        id="finalPeriod"
                        select
                        label="Periodo de finalización"
                        value={progress !== 100 ? '' : finishPeriod}
                        variant="outlined"
                        fullWidth
                        disabled={progress !== 100}
                        onChange={handleChange(setFinishPeriod)}
                    >
                        {getSubsequentPeriods()}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    {/* Descripción de la actividad */}
                    <TextField
                        label="Descripción"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        onChange={handleChange(setDescription)}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Input Temas de interés de la actividad */}
                    <Autocomplete
                        options={interestsAvailable}
                        value={inputValues}
                        onChange={pushInterest}
                        getOptionLabel={(interest) => interest}
                        renderInput={(params) => <TextField {...params} label="Temas de interés" variant="outlined" fullWidth />}
                    />
                </Grid>
                {/* Chips Temas de interés de la actividad */}
                {getInterestChips()}
            </Grid>

            {/* datos de actividad */}
            <h2>Datos de la actividad</h2>
            <Grid container spacing={2}>
                {getTypeDataInput()}
            </Grid>

            {/* archivos de actividad */}
            <h2>Archivos de la actividad</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <UploadFile file={file} setFile={setFile} />
                </Grid>
            </Grid>

            {/* colaboradores de actividad */}
            <h2>Colaboradores</h2>
            <span>Crea la actividad antes de invitar colaboradores</span>
            <Grid container direction="row" justify="flex-end">
                <Fab
                    variant="extended"
                    color="primary"
                    onClick={() => alert("subir")}>
                    Confirmar
                </Fab>
            </Grid>
        </div>
    )
}

export default CrearActividad