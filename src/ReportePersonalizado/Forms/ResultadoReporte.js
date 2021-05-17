import React from 'react';
import RESULTADO from '../../Resources/Images/RESULTADO.PNG';


// styles
import './styleForms.css'

export default function ResultReport (){

    return(
        <div className="resultR">
            <img src={RESULTADO} alt="Imagen resultado consulta" Style={ 'padding-left: 29px' } />
        </div>
    )
}