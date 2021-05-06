import React from 'react';
import logo from '../../Resources/Images/logo.png';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import Link from '@material-ui/core/Link';

import Grid from '@material-ui/core/Grid';

import './LogInControls.css';

import PasswordInput from './PasswordInput/Password';

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
                            value={username}
                            onChange={onChangeUsername}
                            fullWidth
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

export default LogInControls;