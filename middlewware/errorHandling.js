const errorHandling = async (err, req, res, next) => {
  let status = 500
  let message = "Internal Server Error"
  
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400
      message = err.errors[0].message
      break;
    case "EmailPasswordRequired":
      status = 400
      message = "Email and Password are required"
      break;
    case "InvalidLogin":
      status = 400
      message = "Incorrect Email or Password"
      break;
    case "Forbidden":
      status = 403
      message = "Forbidden"
      break;
    case "JsonWebTokenError":
    case "Unauthenticated":
      status = 401
      message = "Invalid Token"
      break;
    case "NotFound":
      status = 404
      message = 'Data Not Found'
      break;
  }

  res.status(status).json({ message })
}

module.exports = errorHandling