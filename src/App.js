// componentes de casos de uso
import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import ReportePersonalizado from './ReportePersonalizado/ReportePersonalizado';
import { ActividadForanea } from './actividadForanea/ActividadForanea';

// componentes generales
import AppBarDrawer from './AppBarDrawer/AppBarDrawer';

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <LogIn/>
      </Route>
      <Route path="/crear">
        <AppBarDrawer />
        <CrearActividad />
      </Route>
      <Route path="/editar">
        <EditarActividad />
      </Route>
      <Route path="/personalizado">
        <ReportePersonalizado />
      </Route>
      <Route path="/foranea">
        <ActividadForanea />
      </Route>
    </Router>
  );
}

export default App;
