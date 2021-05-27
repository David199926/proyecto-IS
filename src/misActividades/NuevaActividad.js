import React , {useState , useEffect}from 'react'
import {Button} from '@material-ui/core'
import { Link } from 'react-router-dom';

export const NuevaActividad = (props) => {

    const redirectToCreate = () => { props.history.push('/crear') }

    const [state,setState] = useState({});

    useEffect(
        () => {
            setState(props);
        }
    ,[]);

    useEffect(
        () => {
            setState(props);
        }
    ,[props]);

   
    return (
        <Link to='/crear'>
            <Button variant="contained" color="primary" >Nueva actividad +</Button>
        </Link>
    )
}
