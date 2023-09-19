const express = require('express');
const cors = require('cors');
const api = express();
const port = 8080;

api.use(cors());
api.use(express.json());

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

const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

// Root route for API testing
api.get('/', (req, res) => res.status(200).send(`CapStone API is listening at http://localhost:${port}!`));

/* ---------- Users API Endpoints ----------- */
// C[R]UD API endpoint for reading ALL users
api.get('/users', (req, res) => {
    knex('users_table')
    .select('*')
    .then((users_table) => {
      res.send(users_table);
    });
});

// C[R]UD API endpoint for reading a single users, selected by userId
api.get("/users/:id", (req, res) => {
const userId = req.params.id;

knex('users_table')
    .select("*")
    .where({ id: userId })
    .first()
    .then((user) => {
    if (user) {
        res.send(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
    })
    .catch((error) => {
    res.status(500).json({ error: error.message });
    });
});

/* ---------- Spaces API Endpoints ----------- */
// C[R]UD API endpoint for reading ALL spaces
api.get('/spaces', (req, res) => {
    knex('spaces_table')
    .select('*')
    .then((spaces_table) => {
      res.send(spaces_table);
    });
});

// C[R]UD API endpoint for reading a single space, selected by spaceId
api.get("/spaces/:id", (req, res) => {
const spaceId = req.params.id;

knex('spaces_table')
    .select("*")
    .where({ id: spaceId })
    .first()
    .then((space) => {
    if (space) {
        res.send(space);
    } else {
        res.status(404).json({ message: "Space not found" });
    }
    })
    .catch((error) => {
    res.status(500).json({ error: error.message });
    });
});

/* ---------- Reservations API Endpoints ----------- */
// C[R]UD API endpoint for reading ALL reservations
api.get('/reservations', (req, res) => {
    knex('reservations_table')
    .select('*')
    .then((reservations_table) => {
      res.send(reservations_table);
    });
});

// C[R]UD API endpoint for reading a single reservation, selected by reservationId
api.get("/reservations/:id", (req, res) => {
const reservationId = req.params.id;

knex('reservations_table')
    .select("*")
    .where({ id: reservationId })
    .first()
    .then((reservation) => {
    if (reservation) {
        res.send(reservation);
    } else {
        res.status(404).json({ message: "Reservation not found" });
    }
    })
    .catch((error) => {
    res.status(500).json({ error: error.message });
    });
});

api.listen(port, () => console.log(`CapStone API is listening at http://localhost:${port}!`))