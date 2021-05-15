import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, IconButton, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { EliminarActividad } from './EliminarActividad';
import { EditarActividad } from './EditarActividad';

export const ActividadesProfesionales = () => {

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      
      function createData(nombre, tipo, progreso, fecha, acciones) {
        return { nombre, tipo, progreso, fecha, acciones};
      }
      
      const rows = [
        createData('Actividad 1', 'Tipo 1', 10, '24/04/2021'),
        createData('Actividad 2', 'Tipo 2', 20, '24/04/2021',),
        createData('Actividad 3', 'Tipo 3', 30, '24/04/2021',),
     
      ];

      const classes = useStyles();

    return (
        <>
       <Typography variant="h2">Profesionales</Typography>
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
                <TableCell align="right"><><EditarActividad/><EliminarActividad/></></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
       </>
    )
}
