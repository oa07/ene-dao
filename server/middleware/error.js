const ErrRes = require('../utils/errorResponse');
const logger = require('../../config/logger')(module);

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `${Object.keys(error.keyPattern)[0]} is already used.`;
    error = new ErrRes(message, 409);
  }

  // Mongoose bad objectID
  if (error.name === 'CastError') {
    const message = `Resource not found with ID of ${error.value}`;
    error = new ErrRes(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrRes(message, 400);
  }

  logger.error(new Error(error.message));

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Internal server error'
  });
};

module.exports = errorHandler;
