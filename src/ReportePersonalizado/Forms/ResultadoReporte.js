import * as React from 'react';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import './styleForms.css'

const data=[
    {actividad:'Actividad 1', clasificacion: 'Gestión', tipo: 'tipo 1', periodo:'2021-1', autor:'Juan Manuel Molina' },
    {actividad:'Actividad 2', clasificacion: 'Academica', tipo: 'tipo 2', periodo:'2020-1', autor:'Juan Manuel Molina' },
    {actividad:'Actividad 3', clasificacion: 'Profesional', tipo: 'tipo 3', periodo:'2020-2', autor:'Juan Manuel Molina' },
    {actividad:'Actividad 4', clasificacion: 'Academica', tipo: 'tipo 2', periodo:'2021-3', autor:'Juan Manuel Molina' },
    {actividad:'Actividad 5', clasificacion: 'Profesional', tipo: 'tipo 3', periodo:'2021-3', autor:'Juan Manuel Molina' }
]

const styles = makeStyles({
    tablaMaterial: {
        minWidth: 530
    }
})

export default function ResultReport() {
    const classes=styles();
  return (
    <div className="resultR" >
        <h2>Resultado Reporte</h2>
        <TableContainer aling="center">
            <Table className ={classes.tablaMaterial}>
                <TableHead>
                    <TableRow>
                        <TableCell>Actividad</TableCell>
                        <TableCell>Clasificacion</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Periodo</TableCell>
                        <TableCell>Autor</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data.map(celda=>(
                      <TableRow>
                          <TableCell>{celda.actividad}</TableCell>
                          <TableCell>{celda.clasificacion}</TableCell>
                          <TableCell>{celda.tipo}</TableCell>
                          <TableCell>{celda.periodo}</TableCell>
                          <TableCell>{celda.autor}</TableCell>
                      </TableRow>  
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>
  );
}
