import winston from 'winston';

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log' }),
    new winston.transports.Console()
  ]
});

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } 
  // Programming or other unknown error: don't leak error details
  else {
    // 1) Log error
    logger.error('ERROR 💥', err);
    
    // 2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = { message, statusCode: 404, isOperational: true };
    }
    
    if (err.code === 11000) {
      const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
      const message = `Duplicate field value: ${value}. Please use another value!`;
      error = { message, statusCode: 400, isOperational: true };
    }
    
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(el => el.message);
      const message = `Invalid input data. ${errors.join('. ')}`;
      error = { message, statusCode: 400, isOperational: true };
    }
    
    if (err.name === 'JsonWebTokenError') {
      const message = 'Invalid token. Please log in again!';
      error = { message, statusCode: 401, isOperational: true };
    }
    
    if (err.name === 'TokenExpiredError') {
      const message = 'Your token has expired! Please log in again.';
      error = { message, statusCode: 401, isOperational: true };
    }
    
    sendErrorProd(error, res);
  }
};