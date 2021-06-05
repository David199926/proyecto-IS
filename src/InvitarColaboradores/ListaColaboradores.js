import React from 'react'

const EMPTY_MESSAGE = 'No se encontraron resultados';

export const ListaColaboradores = ({ collaborators, nameFilter, interests }) => {

    // get collaborator list items
    const collaboratorsListItems = () => {
        // name filtering
        let filteredCollaborators = nameFiltering(collaborators);
        filteredCollaborators = interestsFiltering(filteredCollaborators);

        // empty message
        if (filteredCollaborators.length == 0) return EMPTY_MESSAGE;
        // list items
        return (
            filteredCollaborators.map((collaborator) => (
                collaborator.fullName
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

    return (
        <div>
            {collaboratorsListItems()}
        </div>
    )
}
