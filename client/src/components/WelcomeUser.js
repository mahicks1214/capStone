import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useUserContext } from './UserContext';

export default function WelcomeUser() {
    // Brought-in Auth0 context
    const { isAuthenticated } = useAuth0();

    // Brought-in user context
    const { currentUser } = useUserContext();

    const [welcomeUser, setWelcomeUser] = useState("")
    useEffect(() => {   
        if (isAuthenticated === true) {                          
    fetch(`http://localhost:8080/users/${currentUser.id}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        setWelcomeUser(data)
    })
    .catch((error) => {console.log(error)})
}
})

    return (
        <>
            {isAuthenticated ? `Welcome ${welcomeUser.userName}!` : ""}
            <span style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                {isAuthenticated ? welcomeUser.isAdmin ? "Administrator" : "User" : "Guest"}
            </span>
        </>
    )
}