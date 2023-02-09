const errorMsg = (error, req, res, next) => {
  console.log(error);
  switch (error.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      resStatus = 400;
      resMessage = error.errors[0].message;
      break;
    case 'invalid_email':
      resStatus = 400;
      resMessage = 'email is require';
      break;
    case 'invalid_password':
      resStatus = 400;
      resMessage = 'password is require';
      break;
    case 'data already':
      resStatus = 400;
      resMessage = 'Course already in your favorite';
      break;
    case 'subsribe_now':
      resStatus = 400;
      resMessage = 'please subsribe to watch video';
      break;
    case 'already subscribe':
      resStatus = 400;
      resMessage = 'already subscribe';
      break;
    case 'invalid':
      resStatus = 401;
      resMessage = 'invalid email or password';
      break;
    case 'invalidToken':
    case 'JsonWebTokenError':
      resStatus = 401;
      resMessage = 'invalid token';
      break;
    case 'subsribe_now':
      resStatus = 401;
      resStatus = 'subscribe first';
    case 'forbidden':
      resStatus = 403;
      resMessage = 'not authorize access';
      break;
    case 'not found':
      resStatus = 404;
      resMessage = 'Not Found';
      break;
    default:
      resStatus = 500;
      resMessage = 'Internal server error';
      break;
  }
  res.status(resStatus).json({ message: resMessage });
};

module.exports = errorMsg;
