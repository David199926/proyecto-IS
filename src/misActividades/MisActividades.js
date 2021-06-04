import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { ActividadesAcademicas } from './ActividadesAcademicas'
import { ActividadesProfesionales } from './ActividadesProfesionales'
import { NuevaActividad } from './NuevaActividad'

export const MisActividades = (props) => {
    
    return (
        <div>
            <Grid className="main-container-crear" container spacing={2}>
                <Grid item>
                    <h1>Mis Actividades</h1>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item xs={11}>
                        < ActividadesAcademicas history={props.history}/>
                    </Grid>

                    <Grid item xs={11}>
                        < ActividadesProfesionales history={props.history} />
                    </Grid>

                    <Grid item>
                        <NuevaActividad history={props.history} />
                    </Grid>

                </Grid>

            </Grid>
        </div>
    )
}
