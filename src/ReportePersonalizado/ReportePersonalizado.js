import GeneReport from './Forms/GenerarReporte';
import ExportReport from './Forms/ExportarReporte';
import ResultReport from './Forms/ResultadoReporte';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import './ReportePersonalizado.css'

const theme = createMuiTheme({
  palette:{
    secondary:{
      main:'#ffd413'
    }
}});

function Report() {
  return (
    <div className="container" Style={ 'padding-top: 50px'} >
      <h1  >Reporte personalizado</h1>
      
        <div >
        <ThemeProvider theme={theme}>
            <GeneReport/> 
           
            <div>
            
                <ResultReport/>
                <div Style={" padding-left: 380px  "  }>
                    <ExportReport />
                </div>
            </div>


            </ThemeProvider>
        </div>
    </div>
    
  );
}

export default Report;