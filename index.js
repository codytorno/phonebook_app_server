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

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = Person.findByIdAndDelete(id)
    .then((deletedPerson) => {
      response.json(deletedPerson);
    })
    .catch((error) => {
      response.status(404).end();
    });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
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
      console.log("found Person", foundPerson);
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// dev uses 3001, heroku uses whatever port it assigns
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
