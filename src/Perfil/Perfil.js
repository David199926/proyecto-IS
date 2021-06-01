import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { InterestsSelector } from '../commonComponents/InterestsSelector/InterestsSelector';

// styles
import './Perfil.css';
import perfil from '../Resources/Images/perfil.png'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// axios
import axios from 'axios';
import { BACKEND_URL } from '../Constants/constants';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },

}));

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffd413'
        }
    }
});


export default function Perfil() {
    const classes = useStyles();

    // component state
    const [profileImg, setImg] = useState(perfil);
    const [legend, setLegend] = React.useState('');
    const [errorTopic, seterrorTopic] = React.useState(false);


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

    const interestValues = [
        { id: "123", nombre: "interes1" },
        { id: "456", nombre: "interes2" },
    ];

    // component state
    const [name, setName] = useState('Julian Benavides');
    const [totalActivities, setTotalActivities] = useState(0);
    const [collabs, setCollabs] = useState(0);
    const [unfinished, setUnfinished] = useState(0);
    const [finished, setFinished] = useState(0);
    // interests
    const [interests, setInterests] = useState([]);
    const [interestsAvailable, setInterestsAvailable] = useState(interestValues)

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
    }, [])

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
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" component="span">
                                    Guardar
                </Button>
                            </ThemeProvider>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}