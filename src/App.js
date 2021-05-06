import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={LogIn} />
      <Route path="/crear" component={CrearActividad} />
    </Router>
  );
}

export default App;
