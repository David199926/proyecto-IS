import React, { useState, useEffect } from 'react';
// Material UI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
// alert message
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// My components
import { InterestsSelector } from '../commonComponents/InterestsSelector/InterestsSelector';

// styles
import './Perfil.css';
import perfil from '../Resources/Images/perfil.png'
import { makeStyles } from '@material-ui/core/styles';

// axios
import axios from 'axios';
import { BACKEND_URL } from '../Constants/constants';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

}));

export default function Perfil() {

    const classes = useStyles();

    // component state
    const [profileImg, setImg] = useState(perfil);

    //handle image reader
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }
    // handle close SnackBar
    const handleClose = ({reason}) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    // component state
    const [open, setOpen] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("success");
    // suer info
    const [name, setName] = useState('Usuario');
    const [totalActivities, setTotalActivities] = useState(0);
    const [collabs, setCollabs] = useState(0);
    const [unfinished, setUnfinished] = useState(0);
    const [finished, setFinished] = useState(0);
    // interests
    const [interests, setInterests] = useState([]);
    const [interestsAvailable, setInterestsAvailable] = useState([])

    // effects

    // info de perfil
    useEffect(() => {
        const source = axios.CancelToken.source();

        const id = sessionStorage.getItem('userId');
        if (id === undefined) throw new Error;

        axios.get(`${BACKEND_URL}/user?id=${id}`)
            .then(({ data }) => {
                setName(data.fullName);
                setTotalActivities(data.totalActivities);
                setCollabs(data.collabs);
                setFinished(data.finished);
                setUnfinished(data.unfinished);
            })

        return () => source.cancel();
    }, []);
    // intereses
    useEffect(() => {
        const source = axios.CancelToken.source();

        axios.get(`${BACKEND_URL}/interests`, { cancelToken: source.token })
            .then(({ data }) => {
                let interests = data;
                const id = sessionStorage.getItem('userId');
                if (id === undefined) throw new Error;

                axios.get(`${BACKEND_URL}/user-interests?id=${id}`, { cancelToken: source.token })
                    .then(({ data }) => {
                        let userInterests = data;
                        if (userInterests.length === 0) {
                            setInterests([]);
                            setInterestsAvailable(interests);
                            return source.cancel;
                        }

                        let available = interests.filter(interest => !userInterests.includes(interest.id))
                        let current = interests.filter(interest => userInterests.includes(interest.id))

                        setInterestsAvailable(available);
                        setInterests(current);
                    })
            })

        return source.cancel;
    }, []);

    const updateInterests = () => {
        if (sessionStorage.getItem('userId') == null) {
            setOpen(true);
            setSubmitStatus('error');
            return false;
        }
        axios.post(`${BACKEND_URL}/user-interests`, {
            interests: interests.map(interest => interest.id),
            id: sessionStorage.getItem('userId'),
        })
            .then(({ data }) => {
                const { status } = data;
                setOpen(true);
                setSubmitStatus(status === 'ok' ? 'success' : 'error');
            })
    }

    return (
        <div className={classes.root}>
            <div className="container" Style={'padding-top: 110px'} >
                {/* foto de perfil*/}
                <div className="img">
                    <img src={profileImg} alt="" id="img" className="img" />
                </div>
                <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler} />
                <div className="label">
                    <label htmlFor="input" className="image-upload"  >
                        <IconButton aria-label="upload picture" component="span" >
                            <PhotoCamera color="primary" />
                        </IconButton>
                    </label>
                </div>
                {/* nombre usuario*/}
                <Typography variant="subtitle2" gutterBottom className="text" Style={"font-size: 3rem"} >
                    {name}
                </Typography>

                <Grid container spacing={2} Style={'padding-top: 23px'}>
                    <Grid item xs={8} Style={" max-width: 57%"}>
                        <Typography variant="h6" gutterBottom className="text1" >
                            Información
                        </Typography>

                        {/* tabla */}
                        <table>
                            <tr>
                                <th class="header"> Número de actividades creadas</th>
                                <td class="data">{totalActivities}</td>
                            </tr>

                            <tr>
                                <th class="header"> Número de actividades en curso</th>
                                <td class="data">{unfinished}</td>
                            </tr>

                            <tr>
                                <th class="header"> Número de actividades terminadas</th>
                                <td class="data">{finished}</td>
                            </tr>

                            <tr>
                                <th class="header"> Número de colaboraciones realizadas</th>
                                <td class="data">{collabs}</td>
                            </tr>
                        </table>
                    </Grid>

                    <Grid item xs={4} Style={" max-width: 43%"}>
                        <div>
                            <Typography variant="h6" gutterBottom className="textt" >
                                Intereses
                            </Typography>

                            <Typography variant="body2" gutterBottom className="txt" Style={"font-size: 0.805rem"} >
                                Define tus áreas de interés para que podamos recomendarte
                                actividades de otros docentes.
                            </Typography>
                            <Grid item xs={12}>
                                {/* Input Temas de interés de la actividad */}
                                <InterestsSelector
                                    interests={interests}
                                    setInterests={setInterests}
                                    interestsAvailable={interestsAvailable}
                                    setInterestsAvailable={setInterestsAvailable}
                                />
                            </Grid>
                        </div>

                        <Grid item xs={8} Style={" padding-top: 40px"}>
                            <Button variant="contained" color="primary" onClick={updateInterests}>
                                Guardar
                            </Button>
                        </Grid>
                        {/* alert message */}
                        <Snackbar open={open} autoHideDuration={4000} >
                            <Alert onClose={handleClose} severity={submitStatus}>
                                {
                                    submitStatus === "success" ?
                                        "Se han actualizado tus intereses con éxito" :
                                        "Ocurrió un problema, inténtalo más tarde"
                                }
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}