import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

import './component.css'

export const DescripCionActividad = ({ descripcion }) => {

    const [descripcionState, setDescripcionState] = useState('state');

  useEffect(() => {
      setDescripcionState(descripcion);
  }, [descripcion])

  

    return (
        <Grid container style={{ 'text-align':'justify'}}>
        <Typography variant="body1" gutterBottom>{descripcionState}</Typography>
        </Grid>
    )
}
