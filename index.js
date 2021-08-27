const express = require("express");
const cors = require("cors");
const dotExpand = require("dotenv-expand");
dotExpand(require("dotenv").config({ path: ".env" }));
const Person = require("./models/person");
const logger = require("./logger");
const app = express();

// use statements
app.use(express.json()); // allows request.body to be converted to json automatically
app.use(cors()); // allows cors
app.use(express.static("build")); // use the build folder and populate base url with front end
app.use(logger);

// gets the front end of website
app.get("/", (request, response) => {
  // if static front end is not built correctly throw 404 status error
  response.status(404).end();
});

// show the number of people in the phonebook
app.get("/info", (request, response) => {
  Person.countDocuments().then((count) => {
    response.send(
      `<div>
          <p>Phonebook has info for ${count} people</p>
          <p>${new Date()}</p>
        </div>`
    );
  });
});

// get all the people in the phonebook
app.get("/api/persons", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

// get a single person in the phonebook
app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((foundPerson) => {
      response.json(foundPerson);
    })
    .catch((error) => {
      response.status(404).end();
    });
});

// delete a person by id
app.delete("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  persons = Person.findByIdAndRemove(id)
    .then((deletedPerson) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// add a new person to the database
app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  Person.findOne({
    name: { $regex: body.name, $options: "i" },
  })
    .then((foundPerson) => {
      if (foundPerson) {
        return response.status(400).json({
          error: "name must be unique",
        });
      } else {
        const newPerson = new Person({
          name: body.name,
          number: body.number,
        });

        newPerson.save().then((savedPerson) => {
          response.json(savedPerson);
        });
      }
    })
    .catch((error) => {});
});

// update a person already in the database
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// this has to be the last loaded middleware
const errorHandling = (error, request, response, next) => {
  console.log(error);
  if (error.Name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

// this has to be the last loaded middleware
app.use(errorHandling);

// dev uses 3001, heroku uses whatever port it assigns
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
