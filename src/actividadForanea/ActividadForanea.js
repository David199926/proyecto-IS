import { Grid, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { BarraProgreso } from './BarraProgreso'
import { Colaboradores } from './Colaboradores';
import { DescripCionActividad } from './DescripCionActividad';
import { InformacionActividad } from './InformacionActividad';
import { SolicitarColaboracion } from './SolicitarColaboracion';
import { TemasRelacionados } from './TemasRelacionados';



const ActividadForanea = () => {

    const initialState = {
        porcentajeProgreso: 23,
        descripcion: 'Ea possimus excepturi. Sit occaecati sit quidem sint dolorem voluptas. Nesciunt pariatur dolorem. Error error reiciendis voluptatum aperiam dolores reiciendis nihil fugiat.',
        categoria: 'Academica',
        tipoActividad: 'Proyecto de investigación',
        periodoAcademicoInicio: '2020-3',
        periodoAcademicoFin: '2021-1',
        codigo: 12345,
        rol: 'Director',
        listaTemas: ['Deep Learning', 'Computación afectiva'],
        colaboradores: ['Bill Pacocha', 'Jimmie Hamill', 'Stuart Tromp'],
    }

    const [state, setState] = useState(initialState);

    return (
        <>
            <Grid conatainer>
                <Typography variant="h2">Actividad 1</Typography>
            </Grid>

            <Grid container>



                <Grid item md={3}>
                    < BarraProgreso porcentajeProgreso={state.porcentajeProgreso} />
                </Grid>
            </Grid>

            <Grid container md={4}>
                < DescripCionActividad descripcion={state.descripcion} />
            </Grid>

            <Grid container md={9}>
                <InformacionActividad />
            </Grid>

            <Grid>
                <TemasRelacionados temas={state.listaTemas} />
            </Grid>

            <Grid>
                <Colaboradores />
            </Grid>

            <Grid md={10}>
                <SolicitarColaboracion />
            </Grid>



        </>
    )
}

export default ActividadForanea;
