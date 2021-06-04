import React from 'react'
import {Button} from '@material-ui/core'
import { Link } from 'react-router-dom';

// styles
import { makeStyles } from '@material-ui/core/styles';

// styles
const useStyles = makeStyles((theme) => ({
    Link: {
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }));

export const NuevaActividad = () => {

    const classes = useStyles();

    return (
        <Link to='/crear' className={classes.Link}>
            <Button variant="contained" color="primary" >Nueva actividad +</Button>
        </Link>
    )
}
