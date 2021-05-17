import React, { useState}  from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import perfil from '../Resources/Images/profile.png'

// styles
import './Perfil.css';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

}));

const theme = createMuiTheme({
  palette:{
    primary:{
      main:'#ffd413'
    }
}});


export default function Perfil() {
  const classes = useStyles();
  
  // component state
  const [profileImg, setImg] =  useState(perfil);
  const [topic, setTopic] = React.useState('');
  const [legend, setLegend] = React.useState('');
  const [errorTopic, seterrorTopic] = React.useState(false);
  

  //handle image reader
  const imageHandler =(e) => {
    const reader =new FileReader();
    reader.onload=() =>{
      if(reader.readyState === 2){
        setImg(reader.result)
      }
    }
   reader.readAsDataURL(e.target.files[0])
  }
  
  const interestValues = ['interes1', 'interes2'];

  // component state

  const [interests, setInterests] = useState([]);
  const [interestsAvailable, setInterestsAvailable] = useState(interestValues)
  const [inputValues, setInputvalues] = useState([]);

  // get insterest chips
  const getInterestChips = () => {
    return (
        <Grid item xs={12}>
            {
                interests.map((option, index) => (
                    <Chip
                        key={index}
                        label={option}
                        className="interests-chips"
                        onDelete={handleDelete(option)}
                    />
                ))
            }
        </Grid>
    )
}
const handleDelete = (chipToDelete) => () => {
  setInterests((interests) => interests.filter((interest) => interest !== chipToDelete));
  setInterestsAvailable([...interestsAvailable, chipToDelete]);
};
const pushInterest = (event, newValue) => {
  if (newValue == null) return null;
  setInterests([...interests, newValue]);
  setInterestsAvailable(interestsAvailable.filter((value) => value !== newValue));
  setInputvalues([]);
};


  return (
   
    <div className={classes.root}>      
      <div className="container" Style={ 'padding-top: 110px'} >
        {/* foto de perfil*/}
        <div className="img">
          <img src={profileImg} alt="" id="img" className="img"/>
       </div>
       <input type="file" name="image-upload"  id="input"    accept="image/*" onChange={imageHandler}/>
        <div className="label">
          <label htmlFor="input" className="image-upload"  > 
            <IconButton  aria-label="upload picture" component="span" >
             <PhotoCamera color="primary" />
           </IconButton>
          </label>
       </div>
        {/* nombre usuario*/}
        <Typography variant="subtitle2" gutterBottom className="text" Style={" font-size: 3rem"  } >
         Alberto Benavides
        </Typography>

        <Grid container spacing={2} Style={'padding-top: 23px'  }>
        <Grid item xs={8} Style={" max-width: 57%"  }>
        <Typography variant="h6" gutterBottom className="text1" >
          Información 
          </Typography>

         {/* tabla */}
        <tr>
         <th class="header"> Número de actividades creadas: </th>
         <td class="data"> 10</td>
        </tr>

       <tr>
          <th class="header"> Número de actividades en curso: </th>
          <td class="data"> 5</td>
        </tr>

        <tr>
          <th class="header"> Número de actividades terminadas: </th>
          <td class="data"> 5</td>
        </tr>

       <tr>
          <th class="header"> Número de colaboraciones realizadas: </th>
          <td class="data"> 2</td>
       </tr>
       </Grid>

       <Grid item xs={4} Style={" max-width: 43%"  }>

        <div>
          <Typography variant="h6" gutterBottom className="textt" >
          Intereses 
          </Typography>
            
          <Typography variant="body2" gutterBottom className="txt" Style={"font-size: 0.805rem"  } >
          Define tus áreas de interés para que podamos recomendarte
          actividades de otros docentes.  
          </Typography>
          <Grid item xs={12}>
                    {/* Input Temas de interés de la actividad */}
                    <Autocomplete
                        options={interestsAvailable}
                        value={inputValues}
                        onChange={pushInterest}
                        getOptionLabel={(interest) => interest}
                        renderInput={(params) => 
                        <TextField {...params}  
                        onChange = {(e) => {
                          setTopic(e.target.value);
                          if(topic.length > 10 ){
                            seterrorTopic(true);
                            setLegend("Los temas de interes contiene maximo de 12 caracteres. Ejemplo: POO o Robotica");
                          }

                          else if(topic === ''){
                            seterrorTopic(true);
                            setLegend("Los temas no pueden ir con un caracter");
                          }
                           
                          else if(topic === "[0-1000]"){
                            seterrorTopic(true);
                            setLegend("No se admiten numeros")
                          }

                          else{
                            seterrorTopic(false);
                            setLegend("");
                          }
                        }}
                        error = {errorTopic}
                        label="Temas de Interes"
                        helperText = {legend}
                        variant="outlined" />}
                    />
                </Grid>
                {/* Chips Temas de interés de la actividad */}
                {getInterestChips()}
         
        </div>
            
      
        <Grid item xs={8} Style={" padding-top: 40px"  }>
        <ThemeProvider theme={theme}>
        <Button variant="contained" color="primary" component="span">
          Guardar
        </Button>
        </ThemeProvider>
        </Grid>
        </Grid>
        </Grid>
     </div>
        
    </div>
  );
}