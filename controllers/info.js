const infoRouter = require("express").Router();
const Person = require("../models/person");

// show the number of people in the phonebook
infoRouter.get("/", (request, response, next) => {
  Person.countDocuments()
    .then(count => {
      response.send(
        `<div>
            <p>Phonebook has info for ${count} people</p>
            <p>${new Date()}</p>
          </div>`
      );
    })
    .catch(error => next(error));
});

module.exports = infoRouter;
