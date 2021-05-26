import { Button } from '@material-ui/core'
import React from 'react'
import DeleteIcon from '@material-ui/icons/Delete'

export const EliminarActividad = ({ idActividad }) => {

    const eliminar = async () => {



        const url = 'http://localhost:4000/mis-actividades/delete';
        const options ={
            method: 'POST',
            headers: {'Content-type': 'application/json' ,'Accept': 'application/json'},
            body: JSON.stringify({id : idActividad})
        }
        
        fetch(url,options)
            .then(response => response.json())
            .then(response => {console.log(response);})
            .then(window.location.reload())
            .catch(err => console.log(err));
           

    }

    return <Button onClick={eliminar} startIcon={<DeleteIcon />} />
}
