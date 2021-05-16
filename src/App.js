import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ActividadForanea } from './ActividadForanea/ActividadForanea';

function App() {
  return (
    <Router>
      <Route path="/" exact component={LogIn} />
      <Route path="/crear" component={CrearActividad} />
      <Route path="/actividad" component={ActividadForanea }/>

    </Router>
  );
}

export default App;
