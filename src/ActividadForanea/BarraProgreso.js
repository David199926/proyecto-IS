import React , {useState ,useEffect} from 'react'

import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export const BarraProgreso = ({porcentajeProgreso}) => {

    const [progreso , setProgreso]  = useState(0);

    const porccentajProgresoEffect = useEffect(() => {
        setProgreso(porcentajeProgreso);
    }, [porcentajeProgreso]);

    return (
        <>
        <Typography variant="body2" color="textSecondary">Progreso</Typography>


<Box display="flex" alignItems="center">


    <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={progreso} />
    </Box>

    <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{progreso}%</Typography>

    </Box>


</Box>
        </>
    )
}
