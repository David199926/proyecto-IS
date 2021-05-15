import { Chip, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState, } from 'react'

export const TemasRelacionados = ({ temas }) => {


    const [state, setState] = useState(
        { listaTemas: ["default", "activity"] }
    );


    useEffect(() => {
        setState(temas);
    }, []);

    const listaTemas = ["HOLA"];
    const auxiliar = () =>{

    }
    

    return (
        <>
            <Grid container>
                <Typography variant='h6'>Temas relacionados</Typography>
            </Grid>

            <Grid container>
               {
                   console.log(state)
               }
               <Chip label="Deep learning"/>
               <Chip label="Computación afectiva"/>
            </Grid>
        </>
    )
}
