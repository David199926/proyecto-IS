import React, { useState } from 'react'
// Material UI
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export const InterestsSelector = (props) => {

    const { interests, interestsAvailable, setInterests, setInterestsAvailable } = props;
    const [inputValues, setInputvalues] = useState([]);

    // get insterest chips
    const getInterestChips = () => {
        return (
            <Grid item xs={12}>
                {
                    interests.map((option, index) => (
                        <Chip
                            key={index}
                            label={option.nombre}
                            onDelete={handleDelete(option)}
                        />
                    ))
                }
            </Grid>
        )
    }
    // handle delete interest input
    const handleDelete = (chipToDelete) => () => {
        setInterests((interests) => interests.filter((interest) => interest.id !== chipToDelete.id));
        setInterestsAvailable([...interestsAvailable, chipToDelete]);
    };
    // handle interest input
    const pushInterest = (event, newValue) => {
        if (newValue == null) return null;
        setInterests([...interests, newValue]);
        setInterestsAvailable(interestsAvailable.filter((value) => value.id !== newValue.id));
        setInputvalues([]);
    }

    return (
        <div>
            <Autocomplete
                options={interestsAvailable}
                getOptionLabel={(interest) => interest.nombre}
                value={inputValues}
                onChange={pushInterest}
                renderInput={(params) => <TextField {...params} label="Temas de interés" variant="outlined" fullWidth />}
                Style={"margin-bottom: .8rem"}
            />
            {/* Chips Temas de interés de la actividad */}
            {getInterestChips()}
        </div>
    )
}
