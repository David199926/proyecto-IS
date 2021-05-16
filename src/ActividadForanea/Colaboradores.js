import { Chip, Grid, Typography , Avatar } from '@material-ui/core'
import React, { useEffect, useState, } from 'react'

export const Colaboradores = () => {
    return (
        <>
        <Grid container>
            <Typography variant='h5'>Colaboradores</Typography>
        </Grid>

        <Grid container>
        <Chip avatar={<Avatar>D</Avatar>} label="Docente 1"  />
        <Chip avatar={<Avatar>D</Avatar>}  label="Docente 2"/>

        </Grid>
    </>
    )
}
