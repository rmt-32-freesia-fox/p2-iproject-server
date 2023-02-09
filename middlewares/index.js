const { Controller } = require('../controllers');
const {User} = require('../models') 

function errorHandler (error, req, res, next)  {
//   {
//     "error": {
//         "status": 401,
//         "message": "The access token expired"
//     }
// }
let {code, name, errors, response} = error

let spotifyError = {} 
let number = code || 500
let msg = 'Internal server error' 
  if(response) {
    number = response?.data?.error?.status
    msg = response?.data?.error?.message
  } 
  // const {response: { data: { error:  { status, message} } } } = error
  
// console.log(error);

  

// let message = 'Internal server error' 
// let number = code || 500

  // switch(name) {
  //   case 'SequelizeValidationError': 
  //   case 'SequelizeUniqueConstraintError': 
  //     message = {error : errors.map(each => each.message).join(', ')}
  //     number = 400
  //     break;
  // }

  switch(code) {
    case 401:  
      msg = name || 'Unrecognized identity'
      break;
    case 403: 
      msg = name || 'Forbidden access'
      break;
    case 404: 
      msg = name || 'Data not found'
      break;
  }

  // res.status(number).json(error)
  res.status(number).json({message: msg}) 
} 

async function auth (req, res, next) {
  try {
    const { access_token } = req.headers
    if(!access_token) throw {code: 401}
    
    const { id } =  await Controller.getProfile(access_token)
        
    const findUser = await User.findOne({
      where: {
        userId: id
      }
    })
    if(!findUser) throw {code: 401}  

    
    
    req.token = access_token  
    // req.userRole = findUser.role
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  errorHandler,
  auth
}