import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export const InformacionActividad = ({ categoria,
    tipoActividad, periodoAcademicoInicio, periodoAcademicoFin, codigo, rol
}) => {


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
                        {categoria}
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
                            {tipoActividad}
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
                            {periodoAcademicoInicio}
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
                        {periodoAcademicoFin}
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
                            {codigo}
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
                            {rol}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>

        </>
    )
}
