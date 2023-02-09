module.exports = function errorHandler(err, req, res, next){
    let message,status
    switch(err.name){
        case 'SequelizeValidationError':
            status = 400
            message= err.errors[0].message
        break
        case 'EmailRequired':
            status = 400
            message = "Email is required"
        break
        case 'PasswordRequired':
            status = 400
            message = "Password is required"
        break
        case 'Unauthenticated':
        case 'JsonWebTokenError':
        case 'Unauthorized':
            status = 401
            message = "Invalid token"
        break
        case 'HeroNotFound':
            status = 404
            message = "Hero not found"
        break
        case 'InvalidCredentials':
            status = 401
            message = "Invalid email/password"
        break
        case 'Forbidden':
            status = 403
            message = "You are not authorized"
        break
        default:
            status = 500
            message = 'Internal server error'
            break
    }
    res.status(status).json({message})
}