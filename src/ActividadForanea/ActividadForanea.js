import { Grid, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { BarraProgreso } from './BarraProgreso'
import { Colaboradores } from './Colaboradores';
import { DescripCionActividad } from './DescripCionActividad';
import { InformacionActividad } from './InformacionActividad';
import { SolicitarColaboracion } from './SolicitarColaboracion';
import { TemasRelacionados } from './TemasRelacionados';
import {BACKEND_URL} from '../Constants/constants'
import { useParams } from 'react-router-dom'
import './component.css'

export const ActividadForanea = () => {

    const [state, setState] = useState({});
    const {activityid} = useParams();
    
    const obtenerActividad = async () => {
        const url = `${BACKEND_URL}/categories-types`
        const response = await fetch(url);
        const data = await response.json();

        return data;
    }

    useEffect(
       async () => {
            const data = await obtenerActividad();
            setState(data);
        }, []);

    return (


        <Grid container style={{'margin-top': '30px','margin-left': '420px' ,}} className="componente" >

            <Grid container spacing={4}>

                <Grid item xs={12} >
                    <Typography variant="h2">{state.titulo}</Typography>
                </Grid>

                <Grid item xs={12} sm={4} style={{ 'margin-bottom': '25px' }}>
                    < BarraProgreso porcentajeProgreso={state.porcentajeProgreso} />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    < DescripCionActividad descripcion={state.descripcion} />

                </Grid>
            </Grid>

            <Grid container className="separar-arriba">
                <InformacionActividad 
                categoria={state.categoria}
                tipoActividad={state.tipoActividad}
                periodoAcademicoInicio={state.periodoAcademicoInicio}
                periodoAcademicoFin={state.periodoAcademicoFin}
                codigo={state.codigo}
                rol={state.rol}
                />
            </Grid>

            <Grid className="separar-arriba">
                <TemasRelacionados temas={state} />
            </Grid>

            <Grid container className="separar-arriba">
                <Colaboradores />
            </Grid>

            <Grid container className="separar-arriba">
                <SolicitarColaboracion />
            </Grid>

        </Grid>
    )
}
