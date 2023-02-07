function errorHandler(error, req, res, next) {

    console.log(error, '<- ini error dari error handler');

    let status = 500
    let message = "Internal Server Error"

    switch (error.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400
            message = error.errors[0].message
            break;

        case 'InvalidLogin':
            status = 401
            message = "Incorrect Email and Password"
            break;

        case 'Unauthenticated':
        case 'JsonWebTokenError':
            status = 401
            message = "Invalid Token"
            break;

        case 'NotFound':
            status = 404
            message = "Data Not Found"
            break;

        default:
            break;
    }

    res.status(status).json({
        message: message
    })

}



module.exports = errorHandler