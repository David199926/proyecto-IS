import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import ReportePersonalizado from './ReportePersonalizado/ReportePersonalizado';
import Perfil from './Perfil/Perfil';
import AppBarDrawerDirector from './commonComponents/AppBarDrawerDirector/AppBarDrawerD';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ActividadForanea } from './ActividadForanea/ActividadForanea';
import { MisActividades } from './misActividades/MisActividades';

function App() {
  return (

    <Router>
      <Switch>
        {/* log in */}
        <Route path="/" exact>
          <LogIn />
        </Route>
        {/* crear actividad */}
        <Route path="/crear">
          <AppBarDrawerDirector>
            <CrearActividad />
          </AppBarDrawerDirector>
        </Route>
        {/* editar actividad */}
        <Route path="/editar">
          <AppBarDrawerDirector />
          <EditarActividad />
        </Route>
        {/* reporte personalizado */}
        <Route path="/personalizado">
          <AppBarDrawerDirector />
          <ReportePersonalizado />
        </Route>
        {/* info del perfil de usuario*/}
        <Route path="/perfil">
          <AppBarDrawerDirector />
          <Perfil />
        </Route>
        {/* actividad de tercero */}
        <Route path="/foranea">
          <AppBarDrawerDirector />
          <ActividadForanea />
        </Route>
        {/* mostrar mis actividades */}
        <Route path="/mis-actividades">
          <AppBarDrawerDirector />
          <MisActividades />
        </Route>
        {/* 404 */}
        <Route path="*" component={() => "404 NOT FOUND"}/>
      </Switch>
    </Router>

  );
}

export default App;
