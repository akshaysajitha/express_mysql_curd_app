const jwt =require('jsonwebtoken');
const tokencheck = function varifytoken(req,res,next){
    const authHeader=req.headers.authorization

    if(authHeader==undefined){
        return res.status(401).json({
            message:'error token'
        })

    }const token =authHeader.split(" ")[1]
    jwt.verify(token,'keyjenerate',(err,decode)=>{
        if(err){
            return res.status(500).json({
                message:'token not match'
            })
        }else{
            next()
        }
    })
}

module.exports=tokencheck