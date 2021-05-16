import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { ActividadesAcademicas } from './ActividadesAcademicas'
import { ActividadesProfesionales } from './ActividadesProfesionales'
import { NuevaActividad } from './NuevaActividad'

export const MisActividades = () => {
    
    
    return (
        <>

        <Grid style={{'margin-top': '10px','margin-left': '120px'}}>
            <Grid item>
                <Typography variant="h2">Mis Actividades</Typography>
            </Grid>
            <Grid container spacing={5}>
                <Grid item xs={11}>
                    < ActividadesAcademicas />
                </Grid>

                <Grid item xs={11}>
                    < ActividadesProfesionales />
                </Grid>

                <Grid item>
                    <NuevaActividad />
                </Grid>

            </Grid>

            </Grid>
        </>
    )
}