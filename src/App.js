import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import ReportePersonalizado from './ReportePersonalizado/ReportePersonalizado';
import Perfil from './Perfil/Perfil';
import AppBarDrawer from './commonComponents/AppBarDrawer/AppBarDrawer';
import AppBarDrawerDirector from './commonComponents/AppBarDrawerDirector/AppBarDrawerD';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ActividadForanea } from './ActividadForanea/ActividadForanea';
import {MisActividades} from './misActividades/MisActividades';

function App() {
  return (

    <Router>
      <Router>
        <Route path="/" exact>
          <LogIn />
        </Route>
      </Router>

      <Router>
        <Route path="/crear">
        <AppBarDrawerDirector>
          <CrearActividad/>
        </AppBarDrawerDirector>
        </Route>
      </Router>

      <Router>
        <Route path="/editar">
        <AppBarDrawerDirector />
          <EditarActividad />
        </Route>
      </Router>

      <Router>
        <Route path="/personalizado">
          <AppBarDrawerDirector />
          <ReportePersonalizado />
        </Route>
      </Router>

      <Router>
        <Route path="/perfil">
        <AppBarDrawerDirector />
          <Perfil />
        </Route>
      </Router>

      <Router>
        <Route path="/foranea">
          <ActividadForanea />
        </Route>
      </Router>
    
       <Router>
        <Route path="/mis-actividades">
          <MisActividades />
        </Route>
      </Router>

    </Router>

  );
}

export default App;
