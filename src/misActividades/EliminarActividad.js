import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';



export const EliminarActividad = ({ idActividad, refresh}) => {

    const [open, setOpen] = useState(false);

    const eliminar = async () => {
        const url = 'http://localhost:4000/mis-actividades/delete';
        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ id: idActividad })
        }

        fetch(url, options)
            .then(response => response.json())
            .then(response => { console.log(response); })
            .then(refresh())
            .catch(err => console.log(err));
    }


    const handleOpen = () => {
        setOpen(true);
    };

    // handle close SnackBar
    const handleClose = (event, reason) => {
        setOpen(false);
    };

    return (

        <>
            <Button onClick={handleOpen} startIcon={<DeleteIcon />} />

            <Snackbar open={open} >
                <Alert severity="warning">
                    ¿Realmente quiere eliminar esta actividad?
                    <Button startIcon={<CheckIcon />} onClick={eliminar} />
                    <Button startIcon={<ClearIcon />} onClick={handleClose} />

                </Alert>
            </Snackbar>

        </>

    )
}
