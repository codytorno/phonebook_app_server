const peopleRouter = require("express").Router();
const Person = require("../models/person");

// get all the people in the phonebook
peopleRouter.get("/", (request, response) => {
  Person.find({}).then(people => {
    response.json(people);
  });
});

// get a single person in the phonebook
peopleRouter.get("/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findById(id)
    .then(foundPerson => {
      if (foundPerson) {
        response.json(foundPerson);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

// delete a person by id
peopleRouter.delete("/:id", (request, response, next) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

// add a new person to the database
peopleRouter.post("/", (request, response, next) => {
  const body = request.body;

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  });

  // save person to database
  newPerson
    .save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedPerson => response.json(savedPerson))
    .catch(error => next(error));
});

// update a person already in the database
peopleRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then(updatedPerson => {
      response.json(updatedPerson);
    })
    .catch(error => next(error));
});

module.exports = peopleRouter;
