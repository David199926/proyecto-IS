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
    const [interest, setInterest] = useState([]);
    const {activityid} = useParams();

    const obtenerActividad = async () => {
        const url = `${BACKEND_URL}/activity/${activityid}`;
        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },  
        }
        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    }

    const obtenerIntereses = async () => {
        const url = `${BACKEND_URL}/interests`;
        const options = {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },  
        }

        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    }

    useEffect(
       async () => {
            const data = await obtenerActividad();
            setState(data);
            
            const datos = await obtenerIntereses();
            setInterest(datos.filter((i) => data['temas relacionados'].includes(i.id)));
        }, []);

    return (


        <Grid container style={{'margin-top': '30px','margin-left': '420px' ,}} className="componente" >

            <Grid container spacing={4}>

                <Grid item xs={12} >
                    <Typography variant="h2">{state['título']}</Typography>
                </Grid>

                <Grid item xs={12} sm={4} style={{ 'margin-bottom': '25px' }}>
                    < BarraProgreso porcentajeProgreso={state['progreso']} />
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12} sm={5}>
                    < DescripCionActividad descripcion={state['descripción']} />
                </Grid>
            </Grid>

            <Grid container className="separar-arriba">
                <InformacionActividad 
                categoria={state['categoria']}
                tipoActividad={state['tipo']}
                periodoAcademicoInicio={state['periodo de inicio']}
                periodoAcademicoFin={state['periodo de finalizacion']}
                codigo={state['codigoCreador']}
                />
            </Grid>

            <Grid className="separar-arriba">
                <TemasRelacionados labels= {interest.map(i => i.nombre)} />
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
