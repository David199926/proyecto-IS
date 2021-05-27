import React, { useState } from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Button } from '@material-ui/core'

export const VerActividad = () => {

    const [state, setState] = useState(0);

    return (

        <>

            <Button startIcon={<VisibilityIcon />} />


        </>
    )
}
