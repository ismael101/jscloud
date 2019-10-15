const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = (req,res,next) => {
    try{    
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, process.env.SIGNATURE)
        if(!decode){
            res.status(401).json({error:'Token Expired'})
        }
        const userid = decode.id
        User.findById(userid)
            .then(user => {
                if(!user){
                    res.status(401).json({message:'User Doesnt Exist'})
                }
                else{
                    req.userid = userid 

                    next()
                }
            })
    }
    catch(error){
        return res.status(401).json({error:'No Token Recieved'})
    }
}