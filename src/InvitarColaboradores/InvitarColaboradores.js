import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Material UI
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';

// my componets
import { InterestsSelector } from '../commonComponents/InterestsSelector/InterestsSelector';
import { CollaboratorsView } from '../commonComponents/CollaboratorsView/CollaboratorsView';
import { ListaColaboradores } from './ListaColaboradores';

import axios from 'axios';

// constants
import { BACKEND_URL } from '../Constants/constants.js';
// auth
import auth from '../auth';

// styles
import { makeStyles } from '@material-ui/core/styles';

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
        'Hola, te invito a que perticipes en el desarrollo de esta actividad'
    );

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
        const userId = auth.getUserData().id;

        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/others`, { params: { id: userId }, cancelToken: source.token })
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

    return (
        <form className={classes.root}>
            <h1>{`Invitar colaboradores a "${activityName}"`}</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* nombre del docente */}
                    <Autocomplete
                        options={collaborators}
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
        </form>
    )
}
