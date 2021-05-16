import { Button  } from '@material-ui/core'
import React , {useState , useEffect} from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

export const EliminarActividad = ({idActividad}) => {

    const [state,setState] = useState(0);

    useEffect(()=>{
        setState(idActividad);
    } ,[idActividad]);

    useEffect(()=>{
        setState(idActividad);
    } ,[]);

    const eliminar = () =>{
        /*
        * Logica para eliminar la actividad de la BD
        */
    }

    return <Button onClick={eliminar} startIcon={<DeleteIcon/>}/>      
}
