const express = require('express');
const cors = require('cors');
const api = express();
const port = 8080;

api.use(cors());
api.use(express.json());

const knex = require("knex")(
    require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

process.on('uncaughtException', function (err) {
  console.log(err);
});
/* __________________________________________ */
/* ---------- Root Route Endpoint ----------- */
api.get('/', (req, res) => res.status(200).send(`CapStone API is listening at http://localhost:${port}!`));

/* __________________________________________ */
/* ---------- Users API Endpoints ----------- */

// [C]RUD API endpoint for creating a new user within the users_table in the database.
api.post('/users/create', (req, res) => {
    knex('users_table')
      .insert(req.body)
      .then((newUser) => {
        res.send(
            req.body.id,
            req.body.firstName,
            req.body.lastName,
            req.body.userName,
            req.body.password,
            req.body.email,
            req.body.rank,
            req.body.isAdmin)
        res.status(201).json(`${newUser.userName} was added to the users_table in the database.`);
    })
})

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

// CR[U]D API endpoint for updating an existing user, selected by id
api.patch("/users/update/:id", (req, res) => {
    knex("users_table")
      .where({ id: req.params.id })
      .update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        rank: req.body.rank,
        isAdmin: req.body.isAdmin
      })
      .then((updatedRows) => {
        if (updatedRows > 0) {
          res.status(200).send(`Updated ${req.body.userName}'s record`);
        } else {
          res.status(404).send("Error 404 - Item not found!");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error updating user!");
      });
});

// CRU[D] API endpoint for deleting an existing user
api.delete("/users/delete/:id", (req, res) => {
    knex("users_table")
      .where({ id: req.params.id })
      .del()
      .then(res.status(200).send(`User ${req.params.id} deleted`))
      .catch(res.status(400).send(`Unable to delete user!`));
});

/* ___________________________________________ */
/* ---------- Spaces API Endpoints ----------- */

// [C]RUD API endpoint for creating a new space within the spaces_table in the database.
api.post('/spaces/create', (req, res) => {
    knex('spaces_table')
      .insert(req.body)
      .then((newSpace) => {
        res.send(
            req.body.id,
            req.body.roomName,
            req.body.roomNumber,
            req.body.buildingName,
            req.body.buildingNumber,
            req.body.equipment,
            req.body.seating,
            req.body.classification,
            req.body.network,
            req.body.isTrainer)
        res.status(201).json(`${req.body.roomName} was added to the spaces_table in the database.`);
    })
})

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

// CR[U]D API endpoint for updating an existing space, selected by id
api.patch("/spaces/update/:id", (req, res) => {
    knex("spaces_table")
      .where({ id: req.params.id })
      .update({
        roomName: req.body.roomName,
        roomNumber: req.body.roomNumber,
        buildingName: req.body.buildingName,
        buildingNumber: req.body.buildingNumber,
        equipment: req.body.equipment,
        seating: req.body.seating,
        classification: req.body.classification,
        network: req.body.network,
        isTrainer: req.body.isTrainer
      })
      .then((updatedRows) => {
        if (updatedRows > 0) {
          res
            .status(200)
            .send(`Updated ${req.body.roomName}'s record`);
        } else {
          res.status(404).send("Error 404 - Space not found!");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error updating space!");
      });
});

// CRU[D] API endpoint for deleting an existing space
api.delete("/spaces/delete/:id", (req, res) => {
    knex("spaces_table")
      .where({ id: req.params.id })
      .del()
      .then(res.status(200).send(`Space ${req.params.id} deleted`))
      .catch(res.status(400).send(`Unable to delete space!`));
});

/* _________________________________________________ */
/* ---------- Reservations API Endpoints ----------- */

// [C]RUD API endpoint for creating a new reservation within the reservations_table in the database.
api.post('/reservations/create', (req, res) => {
    knex('reservations_table')
      .insert(req.body)
      .then((newReservation) => {
        res.send(
            req.body.id,
            req.body.userId,
            req.body.roomId,
            req.body.meetingName,
            req.body.meetingDescription,
            req.body.attendees,
            req.body.meetingStart,
            req.body.meetingDuration)
        res.status(201).json(`${req.body.meetingName} was added to the reservations_table in the database.`);
    })
})

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

// CR[U]D API endpoint for updating an existing reservation, selected by id
api.patch("/reservations/update/:id", (req, res) => {
    knex("reservations_table")
      .where({ id: req.params.id })
      .update({
        userId: req.body.userId,
        roomId: req.body.roomId,
        meetingName: req.body.meetingName,
        meetingDescription: req.body.meetingDescription,
        attendees: req.body.attendees,
        meetingStart: req.body.meetingStart,
        meetingDuration: req.body.meetingDuration
      })
      .then((updatedRows) => {
        if (updatedRows > 0) {
          res
            .status(200)
            .send(`Updated ${req.body.meetingName}'s record`);
        } else {
          res.status(404).send("Error 404 - Reservation not found!");
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error updating reservation!");
      });
});

// CRU[D] API endpoint for deleting an existing reservation
api.delete("/reservations/delete/:id", (req, res) => {
    knex("reservations_table")
      .where({ id: req.params.id })
      .del()
      .then(res.status(200).send(`Reservation ${req.params.id} deleted`))
      .catch(res.status(400).send(`Unable to delete reservation!`));
});

// CRU[D] API endpoint for deleting existing reservations that are attached to a deleted user.
api.delete("/reservations/:id/delete", (req, res) => {
  const userId = req.params.id
  knex("reservations_table")
    .select("*")
    .where({ userId: userId })
    .del()
    .then((data) => {res.status(200).send(`Reservations for user ${userId} deleted`)})
    .catch((data) => {res.status(400).send(`Unable to delete reservation!`)});
});


// [C][R]UD API endpoint for reading a single user, selected by email, AND adding user if not present
api.get("/users/email/:email", (req, res) => {
  const userEmail = req.params.email;
      knex('users_table')
          .select("*")
          .where({ email: userEmail })
          .first()
          .then((user) => { if (user) { res.send(user); } else { res.status(404).json({ message: "User not found" }) } })
          .catch((error) => {
          res.status(500).json({ error: error.message });
      });
  });

/* ___________________________________ */
/* ---------- API Listener ----------- */
api.listen(port, () => console.log(`CapStone API is listening at http://localhost:${port}!`))