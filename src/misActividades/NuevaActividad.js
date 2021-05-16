import React , {useState , useEffect}from 'react'
import {Button} from '@material-ui/core'


export const NuevaActividad = (actividad) => {

    const [state,setState] = useState({});

    useEffect(
        () => {
            setState(actividad);
        }
    ,[]);

    useEffect(
        () => {
            setState(actividad);
        }
    ,[actividad]);

    const crear = () =>{
        /*
        * Logica para crear la actividad
        */
    }
   
    return <Button onCLick={crear} variant="contained" color="primary">Nueva actividad +</Button>
}
