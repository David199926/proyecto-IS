import { Chip, Grid, Typography, Avatar } from '@material-ui/core'
import React from 'react'
import profile from '../Resources/Images/perfil.png'

export const Colaboradores = ({collaborators}) => {
    return (
        <>
            <Grid container>
                <Typography variant='h5'>Colaboradores</Typography>
            </Grid>

            <Grid container>
                {
                    collaborators.length == 0 ? 'No hay colaboradores registrados': collaborators.map((collaborator) => (
                      <Chip avatar={<Avatar alt="User" src={profile} />} label={collaborator} > </Chip>
                  ))
                }
            </Grid>
        </>
    )
}
