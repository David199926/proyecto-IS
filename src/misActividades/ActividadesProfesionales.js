import React, { useState, useEffect } from 'react';
import { EliminarActividad } from './EliminarActividad';
import { EditarActividad } from './EditarActividad';
import MaterialTable from 'material-table'

export const ActividadesProfesionales = () => {

  const [state, setState] = useState([{}]);


  const getActividadesAcademicas = async () => {

    const url = 'http://localhost:4000/mis-actividades/profesionales';
    const response = await fetch(url);
    const data = await response.json();

    const auxiliarData = [];

    for (let i = 0; i < data.length; i++) {
      auxiliarData.push({
        nombre: data[i].data['título'], tipo: data[i].data.tipo,
        progreso: data[i].data.progreso, fecha: data[i].data['periodo de inicio'],
        acciones: <><EditarActividad /> <EliminarActividad idActividad={data[i].id}/> </>
      });

    }

    setState(auxiliarData);
  }

  useEffect(() => {
    getActividadesAcademicas();
  }, []);

  const columnas =  [
    {title: 'Nombre' , field: 'nombre'},
    {title: 'Tipo' ,field: 'tipo', sorting:false},
    {title: 'Progreso (%)',field: 'progreso'},
    {title: 'Fecha Creación',field: 'fecha'},
    {title: 'Acciones',field: 'acciones' , sorting:false}
  ];

  const data= state;
  
  return (

  <div style={{ maxWidth: '100%' }}>
        
        <MaterialTable
          columns={columnas}
          data={data}
          title="Profesionales"
          options={
            {
              paging:false,
              search:true,
              draggable: false
            }         
        }
       
        localization={
          {
            toolbar:{searchPlaceholder : 'Buscar actividad'},
            body: {emptyDataSourceMessage: 'No hay actividades para mostrar'}
          }
        }

        />

      </div>
  )

}
