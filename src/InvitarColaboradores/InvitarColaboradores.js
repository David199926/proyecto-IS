import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
// alert message
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// my componets
import { InterestsSelector } from '../commonComponents/InterestsSelector/InterestsSelector';
import { CollaboratorsView } from '../commonComponents/CollaboratorsView/CollaboratorsView';
import { ListaColaboradores } from './ListaColaboradores';

import axios from 'axios';

// auth
import auth from '../auth';

// styles
import { makeStyles } from '@material-ui/core/styles';

// constants
import { BACKEND_URL } from '../Constants/constants.js';
const EMPTY_COLLABORATORS_MESSAGE = "Selecciona algún docente antes de enviar una invitación";
const SUCCESS_MESSAGE = "Se ha enviado la invitación con éxito";
const ERROR_MESSAGE = "Ha ocurrido un problema, inténtalo más tarde";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        boxSizing: "border-box",
        padding: "1rem",
        margin: "auto",
    },
    submit: {
        marginTop: "3rem"
    }
}))

export const InvitarColaboradores = () => {
    // styles 
    const classes = useStyles();

    // activity name
    const [activityName, setActivityName] = useState('actividad');
    // interests
    const [interests, setInterests] = useState([]);
    const [interestsAvailable, setInterestsAvailable] = useState([]);
    // colaboradores
    const [collaborators, setCollaborators] = useState([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState([]);

    // component state
    const [name, setName] = useState('ddd');
    const [invitationMessage, setInvitationMessage] = useState(
        'Hola, te invito a que participes en el desarrollo de esta actividad'
    );

    // alert
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("success");
    const [alertMessage, setAlertMessage] = useState(SUCCESS_MESSAGE);

    const { id } = useParams();

    // get activity data from backend (ONLY ON COMPONENT MOUNT)
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/interests`, { cancelToken: source.token })
            .then(({ data }) => {
                let interests = data;
                // get activity data
                axios.post(`${BACKEND_URL}/activity/${id}`, { cancelToken: source.token })
                    .then(({ data }) => {
                        setActivityName(data["título"]);

                        let interestCodes = data["temas relacionados"];
                        let relatedTopics = interests.filter((interest) => interestCodes.includes(interest.id));
                        let availableTopics = interests.filter((interest) => !interestCodes.includes(interest.id));

                        setInterests(relatedTopics);
                        setInterestsAvailable(availableTopics);
                    })
            })

        return () => source.cancel();
    }, []);
    // get all possible colaborators
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/no-collaborators`, { params: { activityId: id }, cancelToken: source.token })
            .then(({ data }) => {
                setCollaborators(data);
            })

        return () => source.cancel();
    }, []);

    // behaviors

    // control handle function
    const handleChange = (setFunction) => {
        return (event) => { setFunction(event.target.value); }
    }
    // handle close SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    };
    // send invitations
    const submit = (event) => {
        event.preventDefault();

        if (selectedCollaborators.length == 0) {
            setOpen(true);
            setSubmitStatus('error');
            setAlertMessage(EMPTY_COLLABORATORS_MESSAGE);
            return false;
        }

        // send to server
        axios.post(`${BACKEND_URL}/invite/${id}`, selectedCollaborators.map(collaborator => collaborator.id))
        .then(({data}) => {
            setOpen(true);
            setSubmitStatus(data.status === "ok" ? 'success' : 'error');
            setAlertMessage(data.status === "ok" ? SUCCESS_MESSAGE : ERROR_MESSAGE);
        })
        
    }

    return (
        <form className={classes.root} onSubmit={submit}>
            <h1>{`Invitar colaboradores a "${activityName}"`}</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* nombre del docente */}
                    <Autocomplete
                        options={collaborators}
                        debug
                        getOptionLabel={(collab) => collab.fullName}
                        inputValue={name}
                        onInputChange={(event, newInputValue) => {
                            setName(newInputValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Nombre docente" variant="outlined" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Selector de intereses de la actividad */}
                    <InterestsSelector
                        interests={interests}
                        setInterests={setInterests}
                        interestsAvailable={interestsAvailable}
                        setInterestsAvailable={setInterestsAvailable}
                    />
                </Grid>
                <Grid item xs={12}>
                    {/* Lista de colaboradores */}
                    <ListaColaboradores
                        collaborators={collaborators}
                        selectedCollaborators={selectedCollaborators}
                        setSelectedCollaborators={setSelectedCollaborators}
                        nameFilter={name}
                        interests={interests}
                    />
                </Grid>
            </Grid>

            <h2>Invitar a</h2>
            <Grid container spacing={2}>
                <Grid item spacing={2}>
                    <CollaboratorsView
                        collaborators={selectedCollaborators}
                        setCollaborators={setSelectedCollaborators}
                        customEmptyMessage="No has seleccionado ningún docente aún"
                    />
                </Grid>
            </Grid>

            <h2>Mensaje de invitación</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* Mensaje de invitacion */}
                    <TextField
                        label="Invitacion"
                        value={invitationMessage}
                        variant="outlined"
                        multiline
                        rows={4}
                        InputProps={{ required: true }}
                        fullWidth
                        onChange={handleChange(setInvitationMessage)}
                    />
                </Grid>
            </Grid>

            {/* enviar invitacion */}
            <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
            >
                Enviar
            </Button>
            {/* alert message */}
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={submitStatus}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </form>
    )
}
