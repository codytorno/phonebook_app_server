const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Create Person Schema
const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, "Name must be a minimum of 3 characters"],
  },
  number: {
    type: String,
    required: true,
    minLength: [8, "Number must be at least 8 characters"],
  },
});

// add validation plugin
personSchema.plugin(uniqueValidator);

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
