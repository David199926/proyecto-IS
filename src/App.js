import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// my components
import AppBarDrawer from './commonComponents/AppBarDrawer/AppBarDrawer';
import { ActividadForanea } from './ActividadForanea/ActividadForanea';
import { MisActividades } from './misActividades/MisActividades';
import { InvitarColaboradores } from './InvitarColaboradores/InvitarColaboradores';
import LogIn from './LogIn/LogIn';
import CrearActividad from './CrearActividad/CrearActividad';
import EditarActividad from './EditarActividad/EditarActividad';
import Reporte from './Reporte/Forms1/Reportes';
import Perfil from './Perfil/Perfil';
import {Explorar} from './Explorar/Explorar';
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
                        <AppBarDrawer {...props} selected="Mis actividades">
                            <MisActividades {...props}/>
                        </AppBarDrawer>
                    )
                }} />

                {/* crear actividad */}
                <AuthRoute path="/crear" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Mis actividades">
                            <CrearActividad />
                        </AppBarDrawer>
                    )
                }
                } />

                {/* editar actividad */}
                <AuthRoute path="/editar/:id" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Mis actividades">
                            <EditarActividad {...props}/>
                        </AppBarDrawer>
                    )
                }} />

                {/* invitar colaboradores */}
                <AuthRoute path="/invitar/:id" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Mis actividades">
                            <InvitarColaboradores />
                        </AppBarDrawer>
                    )
                }} />

                {/* reporte personalizado */}
                <AuthRoute path="/reporte" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Reporte">
                            <Reporte />
                        </AppBarDrawer>
                    )
                }} />

                {/* info del perfil de usuario*/}
                <AuthRoute path="/perfil" component={(props) => {
                    return (
                        <AppBarDrawer {...props}>
                            <Perfil />
                        </AppBarDrawer>
                    )
                }} />

                {/* actividad de tercero */}
                <AuthRoute path="/foranea/:activityid" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Explorar">
                            <ActividadForanea />
                        </AppBarDrawer>
                    )
                }} />

                <AuthRoute path="/explorar" component={(props) => {
                    return (
                        <AppBarDrawer {...props} selected="Explorar">
                            <Explorar />
                        </AppBarDrawer>
                    )
                }} />

                {/* 404 */}
                <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
        </Router>
    );
}

export default App;
