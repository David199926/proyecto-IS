import React, { useState } from 'react';
import './LogIn.css';
import logo from '../logo.png';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Link from '@material-ui/core/Link';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
// icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function LogInImage() {
    return (
        <div className="login-image-container"></div>
    )
}

function PasswordInput({ password, onChange }) {

    // state
    const [showPassword, setShowPassword] = useState(false);
    // handle state change
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={(event) => {event.preventDefault();}}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={80}
            />
        </FormControl>
    )
}

function LogInControls(props) {
    const {username, password, rememberMe, onChangeUsername, onChangePassword, onChangeRememberMe} = props;
    return (
        <div className="login-controls-container">
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
                            fullWidth
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </Grid>
                    {/* password */}
                    <Grid item xs={12}>
                        <PasswordInput password={password} onChange={onChangePassword} />
                    </Grid>
                    <Grid item xs={12}>
                        <div className="flex-space-between">
                            {/* checkbox */}
                            <FormControlLabel
                                label="Recuérdame"
                                control={
                                    <Checkbox color="primary" checked={rememberMe} onChange={onChangeRememberMe} />
                                }
                            />
                            <Link href="#">¿Olvidó su contraseña?</Link>
                        </div>
                    </Grid>

                </Grid>
                <Button variant="contained" color="primary" fullWidth>Acceder</Button>
            </div>
        </div>
    )
}

export default function LogIn() {
    // state
    const [rememberMe, setRememberMe] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    // state handlers
    const handleCheck = (setFunction) => {
        return (event) => { setFunction(event.target.checked) }
    }
    const handleChange = (setFunction) => {
        return (event) => { setFunction(event.target.value) }
    }

    return (
        <div className="login-page">
            <Grid container spacing={0}>
                {/* login image banner */}
                <Hidden smDown>
                    <Grid item md={6}>
                        <LogInImage/>
                    </Grid>
                </Hidden>
                {/* login controls */}
                <Grid item xs={12} md={6}>
                    <LogInControls
                        rememberMe = {rememberMe}
                        onChangeRememberMe = {handleCheck(setRememberMe)}
                        username = {username}
                        onChangeUsername = {handleChange(setUsername)}
                        password = {password}
                        onChangePassword = {handleChange(setPassword)}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
