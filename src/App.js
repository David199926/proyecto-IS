import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import ReportePersonalizado from './ReportePersonalizado/ReportePersonalizado';
import Perfil from './Perfil/Perfil';
import AppBarDrawer from './commonComponents/AppBarDrawer/AppBarDrawer';
import AppBarDrawerDirector from './commonComponents/AppBarDrawerDirector/AppBarDrawerD';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ActividadForanea } from './actividadForanea/ActividadForanea';

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
          <AppBarDrawer />
          <CrearActividad />
        </Route>
      </Router>

      <Router>
        <Route path="/editar">
          <AppBarDrawer />
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
          <AppBarDrawer />
          <Perfil />
        </Route>
      </Router>

      <Router>
        <Route path="/foranea">
          <ActividadForanea />
        </Route>
      </Router>

    </Router>

  );
}

export default App;
