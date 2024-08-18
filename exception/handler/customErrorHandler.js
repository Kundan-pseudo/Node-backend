const AuthenticationError = require("../AuthenticationError");

const customErrorHandler = (error,req,res,next) =>{
    if(error instanceof AuthenticationError){
        return res.status(error.status).json({status:error.status,message:error.message});
    }
    next(error);
} 
module.exports = customErrorHandler;