import React , { useState , useEffect }from 'react'
import { Button } from '@material-ui/core';

export const SolicitarColaboracion = (actividad) => {

    const [state,useState] = useState(actividad);

    const colaboracion = () => {
        /*
        * Logica para solicitar colaborar
        */
    }

    return <Button onClick={colaboracion} justify="stretch" color={'primary'} variant="contained">SOLICITAR SER COLABORADOR</Button>

}
