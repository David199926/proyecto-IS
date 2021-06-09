import GeneReport from './Forms/GenerarReporte';
import ExportReport from './Forms/ExportarReporte';
import ResultReport from './Forms/ResultadoReporte';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core'
import { TableResultado } from '../Explorar/TableResultado';

import './ReportePersonalizado.css'

const theme = createMuiTheme({
  palette:{
    secondary:{
      main:'#ffd413'
    }
}});

function Report() {
  return (

    <div>
      <Grid className="main-container-crear" container spacing={2} >
      <Grid item >
        <h1>Reporte personalizado</h1>
      </Grid>
      <Grid item container spacing={2}>
          <Grid  item xs={4} >
          <GeneReport/> 
          </Grid>
          
        <Grid item xs={7} alignItems="center" justify="center">
          <h2>Resultado</h2>
          <TableResultado/>
          <br/>
          <ExportReport />
        </Grid>
        
     </Grid>
     
   
        </Grid>
    </div>
    
  );
}

export default Report;

