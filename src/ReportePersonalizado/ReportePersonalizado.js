import GeneReport from './Forms/GenerarReporte';
import ExportReport from './Forms/ExportarReporte';
import ResultReport from './Forms/ResultadoReporte';
import AppBarDrawerD from '../AppBarDrawerD/AppBarDrawerD';
import {  createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette:{
    secondary:{
      main:'#ffd413'
    }
}});

function Report() {
  return (
    <div className="container" Style={ 'padding-top: 60px'} >
      <AppBarDrawerD   />
      <h1>Reporte personalizado</h1>
      
        <div Style={" padding-left: 50px"  }>
        <ThemeProvider theme={theme}>
            <GeneReport/> 
           
            <div>
            
                <ResultReport/>
                <div Style={" padding-left: 300px  "  }>
                    <ExportReport />
                </div>
            </div>


            </ThemeProvider>
        </div>
    </div>
    
  );
}

export default Report;