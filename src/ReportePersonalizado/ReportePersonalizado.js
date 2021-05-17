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
    <div className="container" Style={ 'padding-top: 60px'} >
      <h1 Style={ 'margin-left: 330px'} >Reporte personalizado</h1>
      
        <div clasName="r" Style={ 'margin-left: 330px'}>
        <ThemeProvider theme={theme}>
            <GeneReport/> 
           
            <div>
            
                <ResultReport/>
                <div Style={" padding-left: 500px  "  }>
                    <ExportReport />
                </div>
            </div>


            </ThemeProvider>
        </div>
    </div>
    
  );
}

export default Report;