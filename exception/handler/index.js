const customErrorHandler = require("./customErrorHandler");
const globalExceptionHandler = require("./globalExceptionHandler");
const jwtTokenExceptionHandler = require("./jwtTokenExceptionHandler");
const validationExceptionHandler = require("./validationExceptionHandler");

const exceptionHandlers = [
  jwtTokenExceptionHandler,
  validationExceptionHandler,
  customErrorHandler,
  globalExceptionHandler,
];
module.exports = exceptionHandlers;
