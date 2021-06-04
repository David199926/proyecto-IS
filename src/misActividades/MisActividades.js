import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import { TableActivities } from './TableActivities'

// My components
import { NuevaActividad } from './NuevaActividad'

// auth
import auth from '../auth';

export const MisActividades = (props) => {
<<<<<<< HEAD

    const gestionCheck = () => {
        if (!auth.getUserData().directivo) return null;
        return (
            <Grid item xs={11}>
                <TableActivities title="Gestión" dataSource="mis-actividades/gestion" />
            </Grid>
        )

    }

=======
    
>>>>>>> 79f8f3c702e9e1d11cd66ccac45415e4533d8818
    return (
        <div>
            <Grid className="main-container-crear" container spacing={2}>
                <Grid item>
                    <h1>Mis Actividades</h1>
                </Grid>
                <Grid container spacing={5}>
                    {/* actividades de tipo academicas */}
                    <Grid item xs={11}>
                        <TableActivities title="Académicas" dataSource="mis-actividades/academicas" />
                    </Grid>
                    {/* actividades de tipo profesional */}
                    <Grid item xs={11}>
                        <TableActivities title="Profesionales" dataSource="mis-actividades/profesionales" />
                    </Grid>
                    {/* actividades de tipo gesion */}
                    {gestionCheck()}
                    <Grid item>
                        <NuevaActividad history={props.history} />
                    </Grid>

                </Grid>

            </Grid>
        </div>
    )
}
