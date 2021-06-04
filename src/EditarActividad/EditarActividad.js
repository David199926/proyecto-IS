import React, { useState, useEffect } from 'react';

// Material UI
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// alert message
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
// My components
import Progress from '../commonComponents/Progress/Progress';
import UploadFile from '../commonComponents/UploadFile/UploadFile';
import { InterestsSelector } from '../commonComponents/InterestsSelector/InterestsSelector';
import { CollaboratorsView } from '../commonComponents/CollaboratorsView/CollaboratorsView';

import axios from 'axios';
// user data
import auth from '../auth';

// styles
import '../CrearActividad/CrearActividad.css';
import { useParams, withRouter, Prompt } from 'react-router-dom';

// constants
import { BACKEND_URL } from '../Constants/constants.js';

function EditarActividad(props) {

    // saved state
    const [saved, setSaved] = useState(true);

    // activity to edit
    const { id } = useParams();

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
    const [interestsAvailable, setInterestsAvailable] = useState([]);

    // activity collaborators
    const [collaborators, setCollaborators] = useState([]);

    // activity data
    const [activityData, setActivityData] = useState({});
    // activity file
    const [file, setFile] = useState(null);

    // component effects
    // get activities categories from backend (ONLY ON COMPONENT MOUNT)
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/categories-types`, { cancelToken: source.token })
            .then(({ data }) => {
                const typeData = data.typeData;
                if (!auth.getUserData().directivo) {
                    delete data.formatedCategories["Gestión"];
                }
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
            .then(() => setSaved(true))

        return () => source.cancel();
    }, []);
    // get activity data from backend (ONLY ON COMPONENT MOUNT)
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/interests`, { cancelToken: source.token })
            .then(({ data }) => {
                let interests = data;
                // get activity data
                axios.post(`${BACKEND_URL}/activity/${id}`, { cancelToken: source.token })
                    .then(({ data }) => {
                        setTitle(data["título"]);
                        setVisibility(data["pública"] ? visibilityValues[0] : visibilityValues[1]);
                        setCategory(data["categoría"]);
                        setActivityType(data["tipo"]);
                        setProgress(data["progreso"]);
                        setStartPeriod(data["periodo de inicio"]);
                        setFinishPeriod(data["periodo de finalización"]);
                        setDescription(data["descripción"]);

                        let interestCodes = data["temas relacionados"];
                        let relatedTopics = interests.filter((interest) => interestCodes.includes(interest.id));
                        let availableTopics = interests.filter((interest) => !interestCodes.includes(interest.id));

                        setInterests(relatedTopics);
                        setInterestsAvailable(availableTopics);

                        setActivityData(data["datos tipo"]);
                    })
                    .then(() => setSaved(true))
            })

        return () => source.cancel();
    }, []);
    // get activitys collaborators
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/collabs`, { params: { id }, cancelToken: source.token })
            .then((response) => {
                setCollaborators(response.data);
            })
            .then(() => setSaved(true))

        return () => source.cancel();
    }, []);
    // check if data changed
    useEffect(() => {
        setSaved(false);
    }, [
        title,
        visibility,
        category,
        activityType,
        progress,
        startPeriod,
        finishPeriod,
        description,
    ])

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
                                    InputProps={{ required: true }}
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
    // handle close SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };

    // update activity
    const updateActivity = (event) => {
        event.preventDefault();
        // if user is not registered
        if (sessionStorage.getItem('userId') == null) {
            setOpen(true);
            setSubmitStatus('error');
            return false;
        }
        const activity = {
            id,
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
            collabs: collaborators.map((coll) => coll.id),
        }
        // submits activity
        axios.post(`${BACKEND_URL}/edit`, activity)
            .then(({ data }) => {
                const { status } = data;
                setOpen(true);
                setSubmitStatus(status === 'ok' ? 'success' : 'error');
                // changes (may) have been saved
                setSaved(true);
            })
    }

    return (
        <form className="main-container-crear" onSubmit={updateActivity}>
            <Prompt
                when={!saved}
                message='¿Deseas salir sin guardar los cambios?'
            />
            <h1>Editar actividad</h1>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                    {/* titulo de la actividad */}
                    <TextField
                        id="title"
                        label="Título"
                        value={title}
                        variant="outlined"
                        InputProps={{ required: true }}
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
                        InputProps={{ required: true }}
                        fullWidth
                        onChange={handleChange(setDescription)}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Input Temas de interés de la actividad */}
                    <InterestsSelector
                        interests={interests}
                        setInterests={setInterests}
                        interestsAvailable={interestsAvailable}
                        setInterestsAvailable={setInterestsAvailable}
                    />
                </Grid>
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
                <CollaboratorsView
                    collaborators={collaborators}
                    setCollaborators={setCollaborators}
                />
                <Button variant="outlined" color="primary">
                    Agregar más colaboradores
                </Button>
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
                            "Se ha actualizado la actividad con éxito" :
                            "Ocurrió un problema, inténtalo más tarde"
                    }
                </Alert>
            </Snackbar>
        </form>
    )
}

export default withRouter(EditarActividad);