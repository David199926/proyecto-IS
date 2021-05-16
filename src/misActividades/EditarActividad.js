import React , {useState , useEffect} from 'react'
import { Button  } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

export const EditarActividad = (actividad) => {

    const [state,setState] = useState({});

    useEffect(()=>{
        setState(actividad);
    },[]);

    useEffect(()=>{
        setState(actividad);
    },[actividad]);
    
    const editar = () =>{
        /*
        * Logica para editar la actividad
        */
    }

    return <Button onClick={editar} startIcon={<EditIcon/>}/>
}
