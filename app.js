const config = require("./util/config");
const express = require("express");
const app = express();
const cors = require("cors");
const peopleRouter = require("./controllers/people");
const infoRouter = require("./controllers/info");
const middleware = require("./util/middleware");
const logger = require("./util/logger");
const mongoose = require("mongoose");

// Connect
logger.info("connecting to:", config.URI);
mongoose
  .connect(config.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => logger.info("Connected to Database!"))
  .catch(error => logger.error("Error Connecting to database", error.message));

// use statements
app.use(cors()); // prevents cors issues between react and server
app.use(express.static("build")); // loads react front end from build folder for / route
app.use(express.json()); // converts objects to json
app.use(middleware.requestLogger); // logs all requests to the website in standard format
app.use("/api/persons", peopleRouter); // middleware to handle all routes to the database person documents
app.use("/info", infoRouter); // middleware to handle all routes to the info page
app.use(middleware.unknownEndpoint); // middleware to handle all unknown endpoints
app.use(middleware.errorHandling); // checks for specific errors from the promise catches

module.exports = app;
