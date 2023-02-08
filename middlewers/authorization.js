const {User,MyPlant} = require('../models')

const authorizationAdmin= async (req,res,next)=>{
    try {

        const {id} =req.user
        const ADMIN = await User.findByPk(id)

        if(ADMIN.role != 'admin'){
            res.status(403).json({message:'Only_Admin'})
        }

        next()
        
    } catch (error) {
        next(error)
        
    }
}

const authorizationMYPLANT = async (req,res,next)=>{

    try {

        const {plantId}=req.params

        const MY= await MyPlant.findOne({
            where:{id:plantId}
        })

        if(!MY){
            res.status(404).json({
                message: "Plant_not_found"
            })
            return
        }
        next()

        if(!MyPlant.UserId != req.user.id){
            res.status(403).json({
                message:'forbidden'
            })
            return
        }


        next()

        
    } catch (error) {
        next(error)
        
    }


}



module.exports = {
    authorizationAdmin, 
    authorizationMYPLANT
}