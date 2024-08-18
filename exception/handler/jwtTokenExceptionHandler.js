const { JsonWebTokenError } = require("jsonwebtoken")

const jwtTokenExceptionHandler = (error,req,res,next) =>{
    if(error instanceof JsonWebTokenError){
        res.status(401).json({message : "User Un-authorized"})
    }
    next(error);
}
module.exports = jwtTokenExceptionHandler;