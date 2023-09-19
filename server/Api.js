const express = require('express'); 
const app = express();
const port = 8080;

/* Front-end calls to API:
    Username/Password Login:
    {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                username: [string],
                password: [string]
            }
        )
    }

    Password Reset for User:
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                username: [string],
                password: [string]
            }
        )
    }
    / *********************************************************** /
    Create User Account:
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                firstname: [string],
                lastname: [string],
                username: [string],
                password: [string],
                email: [string],
                rank: [string],
                isAdmin: [boolean]
            }
        )
    }

    Create Room:
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                roomName: [string],
                roomNumber: [string],
                buildingName: [string],
                buildingNumber: [string],
                equipment: [string],
                seating: [number],
                classification: [string],
                netWork: [string],
                isTrainer: [boolean],
            }
        )
    }

    Create Reservation:
    {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                userId: [string],
                userId: [number],
                roomId: [number],
                roomId: [number] ,   
                meetingName: [string],
                meetingDescription: [string],
                attendees: [string (as an array of strings)],
                meetingStart: [date],  
                meetingDuration: [number]
            }
        )
    }
    / *********************************************************** /
        Edit User Account:
    {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                firstname: [string] ? [string] : "",
                lastname: [string] ? [string] : "",
                username: [string] ? [string] : "",
                password: [string] ? [string] : "",
                email: [string] ? [string] : "",
                rank: [string] ? [string] : "",
                isAdmin: [boolean] ? [boolean] : false
            }
        )
    }

    Edit Room:
    {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                roomName: [string] ? [string] : "",
                roomNumber: [string] ? [string] : "",
                buildingName: [string] ? [string] : "",
                buildingNumber: [string] ? [string] : "",
                equipment: [string] ? [string] : "",
                seating: [number] ? [number] : 0,
                classification: [string] ? [string] : "",
                netWork: [string] ? [string] : "",
                isTrainer: [boolean] ? [boolean] : false
            }
        )
    }

    Edit Reservation:
    {
        method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                userId: [string] ? [string] : "",
                userId: [number] ? [number] : 0,
                roomId: [number] ? [number] : 0,
                roomId: [number] ? [number] : 0,    
                meetingName: [string] ? [string] : ""
                meetingDescription: [string] ? [string] : ""
                attendees: [string (as an array of strings)] ? [string] : "[]",
                meetingStart: [date] ? [date] : new Date('1999-12-31') ,  
                meetingDuration: [number] ? [number] : 0,
            }
        )
    }
    / *********************************************************** /
        Delete User Account:
    {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                id: [number],
                username: [string] ? [string] : ""
            }
        )
    }

    Delete Room:
    {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                id: [number],
                roomName: [string] ? [string] : null,
                roomNumber: [string] ? [string] : null
            }
        )
    }

    Delete Reservation:
    {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                id: [number],
                meetingName: [string] ? [string] : null
            }
        )
    }
    / *********************************************************** /
    Get User Account:
    {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                firstname: [string],
                lastname: [string],
                username: [string],
                password: [string],
                email: [string],
                rank: [string],
                isAdmin: [boolean]
            }
        )
    }

    Get Room:
    {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                roomName: [string],
                roomNumber: [string],
                buildingName: [string],
                buildingNumber: [string],
                equipment: [string],
                seating: [number],
                classification: [string],
                netWork: [string],
                isTrainer: [boolean]
            }
        )
    }

    Get Reservation:
    {
        method: "GET",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(
            {
                userId: [string],
                userId: [number],
                roomId: [number],
                roomId: [number],  
                meetingName: [string],
                meetingDescription: [string],
                attendees: [string (as an array of strings)],
                meetingStart: [date],  
                meetingDuration: [number]
            }
        )
    }
*/

app.get('/', (req, res) => {
    res.send('I love this api!!!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))