import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// styles
import './styleForms.css'

function ExportReport() {
    
    const exportar = ['.PDF', '.XLSX'];

    // component state
    const [startExportar, setExportar] = useState(exportar[0]);


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
        <div className="exportR"  Style={" padding-top: 60px "  }>
            <Grid container spacing={0} alignItems="center" justify="center" >
                <Grid item xs={5} >
                    {/* periodo académico de inicio */}
                    <TextField
                        id="startExportar"
                        select
                        label="Formato reporte"
                        value={startExportar}
                        variant="outlined"
                        fullWidth
                        onChange={handleChange(setExportar)}
                        justify="center"
                    >
                        {getMenuItems(exportar)}
                    </TextField>
                    
                </Grid>
                <Grid item xs={4}> 
                <Grid container direction="row" alignItems="center" justify="center">
                <Button variant="contained" color="secondary" component="span">
                  Exportar
                 </Button>
                </Grid>
                </Grid>


            </Grid>

            
        </div>
    )
}

export default ExportReport