import React, { useState, useEffect } from 'react';
import User from '../User';

// Material UI
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
// alert message
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Progress from './Progress/Progress';
import UploadFile from './UploadFile/UploadFile';

import axios from 'axios';

// styles
import './CrearActividad.css';

// constants
import { BACKEND_URL } from '../Constants/constants.js';

function CrearActividad() {
    const visibilityValues = ['pública', 'privada'];
    const periods = ['2020-1', '2020-3', '2021-1', '2021-3'];

    // component state
    const [categories, setCategories] = useState({});
    const [typeData, setTypeData] = useState({});
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("success");

    // activity common data
    const [title, setTitle] = useState('');
    const [visibility, setVisibility] = useState(visibilityValues[0]);
    const [category, setCategory] = useState('');
    const [activityType, setActivityType] = useState('');
    const [progress, setProgress] = useState(0);
    const [startPeriod, setStartPeriod] = useState(periods[0]);
    const [finishPeriod, setFinishPeriod] = useState('');
    const [description, setDescription] = useState('Esta es una descripción');

    // activitys interests
    const [interests, setInterests] = useState([]);
    const [interestsAvailable, setInterestsAvailable] = useState([])
    const [inputValues, setInputvalues] = useState([]);

    // activity data
    const [activityData, setActivityData] = useState({});
    // activity file
    const [file, setFile] = useState(null);

    // component effects

    // get activities categories from backend (ONLY ON COMPONENT MOUNT)
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/categories-types`, {cancelToken: source.token})
            .then(({ data }) => {
                const typeData = data.typeData;
                const categories = data.formatedCategories;
                const categoryValues = Object.keys(categories);

                // set all categories and typedata
                setCategories(categories);
                setTypeData(typeData);

                // set component category and type
                const activityType = Object.values(categories)[0][0];
                setCategory(categoryValues[0]);
                setActivityType(activityType);

                // set activity type data
                setActivityData(typeData[activityType].campos);
            })
            .catch(err => {
                if (!axios.isCancel(err)) console.log(err);
            })
        return () => source.cancel();
    }, []);
    // get interests from backend (ONLY ON COMPONENT MOUNT)
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/interests`, {cancelToken: source.token})
            .then(({ data }) => { setInterestsAvailable(data) })
        
        return () => source.cancel();
    }, []);

    // behaviors

    // draws activitys type data inputs
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
                                    InputProps={{required: true}}
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
        ))
        )
    }

    // get insterest chips
    const getInterestChips = () => {
        return (
            <Grid item xs={12}>
                {
                    interests.map((option, index) => (
                        <Chip
                            key={index}
                            label={option.nombre}
                            className="interests-chips"
                            onDelete={handleDelete(option)}
                        />
                    ))
                }
            </Grid>
        )
    }

    // draws file input component if needed
    const checkIfNeedsFile = () => {
        if (activityType === '') return null;
        if (!typeData[activityType].requiereArchivo) return null;
        return (
            <div>
                <h2>Archivos de la actividad</h2>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <UploadFile file={file} setFile={setFile} />
                    </Grid>
                </Grid>
            </div>
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
            // avoid out of range select warninggggg
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
        setActivityData(typeData[value].campos || {});
    }
    // handle interest input
    const pushInterest = (event, newValue) => {
        if (newValue == null) return null;
        setInterests([...interests, newValue]);
        setInterestsAvailable(interestsAvailable.filter((value) => value.id !== newValue.id));
        setInputvalues([]);
    }
    // handle delete interest input
    const handleDelete = (chipToDelete) => () => {
        setInterests((interests) => interests.filter((interest) => interest.id !== chipToDelete.id));
        setInterestsAvailable([...interestsAvailable, chipToDelete]);
    };
    // handle close SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    // clean activity data
    const cleanActivityData = () => {
        setTitle('');
        setVisibility(visibilityValues[0]);
        setCategory('');
        setActivityType('');
        setProgress(0);
        setStartPeriod(periods[0]);
        setFinishPeriod('');
        setDescription('Esta es una descripción');
        setInterests([]);
        setActivityData(typeData[activityType].campos);
    }

    // create activity
    const createActivity = (event) => {
        event.preventDefault();
        // if user is not registered
        if (sessionStorage.getItem('userId') == null) {
            setOpen(true);
            setSubmitStatus('error');
            return false;
        }
        const activity = {
            codigoCreador: sessionStorage.getItem('userId'),
            title,
            visibility,
            category,
            activityType,
            progress,
            startPeriod,
            finishPeriod,
            description,
            interests: interests.map((interest) => interest.id),
            activityData,
            interestsAvailable,
        }
        // submits activity
        axios.post(`${BACKEND_URL}/new-activity`, activity)
            .then(({ data }) => {
                const { status } = data;
                setOpen(true);
                setSubmitStatus(status === 'ok' ? 'success' : 'error');
                if (status) cleanActivityData();
            })
    }

    return (
        <form className="main-container-crear" onSubmit={createActivity}>
            <h1>Crear actividad</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    {/* titulo de la actividad */}
                    <TextField
                        id="title"
                        label="Título"
                        value={title}
                        variant="outlined"
                        InputProps={{required: true}}
                        onChange={handleChange(setTitle)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={4}>
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
                <Grid item xs={12} sm={8}>
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
                <Grid item xs={12}>
                    <Grid item xs={12} md={8}>
                        {/* progreso de actividad */}
                        <Progress
                            progress={progress}
                            setProgress={setProgress}
                            id="progress"
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
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
                <Grid item xs={12} sm={6} md={4}>
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
                        value={description}
                        variant="outlined"
                        multiline
                        rows={4}
                        InputProps={{required: true}}
                        fullWidth
                        onChange={handleChange(setDescription)}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Input Temas de interés de la actividad */}
                    <Autocomplete
                        options={interestsAvailable}
                        getOptionLabel={(interest) => interest.nombre}
                        value={inputValues}
                        onChange={pushInterest}
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
            <br />
            {/* archivos de actividad */}
            {checkIfNeedsFile()}

            {/* colaboradores de actividad */}
            <div className="colabs">
                <h2>Colaboradores</h2>
                <span>Crea la actividad antes de invitar colaboradores</span>
            </div>
            
            {/* subir actividad */}
            <Button
                variant="contained"
                color="primary"
                type="submit"
            >
                Confirmar
            </Button>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={submitStatus}>
                    {
                        submitStatus === "success" ?
                            "Se ha subido la actividad con éxito" :
                            "Ocurrió un problema, inténtalo más tarde"
                    }
                </Alert>
            </Snackbar>
        </form>
    )
}

export default CrearActividad;
