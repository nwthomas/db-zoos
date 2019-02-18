const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");
const server = express();
const helmet = require("helmet");
require("dotenv").config();
server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

server.get("/", (req, res) => {
  res.status(200).json("Dude!");
});

// Create
server.post("/api/zoo", (req, res) => {
  db("zoos")
    .insert(req.body)
    .then(ids => {
      res.status(200).json({
        message: "The animal was successfully added to the zoo.",
        id: ids
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an error adding animal to the zoo.",
        error: err
      });
    });
});

// Read
server.get("/api/zoo", (req, res) => {
  db("zoos")
    .then(animals => {
      res.status(200).json({
        message: "Animals retrieved from the zoo successfully.",
        animals: animals
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving animals from the zoo.",
        error: err
      });
    });
});

// Update
server.put("/api/zoo/:id", (req, res) => {
  const changes = req.body;
  db("zoos")
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({
          message: "Animal was updated in the zoo successfully.",
          numUpdated: count
        });
      } else {
        res.status(404).json({
          message: "Animal could not be found in the zoo.",
          numUpdated: count
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error updating the animal in the zoo.", error: err });
    });
});

// Delete

const port = process.env.PORT || 4000;
server.listen(port, function() {
  console.log(`
  --------------------------------------------
       Listening on http://localhost:${port}
  --------------------------------------------`);
});
