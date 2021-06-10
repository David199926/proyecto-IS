import { Chip, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState, } from 'react'

export const TemasRelacionados = ({labels}) => {

    //console.log(codigo);

    return (
        <>
            <Grid container>
                <Typography variant='h6'>Temas relacionados</Typography>
            </Grid>

            <Grid container>
              {
                  labels.length == 0 ? 'No hay temas registrados': labels.map((interest) => (
                      <Chip label = {interest} > </Chip>
                  )) 
              }
            </Grid>
        </>
    )
}
