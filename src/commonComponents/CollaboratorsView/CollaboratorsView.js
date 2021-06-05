import React from 'react';
// Material UI
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

// styles
import profile from '../../Resources/Images/perfil.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: ".8rem",
    }
}))

export const CollaboratorsView = ({ collaborators, setCollaborators, customEmptyMessage }) => {

    // styles
    const classes = useStyles();

    // handle delete interest input
    const handleDelete = (chipToDelete) => () => {
        setCollaborators((collaborators) => collaborators.filter((interest) => interest.id !== chipToDelete.id));
    };
    // get collaborators chips
    const getCollabs = () => {
        if (collaborators.length === 0) return customEmptyMessage || "No hay colaboradores para esta actividad";
        return (collaborators.map((option, index) => (
            <Chip
                key={index}
                avatar={<Avatar alt="User" src={profile} />}
                label={option.fullName}
                onDelete={handleDelete(option)}
            />
        )));
    }

    return (
        <div className={classes.root}>
            {getCollabs()}
        </div>
    )
}
