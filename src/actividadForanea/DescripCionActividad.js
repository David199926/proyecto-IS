import React, { useState, useEffect } from 'react'
import Typography from '@material-ui/core/Typography';


export const DescripCionActividad = ({ descripcion }) => {

    const [descripcionState, setDescripcionState] = useState('state');

  useEffect(() => {
      setDescripcionState(descripcion);
  }, [descripcion])

    return (
        <Typography variant="body1" gutterBottom>{descripcionState}</Typography>
    )
}
