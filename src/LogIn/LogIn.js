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
                    <LogInControls/>
                </Grid>
            </Grid>
        </div>
    )
}
