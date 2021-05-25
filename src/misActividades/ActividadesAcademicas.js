import React , {useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

import {EditarActividad } from './EditarActividad';
import {EliminarActividad } from './EliminarActividad';

export const ActividadesAcademicas = () => {
    
  const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

  const classes = useStyles();

  const [state, setState] = useState([{}]);


  const getActividadesAcademicas = async () => {
    const url = 'http://localhost:4000/mis-actividades/academicas';
    const response = await fetch(url);
    const data = await response.json();

    const auxiliarData = [];

    for (let i = 0; i < data.length; i++) {
      auxiliarData.push({
        nombre: data[i].data.nombre, tipo: data[i].data.tipo,
        progreso: data[i].data.progreso, fecha: data[i].data.fecha,
        acciones: <><EditarActividad /> <EliminarActividad idActividad={data[i].id}/> </>
      });

    }

    setState(auxiliarData);

  }

  useEffect(() => {
    getActividadesAcademicas();
  }, []);



  const rows = state;

  return (
    <>
      <Typography color="textPrimary" variant="h3">Profesionales</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Progreso &nbsp; (%)</TableCell>
              <TableCell align="right">Fecha de creación</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.nombre}>
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="right">{row.tipo}</TableCell>
                <TableCell align="right">{row.progreso}</TableCell>
                <TableCell align="right">{row.fecha}</TableCell>
                <TableCell align="right">{row.acciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
