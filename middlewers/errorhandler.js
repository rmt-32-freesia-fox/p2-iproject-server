const errorHandler = (error,req,res,next) =>{
    let code = 500
    let message ="Internal server error"

    // console.log(error);


    if(error.name == 'SequelizeUniqueConstraintError'|| error.name == 'SequelizeValidationError'){
        code= 400
        message = error.errors[0].message
    } else if(error.name =="invalid_token" || error.name == "JsonWebTokenError"){
        code= 401
        message ='Invalid Token'
    } else if (error.name == 'movie_not_found'){
        code = 404
        message="Movie not found"
    } else if (error.name == "forbidden"){
        code=403
        message='forbidden'
    } else if (error.name == "invalid_login"){
        code=401
        message = 'Incorrect Email or Password'
    } else if(error.name == "Category_not_found"){
        code = 404
        message="Category not found"
    }
    res.status(code).json({message})
}

module.exports = errorHandler