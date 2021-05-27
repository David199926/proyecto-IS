import React , {useState , useEffect} from 'react'
import { Button  } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

export const EditarActividad = (props) => {

    const [state,setState] = useState({});

    useEffect(()=>{
        setState(props);
    },[]);

    useEffect(()=>{
        setState(props);
    },[props]);
    
    return <Link to={`/editar/${props.idActividad}`}><Button startIcon={<EditIcon/>}/></Link>
}
