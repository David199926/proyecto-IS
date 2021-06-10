import GeneReports from './Forms1/Reportes';
import ExportReport from './Forms1/ExportarReporte';
import ResultReport from './Forms1/ResultadoReporte';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { TableResultado } from '../Explorar/TableResultado';

import './Reporte.css'

const theme = createMuiTheme({
  palette:{
    secondary:{
      main:'#ffd413'
    }
}});

function Reporte() {
  return (
    <div className="container" Style={ 'padding-top: 50px'} >
      <h1  >Reportes</h1>
      
        <div >
        <ThemeProvider theme={theme}>
            <GeneReports/> 
            <br/>
            <div >
            <h2>Resultado</h2>
                <TableResultado/>
                <div >
                    <ExportReport />
                </div>
            </div>


            </ThemeProvider>
        </div>
    </div>
    
  );
}

export default Reporte;