import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        {
            id: "",
            firstName: "",
            lastName: "",
            userName: "",
            password: "",
            email: "",
            rank: "",
            isAdmin: false,
            guest: true
        });

        const [modifiedUser, setModifiedUser] = useState(
            {
                id: "",
                firstName: "",
                lastName: "",
                userName: "",
                password: "",
                email: "",
                rank: "",
                isAdmin: false,
                guest: true
            });

    const { user } = useAuth0();
    const { isAuthenticated } = useAuth0();

    useEffect(() => {
        // Check to see if the user is logged in
        if (isAuthenticated === true) {
            // If so, attempt to get the user from our database by the authenicated email string

            fetch(`http://localhost:8080/users/email/${user.email}`)
                .then((response) => {
                    if (!response.ok) {
                        // If not, create the user in our database
                        fetch("http://localhost:8080/users/create/",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(
                                    {
                                        firstName: "",
                                        lastName: "",
                                        userName: user.nickname,
                                        password: "",
                                        email: user.email,
                                        rank: "",
                                        isAdmin: true
                                    }
                                )
                            })
                            .then((response) => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then((data) => {
                                // Once the user is created in the database, get the user
                                fetch(`http://localhost:8080/users/email/${user.email}`)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.json();
                                    })
                                    // Once we've retrieved the user after creating it, return it
                                    .then((data) => {
                                        setCurrentUser({...data, guest: false});
                                    })
                                    .catch((error) => {
                                        setCurrentUser({
                                            id: "",
                                            firstName: "",
                                            lastName: "",
                                            userName: "",
                                            password: "",
                                            email: "",
                                            rank: "",
                                            isAdmin: false,
                                            guest: true
                                        });
                                    })
                            })
                            .catch((error) => {
                                setCurrentUser({
                                    id: "",
                                    firstName: "",
                                    lastName: "",
                                    userName: "",
                                    password: "",
                                    email: "",
                                    rank: "",
                                    isAdmin: false,
                                    guest: true
                                });
                            })
                    } else {
                        return response.json();
                    }
                })
                .then((data) => {
                    // After receiving the data from "GET", check if the user was found.
                    if (data !== undefined && data !== null & "id" in data) {setCurrentUser({...data, guest: false})}
                })
                .catch((error) => {
                    setCurrentUser({
                        id: "",
                        firstName: "",
                        lastName: "",
                        userName: "",
                        password: "",
                        email: "",
                        rank: "",
                        isAdmin: false,
                        guest: true
                    });
                    // If the user logged out, set the current user to nothing
                })
        } else {
            setCurrentUser({
                id: "",
                firstName: "",
                lastName: "",
                userName: "",
                password: "",
                email: "",
                rank: "",
                isAdmin: false,
                guest: true
            })
        }

        // setCurrentUser(isAuthenticated === true ? {
        //     ...currentUser,
        //     userName: user.nickname,
        //     email: user.email,
        //     isAdmin: true
        // } : {
        //     id: "",
        //     firstName: "",
        //     lastName: "",
        //     userName: "",
        //     password: "",
        //     email: "",
        //     rank: "",
        //     isAdmin: false
        // })
    }, [isAuthenticated, modifiedUser])
    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser, modifiedUser, setModifiedUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUserContext = () => { return useContext(UserContext) };

export default UserContextProvider;