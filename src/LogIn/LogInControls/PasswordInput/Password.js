import React, { useState } from 'react';

import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
// icons
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function PasswordInput({ password, onChange, error, helperText }) {

    // state
    const [showPassword, setShowPassword] = useState(false);
    // handle state change
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <FormControl fullWidth variant="outlined" error={error}>
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={(event) => {event.preventDefault();}}
                            edge="end"
                        >
                            {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={80}
            />
            <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
    )
}

export default PasswordInput;