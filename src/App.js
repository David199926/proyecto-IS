import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import ReportePersonalizado from './ReportePersonalizado/ReportePersonalizado';
import ActividadForanea from './actividadForanea/ActividadForanea';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ActividadForanea } from './ActividadForanea/ActividadForanea';

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Route path="/" exact>
        <LogIn/>
      </Route>
      <Route path="/crear">
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
=======
      <Route path="/" exact component={LogIn} />
      <Route path="/crear" component={CrearActividad} />
      <Route path="/actividad" component={ActividadForanea }/>

>>>>>>> 1754c2ba2fe04494bec3961aed1d999e6de4d788
    </Router>
  );
}

export default App;
