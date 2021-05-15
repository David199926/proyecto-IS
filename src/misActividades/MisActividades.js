import React from 'react'
import {Typography , Grid } from '@material-ui/core'
import { ActividadesAcademicas } from './ActividadesAcademicas'
import { ActividadesProfesionales } from './ActividadesProfesionales'
import { NuevaActividad } from './NuevaActividad'

export const MisActividades = () => {
    return (
        <>
        <Typography variant="h2">Mis Actividades</Typography>

        <Grid container>
            < ActividadesAcademicas />
            < ActividadesProfesionales /> 
        </Grid>

        <NuevaActividad />

        </>
        
        
    )
}
