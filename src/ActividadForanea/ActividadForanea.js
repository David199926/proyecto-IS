import { Grid, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import { BarraProgreso } from './BarraProgreso'
import { Colaboradores } from './Colaboradores';
import { DescripCionActividad } from './DescripCionActividad';
import { InformacionActividad } from './InformacionActividad';
import { SolicitarColaboracion } from './SolicitarColaboracion';
import { TemasRelacionados } from './TemasRelacionados';
import { BACKEND_URL } from '../Constants/constants'
import { useParams } from 'react-router-dom'
import './component.css'

export const ActividadForanea = () => {

    const [state, setState] = useState({});
    const [interest, setInterest] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const { activityid } = useParams();

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

    const obtenerColaboradores = async () => {
        const url = `${BACKEND_URL}/collabs?id=${activityid}`;
        const options = {
            method: 'GET',
            headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
        }

        const response = await fetch(url, options);
        const data = await response.json();

        return data;
    }

    useEffect(
        () => {
            obtenerActividad()
            .then(data => {
                setState(data)
                obtenerIntereses()
                .then( interests => {
                    setInterest(interests.filter((i) => data['temas relacionados'].includes(i.id)));
                })
                obtenerColaboradores()
                .then( colaboradores => {
                    setCollaborators(colaboradores);
                })
            })
            
        }, []);

    return (


        <Grid container >

            <Grid container spacing={2}>

                <Grid item xs={12} >
                    <h1>{`Detalles de ${state['título']}`}</h1>
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
                <TemasRelacionados labels={interest.map(i => i.nombre)} />
            </Grid>

            <Grid container className="separar-arriba">
                <Colaboradores collaborators={collaborators.map(c => c.fullName)}/>
            </Grid>

            <Grid container className="separar-arriba">
                <SolicitarColaboracion />
            </Grid>

        </Grid>
    )
}
