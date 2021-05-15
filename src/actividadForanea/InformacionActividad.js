import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export const InformacionActividad = () => {
    
    
    return (
        <>
            <Grid container >

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Categoria
                    </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            Academica
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Tipo de actividad
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            Proyecto de investigación
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Periodo académico de inicio
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            2020-3
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Periodo académico de finalización
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            2021-1
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Código
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            0000
                    </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={3}>
                        <Typography color={'textPrimary'} variant="h6" gutterBottom>
                            Rol
                        </Typography>
                    </Grid>

                    <Grid item >
                        <Typography color={'textSecondary'} variant="h6" gutterBottom>
                            Director
                    </Typography>
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}
