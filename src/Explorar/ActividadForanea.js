import React from 'react'
import { Button  } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';

export const ActividadForanea = (props) => {
    return <Link to={`/foranea/${props.idActividad}`}><Button startIcon={<VisibilityIcon/>}/></Link>
}