const mongoose = require("mongoose");
const dotenvExpand = require("dotenv-expand");
dotenvExpand(require("dotenv").config({ path: ".env" }));

// prevent this .js file from being executed without the mongodb database user and password
if (process.argv.length >= 3 && process.argv.length <= 5) {
  console.log(
    "Please provide correct format: node mongo.js <username> <password> or node mongo.js <username> <password> <name> <number>"
  );
  process.exit(1);
}

// getting the password from node mongo.js <password>
const argument = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

// the url for the mongodb database that will store the objects as documents
const url = process.env.URI;
// define the connection properties
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

// define the schema of the object to be stored
const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

// create a model from the schema to be used to create new objects
const Person = mongoose.model("Person", personSchema);

// creating a new example person to using the model above
const AddPerson = () => {
  const person = new Person({
    name: name,
    number: number,
  });
  // saving the person to the database and closing the connection
  person.save().then(() => {
    console.log(`added ${name} to the phonebook!`);
    mongoose.connection.close();
  });
};

const GetAllPeople = () => {
  // Retrieve all Person objects from the database
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
};

if (argument === "-all") {
  GetAllPeople();
}
if (argument === "-add" && process.argv.length === 5) {
  AddPerson();
}
