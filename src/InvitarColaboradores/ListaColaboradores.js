import React from 'react'

// Material ui
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';

// styles
import { makeStyles } from '@material-ui/core/styles';
import profile from '../Resources/Images/perfil.png'

const EMPTY_MESSAGE = 'No se encontraron resultados';

// styles
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.grey[100],
        '&:hover': {
            backgroundColor: theme.palette.grey[200],
        },
    },
}));

export const ListaColaboradores = (props) => {
    // props destructuring
    const { collaborators, selectedCollaborators, setSelectedCollaborators, nameFilter, interests } = props;
    const classes = useStyles();

    // behaviors
    // get collaborator list items
    const collaboratorsListItems = () => {
        // name filtering
        let filteredCollaborators = nameFiltering(collaborators);
        filteredCollaborators = interestsFiltering(filteredCollaborators);

        // empty message
        if (filteredCollaborators.length == 0) return EMPTY_MESSAGE;
        // list items
        return (
            filteredCollaborators.map((collab, index) => (
                <ListItem key={index} button className={classes.root}>
                    <ListItemAvatar>
                        <Avatar src={profile} />
                    </ListItemAvatar>
                    <ListItemText id={collab.id} primary={collab.fullName} />
                    <ListItemSecondaryAction>
                        <Checkbox
                            edge="end"
                            onChange={toggleCollaboratorSelections(collab.id)}
                            checked={checkIfSelected(collab.id)}
                            color="primary"
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            ))
        )
    }
    // filter collaborators by name
    const nameFiltering = (collaborators) => collaborators.filter(
        (collab) => collab.fullName.toUpperCase().includes(nameFilter.toUpperCase())
    )
    // filter collaborators by interests
    const interestsFiltering = (collaborators) => {
        if (interests.length == 0) return collaborators;
        return collaborators.filter(
            (collab) => collab.interests.some(
                interest => interests.map(interest => interest.id).includes(interest)
            )
        )
    }
    // check if collaborator is selected
    const checkIfSelected = (collabId) => {
        return selectedCollaborators.map(collab => collab.id).includes(collabId);
    }
    // toggles checkboxes
    const toggleCollaboratorSelections = (collabId) => (event) => {
        let { checked } = event.target;
        // remove from selected collaborators if unchecked
        if (!checked) {
            setSelectedCollaborators(
                selectedCollaborators.filter(collab => collab.id !== collabId)
            );
            return;
        }
        // add to selected collaborators if checked
        setSelectedCollaborators([
            ...selectedCollaborators,
            collaborators.find((collab => collab.id === collabId))
        ]);
    }

    return (
        <List>
            {collaboratorsListItems()}
        </List>
    )
}
