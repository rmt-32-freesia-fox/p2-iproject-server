module.exports = (err, req, res, next) => {
  let status = 500,
    message = 'Internal Server Error'
  if (
    err.name === 'SequelizeValidationError' ||
    err.name === 'SequelizeUniqueConstraintError' ||
    err.name === 'ValidationError'
  ) {
    message = Array.isArray(err.errors) ? err.errors[0].message : err.message

    status = 400
  }
  if (err.name === 'AuthenticationFailed' || err.name === 'TokenExpiredError') {
    status = 401
    message = err.message
  }

  if (err.name === 'JsonWebTokenError') {
    status = 401
    message = 'Invalid token'
  }

  if (err.name === 'UnAuthorized') {
    status = 403
    message = err.message
  }
  if (err.name === 'NotFound') {
    status = 404
    message = err.message
  }
  res.status(status).json({ message })
}