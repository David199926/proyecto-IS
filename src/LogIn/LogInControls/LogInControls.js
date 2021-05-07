import React, { useState } from 'react';
import logo from '../../Resources/Images/logo.png';
import './LogInControls.css';

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

// constants
import { BACKEND_URL } from '../../Constants/constants.js';
const EMPTY_MESSAGE = "Este campo es obligatorio";

function LogInControls() {

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
                let error = response.data.error;
                if (error === null) {
                    // all is correctly
                    window.location = '/crear';
                    return true;
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
                        password: "Contraseña incorrecta",
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
                <h1>Inicia sesión</h1>
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
                                label="Recuérdame"
                                control={
                                    <Checkbox color="primary" checked={rememberMe} onChange={handleCheck(setRememberMe)} />
                                }
                            />
                            <Link href="#">¿Olvidó su contraseña?</Link>
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