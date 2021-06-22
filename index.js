const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    content: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    content: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    content: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    content: "Marry Poppendick",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/info", (request, response) => {
  response.send(
    `<div>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        </div`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
