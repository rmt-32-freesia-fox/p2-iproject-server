const errorHandler = (err, req, res, next) => {
  console.log(err);
  let status = 500;
  let message = 'Internal server error';

  switch (err.name) {
    case 'SequelizeValidationError':
      status = 400;
      err.errors.forEach((x) => (message = x.message));
      break;

    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = 'Email must be unique';
      break;

    case 'SequelizeForeignKeyConstraintError':
      status = 404;
      message = 'Item not found';
      break;

    case 'EmailOrPasswordRequired':
      status = 400;
      message = 'Email or password are required';
      break;

    case 'QuantityError':
      status = 400;
      message = 'Quantity must be greather than 0';
      break;

    case 'InvalidCredential':
      status = 401;
      message = 'Invalid email/password';
      break;

    case 'Unauthenticated':
    case 'JsonWebTokenError':
      status = 401;
      message = 'Register or login first';
      break;

    case 'CannotLogin':
      status = 401;
      message = 'Your account has registered as renter and cannot login';
      break;

    case 'Forbidden':
      status = 403;
      message = 'You are not authorized';
      break;

    case 'ItemNotFound':
      status = 404;
      message = 'Item not found';
      break;

    case 'TranscationNotFound':
      status = 404;
      message = 'Transaction not found';
      break;

    case 'AlreadyCheckout':
      status = 404;
      message = 'You have rented this item';
      break;

    case 'NotEnoughItem':
      status = 404;
      message = 'Cannot add item to cart';
      break;
  }

  res.status(status).json({
    message: message,
  });
};

module.exports = errorHandler;
