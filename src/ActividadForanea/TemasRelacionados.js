import { Chip, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState, } from 'react'

export const TemasRelacionados = ({codigo}) => {

    //console.log(codigo);

    return (
        <>
            <Grid container>
                <Typography variant='h6'>Temas relacionados</Typography>
            </Grid>

            <Grid container>
               <Chip label="Deep learning"/>
               <Chip label="Computación afectiva"/>
            </Grid>
        </>
    )
}
