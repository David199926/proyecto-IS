import React from 'react'
import { Button  } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export const EditarActividad = (props) => {

    return <Link to={`/editar/${props.idActividad}`}><Button startIcon={<EditIcon/>}/></Link>
}
