const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  next();
};

// this has to be the last loaded middleware
const errorHandling = (error, request, response, next) => {
  console.log(error);
  if (error.Name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  }
  if (error.Name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }
  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestLogger, unknownEndpoint, errorHandling };
