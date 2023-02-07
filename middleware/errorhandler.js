module.exports = ((error, req, res, next) => {
    let status;
    let message;
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            status = 400
            message = error.errors[0].message
            break;
        case "InvalidLogin":
            status = 401
            message = "Invalid Email or Password"
            break;
        default:
            status = 500
            message = 'Internal Server Error'
            break;
    }
    res.status(status).json({ message })
})