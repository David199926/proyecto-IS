import React from 'react';
import RESULTADO from './RESULTADO.PNG';

// styles
import './styleForms.css'

export default function ResultReport (){

    return(
        <div className="resultR">
            <img src={RESULTADO} alt="Imagen resultado consulta" />
        </div>
    )
}