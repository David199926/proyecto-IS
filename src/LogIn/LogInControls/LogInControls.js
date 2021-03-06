import React, { useState } from 'react';
import logo from '../../Resources/Images/logo.png';
// styles
import './LogInControls.css';
// styles
import { makeStyles } from '@material-ui/core/styles';

// material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

// my components
import PasswordInput from './PasswordInput/Password';

// constants and utils
import { BACKEND_URL } from '../../Constants/constants.js';
import auth from '../../auth';
const EMPTY_MESSAGE = "Este campo es obligatorio";

// styles
const useStyles = makeStyles((theme) => ({
    Link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}));

function LogInControls(props) {

    // styles
    const classes = useStyles();

    // state
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState({ username: "", password: "" });

    // state handlers
    const handleCheck = (setFunction) => {
        return (event) => { setFunction(event.target.checked) }
    }
    const handleChange = (setFunction) => {
        return (event) => { setFunction(event.target.value) }
    }

    const checkEmptyFields = () => {
        const usernameMessage = username === "" ? EMPTY_MESSAGE : "";
        const passwordMessage = password === "" ? EMPTY_MESSAGE : "";
        setErrorMessage({ username: usernameMessage, password: passwordMessage });
        return username !== "" && password !== "";
    }

    const submit = (event) => {
        event.preventDefault();
        // non empty fields

        let empties = checkEmptyFields();
        if (!empties) return false;

        // backend validation
        axios.post(`${BACKEND_URL}/validate`, {
            username,
            password,
        })
            .then(response => {
                const { error, user } = response.data;
                if (error === null) {
                    // all is correctly
                    auth.login(() => {
                        sessionStorage.setItem('userId', user.id);
                        auth.setUserData(user);
                        props.history.push('/mis-actividades');
                        return true;
                    });
                }
                // unregistered user
                if (error === 0) {
                    setErrorMessage({
                        username: "Este usuario no se encuentra registrado",
                        password: "",
                    });
                }
                // wrong password
                if (error === 1) {
                    setErrorMessage({
                        password: "Contrase??a incorrecta",
                        username: "",
                    });
                }
                return false;
            })
    }

    return (
        <form className="login-controls-container" onSubmit={submit}>
            <div className="login-controls">
                <img src={logo} alt="logo" />
                <h1>Inicia sesi??n</h1>
                <Grid container spacing={2}>
                    {/* username */}
                    <Grid item xs={12}>
                        <TextField
                            id="user-name"
                            label="Nombre de usuario"
                            variant="outlined"
                            value={username}
                            onChange={handleChange(setUsername)}
                            fullWidth
                            error={errorMessage.username !== ""}
                            helperText={errorMessage.username}
                        />
                    </Grid>
                    {/* password */}
                    <Grid item xs={12}>
                        <PasswordInput
                            password={password}
                            onChange={handleChange(setPassword)}
                            error={errorMessage.password !== ""}
                            helperText={errorMessage.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-space-between">
                            {/* checkbox */}
                            <FormControlLabel
                                label="Recu??rdame"
                                control={
                                    <Checkbox color="primary" checked={rememberMe} onChange={handleCheck(setRememberMe)} />
                                }
                            />
                            <Link className={classes.Link} >??Olvid?? su contrase??a?</Link>
                        </div>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Acceder
                </Button>
            </div>
        </form>
    )
}

export default LogInControls;