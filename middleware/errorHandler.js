function errorHandler(error, req, res, next) {
  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({
      message: error.errors[0].message,
    });
  } else if (error.name === 'Not Found Email/Passowrd') {
    res.status(404).json({
      message: 'Email or Password Is Required',
    });
  } else if (error.name === 'Invalid email or password') {
    res.status(400).json({
      message: 'Invalid email or password',
    });
  } else {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

module.exports = errorHandler;
