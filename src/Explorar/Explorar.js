import Busqueda from './Forms/Busqueda';
import { TableResultado } from './TableResultado';
import { Typography, Grid } from '@material-ui/core'


export const Explorar = () => {
  
  return (
    <div>
    <Grid className="main-container-crear" container spacing={2} >
      <Grid item >
        <h1>Explorar</h1>
      </Grid>
      <Grid item container spacing={2}>
          <Grid  item xs={4} >
          <Busqueda/> 
          </Grid>
         <Grid item xs={7}>
         <TableResultado/>
           </Grid>
     </Grid>
   
        </Grid>
    </div>
    
  );
}


