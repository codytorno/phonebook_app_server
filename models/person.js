const mongoose = require("mongoose");

// Get MongoDB URI
const uri = process.env.URI;

// Connect
console.log(uri);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to Database!");
  })
  .catch((error) => {
    console.log("Error Connecting to database", error.message);
  });

// Create Person Schema
const personSchema = mongoose.Schema({
  name: String,
  number: String,
});

// transform json to clean up return from database
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

// Create Person Model
module.exports = mongoose.model("Person", personSchema);
