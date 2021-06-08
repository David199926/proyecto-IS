import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { ActividadForanea } from './ActividadForanea';
import MenuIcon from '@material-ui/icons/Menu';


export const TableResultado = () => {
    const [state, setState] = useState([{}]);
    // for refreshing porpouses
    const [refresher, setRefresher] = useState(false);
    const refresh = () => { 
      console.log();
      setRefresher(!refresher) 
    }

    const getActividadesAcademicas = async () => {
        const url = 'http://localhost:4000/publicActivities';
    

    const options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({codigoCreador : sessionStorage.getItem('userId')})
      
    }

    const response = await fetch(url, options);
    const data = await response.json();

    const auxiliarData = [];

    for (let i = 0; i < data.length; i++) {
        auxiliarData.push({
          nombre: data[i].data['título'],
          tipo: data[i].data.tipo,
          progreso: data[i].data.progreso,
          fecha: data[i].data['periodo de inicio'],
          acciones: <div>
             <ActividadForanea idActividad={data[i].id} />
          </div>
        });
      }

      setState(auxiliarData);
    }
    useEffect(() => {
        getActividadesAcademicas();
      }, []);
      // refresh when refresher changes
      useEffect(() => {
        getActividadesAcademicas();
      }, [refresher]);


      const columnas = [
        { title: 'Nombre', field: 'nombre' },
        { title: 'Tipo', field: 'tipo', sorting: false },
        { title: 'Progreso (%)', field: 'progreso' },
        { title: 'Fecha Creación', field: 'fecha' },
        { title: 'ver', field: 'acciones', sorting: false }
      ];

      const data= state;

      return (

        <div style={{ width: '100%' }}>
    
          <MaterialTable
            columns={columnas}
            data={data}
            title=""
            options={
              {
                paging: false,
                search: true,
                draggable: false,
              }
            }
            localization={
              {
                
                toolbar: { searchPlaceholder: 'Nombre de la actividad' },
                body: { emptyDataSourceMessage: 'No hay actividades para mostrar' }
              }
            }
          />
    
        </div>
      )
}