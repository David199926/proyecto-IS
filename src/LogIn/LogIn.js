import React, { useState } from 'react';
import './LogIn.css';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import LogInControls from './LogInControls/LogInControls'

function LogInImage() {
    return (
        <div className="login-image-container"></div>
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
