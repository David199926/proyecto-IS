import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// my components
import AppBarDrawerDirector from './commonComponents/AppBarDrawerDirector/AppBarDrawerD';
import { ActividadForanea } from './ActividadForanea/ActividadForanea';
import { MisActividades } from './misActividades/MisActividades';
import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import Reporte from './Reporte/Forms1/Reportes';
import Perfil from './Perfil/Perfil';
//my routing
import { AuthRoute } from './commonComponents/AuthRoute/AuthRoute';

function App() {
    return (
        <Router>
            <Switch>
                {/* log in */}
                <Route path="/" exact component={LogIn} />
        
                {/* mostrar mis actividades */}
                <AuthRoute path="/mis-actividades" component={(props) => {
                    return (
                        <div>
                            <AppBarDrawerDirector {...props} selected="Mis actividades"/>
                            <MisActividades {...props}/>
                        </div>
                    )
                }} />

                {/* crear actividad */}
                <AuthRoute path="/crear" component={(props) => {
                    return (
                        <AppBarDrawerDirector {...props} selected="Mis actividades">
                            <CrearActividad />
                        </AppBarDrawerDirector>
                    )
                }
                } />

                {/* editar actividad */}
                <AuthRoute path="/editar/:id" component={(props) => {
                    return (
                        <AppBarDrawerDirector {...props} selected="Mis actividades">
                            <EditarActividad />
                        </AppBarDrawerDirector>
                    )
                }} />

                {/* reporte personalizado */}
                <AuthRoute path="/reporte" component={(props) => {
                    return (
                        <div>
                            <AppBarDrawerDirector {...props} selected="Reporte"/>
                            <Reporte />
                        </div>
                    )
                }} />

                {/* info del perfil de usuario*/}
                <AuthRoute path="/perfil" component={(props) => {
                    return (
                        <AppBarDrawerDirector {...props}>
                            <Perfil />
                        </AppBarDrawerDirector>
                    )
                }} />

                {/* actividad de tercero */}
                <AuthRoute path="/foranea" component={(props) => {
                    return (
                        <AppBarDrawerDirector {...props} selected="Explorar">
                            <ActividadForanea />
                        </AppBarDrawerDirector>
                    )
                }} />

                {/* 404 */}
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </Router>
    );
}

export default App;
