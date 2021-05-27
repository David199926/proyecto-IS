import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// styles
const useStyles = makeStyles((theme) => ({
    Link:{
      textDecoration: 'none',
      color: theme.palette.text.primary
    }
  }));

// constants
function GeneReports() {
    // const values  
    const classes = useStyles();
    const reportesValues = 
    [
        'Actividades realizadas durante un periodo académico', 
        'Actividades de un tipo',
        'Actividades de un docente durante un periodo académico', 
        'Docentes que han registrado actividades',
        'Docentes que no han registrado actividades durante un periodo académico',
        'docente que más actividades ha registrado'
    ];

    // component state
    const [reportes, setReportes] = useState(reportesValues[0]);

    // get menu items for a select control
    const getMenuItems = (array) => {
        return (array.map((option, index) => (
            <MenuItem key={index} value={option}>
                {option}
            </MenuItem>
        )))
    }

    // control handle function
    const handleChange = (setFunction) => {
        return (event) => { setFunction(event.target.value); }
    }
    
 
    
    return (
        <div>
            <Grid container spacing={2} alignItems="center" justify="center">                
                <Grid item xs={5}>
                    {/* periodo académico de inicio */}
                    <TextField
                        id="reportes"
                        select
                        label="Tipo"
                        value={reportes}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange(setReportes)}
                    >
                        {getMenuItems(reportesValues)}
                    </TextField>
                </Grid>

                <Grid container direction="row" item xs={3}>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    Generar
                </Button>
                
                </Grid>

                <Grid container direction="row" item xs={4}>
                <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                >
                    <a  href="/personalizado" className={classes.Link}>Reporte personalizado</a>
                </Button>
                </Grid>

            </Grid>

            
        </div>
    )
}

export default GeneReports