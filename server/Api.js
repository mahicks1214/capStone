const express = require('express');
const cors = require('cors');
const api = express();
const port = 8080;

api.use(cors());
api.use(express.json());

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