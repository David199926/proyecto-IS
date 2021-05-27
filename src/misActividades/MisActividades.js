import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { ActividadesAcademicas } from './ActividadesAcademicas'
import { ActividadesProfesionales } from './ActividadesProfesionales'
import { NuevaActividad } from './NuevaActividad'
import {withRouter} from 'react-router-dom'

export const MisActividades = (props) => {

    //console.log('ID',sessionStorage.getItem('userId'));
    
    return (
        <div>
            <Grid style={{ 'margin-top': '30px', 'margin-left': '320px' }}>
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
                        <NuevaActividad history={props.history} />
                    </Grid>

                </Grid>

            </Grid>
        </div>
    )
}
