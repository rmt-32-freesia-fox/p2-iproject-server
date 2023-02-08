module.exports = (err, req, res, next) => {
  console.log(err);
  let code;
  let message;
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      code = 400;
      message = err.errors[0].message;
      break;
    case "emptyEmail":
      code = 400;
      message = "Email is required";
      break;
    case "emptyPassword":
      code = 400;
      message = "Password is required";
      break;
    case "invalidLogin":
      code = 401;
      message = "Invalid email/password";
      break;
    case "token":
    case "JsonWebTokenError":
      code = 401;
      message = "Invalid token";
      break;
    case "notFound":
      code = 404;
      message = "Data not found";
      break;
    case "forbidden":
      code = 403;
      message = "You are not authorized";
      break;
    case "emptyGithubEmail":
      code = 400;
      message =
        "There's No Email in Your Account, Please Set Public Email in Your Github Profile First";
      break;
    default:
      code = 500;
      message = "Internal server error";
  }
  res.status(code).json({ message });
};
