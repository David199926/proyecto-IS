import React , {useEffect ,useState} from 'react';
import MaterialTable from 'material-table';
import { VerActividad } from './VerActividad';

export const ActividadesForaneas = () => {
    
    const [state, setState] = useState([{}]);


    const getActividadesAcademicas = async () => {
      const url = 'http://localhost:4000/activities/public';
      
      const options = {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({codigoCreador : sessionStorage.getItem('userId')})
    }
      const response = await fetch(url,options);
      const data = await response.json();

      const auxiliarData = [];

      data.forEach(
          ({data , id})=>{
              auxiliarData.push({
                  nombre : data['título'],
                  tipo: data.tipo,
                  progreso: data.progreso,
                  fecha: data['periodo de inicio'],
                  categoria: data.categoría,
                  acciones: <VerActividad />
                });

            

          }
      );

      setState(auxiliarData);
    }
  
    useEffect(() => {
      getActividadesAcademicas();
    }, []);
  
    const columnas =  [
      {title: 'Nombre' , field: 'nombre'},
      {title: 'Tipo' ,field: 'tipo' ,  sorting:false},
      {title: 'Progreso (%)',field: 'progreso'},
      {title: 'Fecha Creación',field: 'fecha'},
      {title: 'Categoria',field: 'categoria'},
      {title: 'Acciones',field: 'acciones' , sorting:false}
    ];
  
    const data= state;


    return (
        <div style={{ maxWidth: '80%'  , marginLeft: '320px', marginTop: '30px'}}>
        
        <MaterialTable
          columns={columnas}
          data={data}
          title="Actividades publicas"
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
